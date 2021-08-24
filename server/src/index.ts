import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import * as dotenv from 'dotenv'
import UserResolver from './modules/resolvers/user-resolver'
import { buildSchema } from 'type-graphql'
import { connect } from 'mongoose'
import cors from 'cors'

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
