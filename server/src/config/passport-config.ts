import * as dotenv from 'dotenv'
import passport from 'passport'
import googleStrategy from 'passport-google-oauth20'
import { UserModel } from '../entities/user'
const GoogleStrategy = googleStrategy.Strategy
dotenv.config()

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  // after that,we receiving the user id
  // and then,use that id to get information from database
  try {
    const user = await UserModel.findById(id)
    // it will be attaches to the request (req.user)
    done(null, user)
  } catch (error) {
    console.log(error)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
    },
    async function (__request, __accessToken, __refreshToken, profile, done) {
      const user = await UserModel.findOne({
        email: profile._json.email,
        provider: profile.provider,
      })
      try {
        if (user) {
          done(null, user)
        } else {
          const user = new UserModel({
            email: profile._json.email,
            name: profile._json.name,
            displayImage: profile._json.picture,
            provider: profile.provider,
          })
          try {
            await user.save()
            done(null, user)
          } catch (error) {
            console.log(error)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)

export default passport
