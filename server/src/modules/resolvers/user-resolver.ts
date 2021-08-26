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
import { UserLoginInput, UserRegisterInput } from './types/user-input'
import { compare } from 'bcrypt'
import { MyContext } from '../../types/Mycontext'
import { createAccessToken, createRefreshToken } from '../../auth/createToken'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { sendRefreshToken } from '../../auth/sendRefreshToken'
import { verify } from 'jsonwebtoken'

@ObjectType()
class UserResponse {
  @Field()
  accessToken!: string
}

@Resolver()
class UserResolver {
  @Query(() => String)
  @UseMiddleware(authMiddleware)
  bye(@Ctx() { payload }: MyContext): string {
    console.log(payload)
    return `user id mu dlah ${payload!.id}`
  }

  @Query(() => [User])
  async users() {
    const users = await UserModel.find()
    return users
  }

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
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')
    return true
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
    console.log(user)
    const valid = await compare(userInput.password!, user.password!)
    if (!valid) {
      throw new Error('Login gagal')
    }
    sendRefreshToken(ctx.res, createRefreshToken(user))
    return { accessToken: createAccessToken(user) }
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
      dateOfBirth: userInput.dateOfBirth,
      bio: userInput.bio,
      provider: userInput.provider,
    })
    try {
      await newUser.save()
      sendRefreshToken(ctx.res, createRefreshToken(newUser))
      return { accessToken: createAccessToken(newUser) }
    } catch (err) {
      console.log(err.errors)
      return null
    }
  }
}

export default UserResolver
