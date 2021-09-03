import { UserModel, User } from '../../entities/user'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from 'type-graphql'
import { UserLoginInput, UserRegisterInput } from './types/user-input'
import { compare } from 'bcrypt'
import { MyContext } from '../../types/Mycontext'
import { createAccessToken, createRefreshToken } from '../../auth/createToken'
import { sendRefreshToken } from '../../auth/sendRefreshToken'
import { verify } from 'jsonwebtoken'

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
