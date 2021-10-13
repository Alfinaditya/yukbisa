import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import UserResolver from './modules/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import cors from 'cors'
import { verify } from 'jsonwebtoken'
import { UserModel } from './entities/user'
import { createAccessToken, createRefreshToken } from './auth/createToken'
import { sendRefreshToken } from './auth/sendRefreshToken'
import CampaignResolver from './modules/resolvers/campaign-resolver'
import DonationResolver from './modules/resolvers/donation-resolver'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import { URLSearchParams } from 'url'
import { generateRandomNumber } from './helpers/helper'
import { clientUrl, redirectUri } from './modules/constant'
dotenv.config()

async function startApolloServer() {
  const app = express()
  const allowedDomains = [
    'http://yukbisa.netlify.app',
    'http://localhost:3000',
    process.env.NODE_ENV ? 'https://studio.apollographql.com' : '',
  ]
  app.use(
    cors({
      origin: allowedDomains,
      credentials: true,
    })
  )
  app.use(express.urlencoded({ extended: false, limit: '10mb' }))
  app.use(express.json({ limit: '10mb' }))
  app.use(cookieParser())

  app.get('/', (_req, res) => {
    res.send('hello from express')
  })
  function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
      redirect_uri: redirectUri,
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    }

    return `${rootUrl}?${new URLSearchParams(options)}`
  }
  app.get('/auth/google/url', (_req, res) => {
    res.send(getGoogleAuthURL())
  })
  function getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string
    clientId: string
    clientSecret: string
    redirectUri: string
  }): Promise<{
    access_token: string
    expires_in: Number
    refresh_token: string
    scope: string
    id_token: string
  }> {
    /*
     * Uses the code to get tokens
     * that can be used to fetch the user's profile
     */
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }

    return axios
      .post(url, new URLSearchParams(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => res.data)
      .catch(error => {
        console.error(`Failed to fetch auth tokens`)
        throw new Error(error.message)
      })
  }

  // Getting the user from Google with the code
  app.get(`/auth/google/callback`, async (req, res) => {
    const code = req.query.code as string

    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectUri: redirectUri,
    })

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then(res => res.data)
      .catch(error => {
        console.error(`Failed to fetch user`)
        throw new Error(error.message)
      })

    async function findOrCreate(profile: any) {
      const user = await UserModel.findOne({
        email: profile.email,
      })
      try {
        if (user) {
          sendRefreshToken(res, createRefreshToken(user))
          res.redirect(clientUrl)
        } else {
          const isNameAvailable = await UserModel.findOne({
            name: profile.name,
          })
          let newUser
          if (isNameAvailable) {
            newUser = new UserModel({
              email: profile.email,
              name: `${profile.given_name} ${generateRandomNumber()}`,
              provider: 'google',
              displayImage: profile.picture,
            })
          } else {
            newUser = new UserModel({
              email: profile.email,
              name: profile.name,
              provider: 'google',
              displayImageId: 'gid',
              displayImage: profile.picture,
            })
          }
          try {
            await newUser.save()
            sendRefreshToken(res, createRefreshToken(newUser))
            res.redirect(clientUrl)
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    findOrCreate(googleUser)
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
  const schema = await buildSchema({
    resolvers: [UserResolver, CampaignResolver, DonationResolver],
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
    console.log(`server running on port ${PORT}`)
  })
}
startApolloServer()
