import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import UserResolver from './modules/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verify } from 'jsonwebtoken'
import { UserModel } from './entities/user'
import { createAccessToken, createRefreshToken } from './createToken'
import { sendRefreshToken } from './sendRefreshToken'
dotenv.config()
// todo login google
// todo login jwt
// todo fix cors error
async function startApolloServer() {
  const app = express()
  // app.use(
  //   cors({
  //     origin: 'http://localhost:3000',
  //     credentials: true,
  //   })
  // )
  app.use(cookieParser())
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
    sendRefreshToken(res, createRefreshToken(user))
    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  const schema = await buildSchema({
    resolvers: [UserResolver],
  })
  const mongoose = await connect(process.env.DB_HOST!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await mongoose.connection
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  })
  await server.start()

  server.applyMiddleware({ app })
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log('server running on port http://localhost:3001')
  })
}
startApolloServer()
