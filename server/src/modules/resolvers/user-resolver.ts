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
    // console.log(userInput)
    // return null
    const newUser = new UserModel({ ...userInput })
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
