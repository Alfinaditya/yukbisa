import 'reflect-metadata'
import './config/passport-config'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import UserResolver from './modules/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { verify } from 'jsonwebtoken'
import { UserModel } from './entities/user'
import { createAccessToken, createRefreshToken } from './auth/createToken'
import { sendRefreshToken } from './auth/sendRefreshToken'
import socialMediaAuth from './auth/socialMediaAuth'
import passport from 'passport'
import CampaignResolver from './modules/resolvers/campaign-resolver'
dotenv.config()

async function startApolloServer() {
  const app = express()
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  )
  app.use(cookieParser())
  app.use(passport.initialize())
  app.use(passport.session())
  app.get('/', (_req, res) => {
    res.send('hello from express')
  })

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid
    let payload: any = null
    if (!token) {
      return res.send({ ok: false, accessToken: '' })
    }
    // if token
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_KEY!)
    } catch (err) {
      console.log(err)
      return res.send({ ok: false, accessToken: '' })
    }
    // if user
    const user = await UserModel.findById({ _id: payload.id })
    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }
    if (user?.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }
    sendRefreshToken(res, createRefreshToken(user))
    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })
  app.use('/auth', socialMediaAuth)
  const schema = await buildSchema({
    resolvers: [UserResolver, CampaignResolver],
  })
  const mongoose = await connect(process.env.DB_HOST!)
  await mongoose.connection
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  })
  await server.start()

  server.applyMiddleware({ app, cors: false })
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log('server running on port http://localhost:3001')
  })
}
startApolloServer()
