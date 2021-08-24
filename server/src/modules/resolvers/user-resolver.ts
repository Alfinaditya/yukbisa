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
import { createAccessToken, createRefreshToken } from '../../createToken'
import { authMiddleware } from '../../middlewares/authMiddleware'
import { sendRefreshToken } from '../../sendRefreshToken'

@ObjectType()
class UserResponse {
  @Field()
  accessToken!: string
  @Field(() => User)
  user!: User
}

@Resolver()
class UserResolver {
  @Query(() => String)
  @UseMiddleware(authMiddleware)
  bye(@Ctx() { payload }: MyContext): string {
    console.log(payload)
    return `user id mu dlah ${payload!.id}`
  }

  // @Query(()=>User)
  // async getUserById(@Arg('_id') _id:string):Promise<User | null>{
  //     try{
  //         const users=await UserModel.findById({_id})
  //         // const doc=new UserModel()
  //         // console.log(doc.sayHello('killua'))
  //         return users
  //     }
  //     catch(err){
  //         console.log(err)
  //         return null
  //     }
  // }

  @Mutation(() => UserResponse)
  async login(
    @Arg('input') userInput: UserLoginInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse | null> {
    const user = await UserModel.findOne({ email: userInput.email })
    if (!user) {
      throw new Error('Login gagal')
    }
    const valid = await compare(userInput.password!, user.password!)
    if (!valid) {
      throw new Error('Login gagal')
    }
    sendRefreshToken(ctx.res, createRefreshToken(user))
    return { accessToken: createAccessToken(user), user }
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
      return {
        accessToken: createAccessToken(newUser),
        user: newUser,
      }
    } catch (err) {
      console.log(err.errors)
      return null
    }
  }
}

export default UserResolver
