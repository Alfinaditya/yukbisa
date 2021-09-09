import { UserModel, User } from '../../entities/user'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import {
  EditMeInput,
  UserLoginInput,
  UserRegisterInput,
} from './types/user-input'
import { compare } from 'bcrypt'
import { MyContext } from '../../types/Mycontext'
import { createAccessToken, createRefreshToken } from '../../auth/createToken'
import { sendRefreshToken } from '../../auth/sendRefreshToken'
import { verify } from 'jsonwebtoken'
import Cloudinary from '../../config/cloudinary-config'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validURL } from '../../helpers/helper'

@ObjectType()
class ErrorResponse {
  @Field({ nullable: true })
  path!: string
  @Field({ nullable: true })
  message!: string
}

@ObjectType()
class UserResponse {
  @Field(() => String, { nullable: true })
  accessToken!: string | null
  @Field(() => User, { nullable: true })
  user!: User | null

  @Field(() => ErrorResponse)
  error!: ErrorResponse
}

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    const authorization = ctx.req.headers['authorization']
    if (!authorization) {
      return null
    }
    try {
      const token = authorization.split(' ')[1]
      const payload: any = verify(token, process.env.ACCESS_TOKEN_KEY!)
      const user = await UserModel.findById({ _id: payload.id })
      return user
    } catch (err) {
      return null
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res, req }: MyContext) {
    req.logout()
    sendRefreshToken(res, '')
    return true
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => User)
  async editMe(
    @Arg('input') input: EditMeInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    if (
      input.imageId != 'oid' &&
      input.imageId != 'gid' &&
      !validURL(input.image)
    ) {
      await Cloudinary.uploader.destroy(input.imageId)
    }
    if (!validURL(input.image)) {
      const result = await Cloudinary.uploader.upload(input.image, {
        folder: 'Yuk Bisa/users',
        allowed_formats: ['jpg,jpeg,png'],
      })
      try {
        const user = await UserModel.findByIdAndUpdate(
          {
            _id: ctx.payload!.id,
          },
          {
            displayImage: result.secure_url,
            displayImageId: result.public_id,
            name: input.name,
            bio: input.bio,
            dateOfBirth: input.dateOfBirth,
          }
        )
        return user
      } catch (err) {
        console.log(err)
        return null
      }
    } else {
      try {
        const user = await UserModel.findByIdAndUpdate(
          {
            _id: ctx.payload!.id,
          },
          {
            name: input.name,
            bio: input.bio,
            dateOfBirth: input.dateOfBirth,
          }
        )
        return user
      } catch (err) {
        console.log(err)
        return null
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') userInput: UserLoginInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse | null> {
    const user = await UserModel.findOne({ email: userInput.email })
    if (!user) {
      return {
        accessToken: null,
        user: null,
        error: { path: 'login', message: 'Email/Password salah' },
      }
    }
    if (user.provider === 'google') {
      return {
        accessToken: null,
        user: null,
        error: { path: 'login', message: 'Email/Password salah' },
      }
    }
    const valid = await compare(userInput.password!, user.password!)
    if (!valid) {
      return {
        accessToken: null,
        user: null,
        error: { path: 'login', message: 'Email/Password salah' },
      }
    }

    sendRefreshToken(ctx.res, createRefreshToken(user))
    return {
      accessToken: createAccessToken(user),
      user,
      error: { path: '', message: '' },
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('_id') _id: string) {
    const user = await UserModel.updateOne(
      { _id },
      { $inc: { tokenVersion: 1 } }
    )
    console.log(user)
    return true
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input') userInput: UserRegisterInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse | undefined | null> {
    UserModel.syncIndexes()
    const newUser = new UserModel({
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    })
    try {
      await newUser.save()
      console.log(newUser)
      sendRefreshToken(ctx.res, createRefreshToken(newUser))
      return {
        accessToken: createAccessToken(newUser),
        user: newUser,
        error: { path: '', message: '' },
      }
    } catch (err: any) {
      if (err.code === 11000) {
        if (err.keyValue.email != null && err.code === 11000) {
          return {
            accessToken: null,
            user: null,
            error: { path: 'email', message: 'Email telah Digunakan' },
          }
        } else if (err.keyValue.name != null && err.code === 11000) {
          console.log('Name')
          return {
            accessToken: null,
            user: null,
            error: { path: 'name', message: 'Nama telah Digunakan' },
          }
        }
      }
    }
  }
}

export default UserResolver
