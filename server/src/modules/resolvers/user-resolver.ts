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
class UserResponse {
  @Field()
  accessToken!: string
  @Field(() => User)
  user!: User
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
      throw new Error('Login gagal')
    }
    if (user.provider === 'google') {
      throw new Error('Silahkan login menggunakan google')
    }
    const valid = await compare(userInput.password!, user.password!)
    console.log(valid)
    if (!valid) {
      throw new Error('Login gagal')
    }
    sendRefreshToken(ctx.res, createRefreshToken(user))
    return { accessToken: createAccessToken(user), user }
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
  ): Promise<UserResponse | null> {
    const newUser = new UserModel({
      name: userInput.name,
      email: userInput.email,
      password: userInput.password,
    })
    try {
      await newUser.save()
      sendRefreshToken(ctx.res, createRefreshToken(newUser))
      return { accessToken: createAccessToken(newUser), user: newUser }
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export default UserResolver
