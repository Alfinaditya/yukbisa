import { MyContext } from '../types/Mycontext'
import { MiddlewareFn } from 'type-graphql'
import jwt from 'jsonwebtoken'

export const authMiddleware: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']
  if (!authorization) {
    throw new Error('You are not auth')
  }
  try {
    const token = authorization.split(' ')[1]
    console.log(token)
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY!)
    context.payload = payload as any
  } catch (err) {
    console.log(err)
    throw new Error('You are not auth')
  }
  return next()
}
