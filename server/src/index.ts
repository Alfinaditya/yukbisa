import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import UserResolver from './modules/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
dotenv.config()

async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  })
  const mongoose = await connect(process.env.DB_HOST!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await mongoose.connection
  const server = new ApolloServer({ schema })
  await server.start()
  const app = express()
  server.applyMiddleware({ app })
  app.listen(3001, () => {
    console.log('server running on port http://localhost:3001')
  })
}
startApolloServer()
