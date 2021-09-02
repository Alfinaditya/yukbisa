import { User } from '../entities/user'
import jwt from 'jsonwebtoken'

export const createAccessToken = (user: User) => {
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.ACCESS_TOKEN_KEY!,
    {
      expiresIn: '15m',
    }
  )
  return token
}

export const createRefreshToken = (user: User) => {
  const token = jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_KEY!,
    {
      expiresIn: '7d',
    }
  )
  return token
}
