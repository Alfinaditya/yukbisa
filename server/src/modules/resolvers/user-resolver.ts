import { UserModel, User } from '../../entities/user'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { UserInput } from './types/user-input'

@Resolver()
class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[] | null> {
    try {
      const users = await UserModel.find()
      return users
    } catch (err) {
      console.log(err)
      return null
    }
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

  @Mutation(() => User)
  async createUser(@Arg('input') userInput: UserInput): Promise<User | null> {
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
      return newUser
    } catch (err) {
      console.log(err.errors)
      return null
    }
  }
}
export default UserResolver
