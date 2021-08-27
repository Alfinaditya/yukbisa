import express from 'express'
import passport from 'passport'
import { createRefreshToken } from './createToken'
import { sendRefreshToken } from './sendRefreshToken'
const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure',
  })
)
router.get('/google/success', (req, res) => {
  const user: any = req.user
  console.log(user)
  sendRefreshToken(res, createRefreshToken(user))
  res.redirect('http://localhost:3000')
})
router.get('/google/failure', (_req, res) => {
  res.send('gagal Login')
})
export default router
