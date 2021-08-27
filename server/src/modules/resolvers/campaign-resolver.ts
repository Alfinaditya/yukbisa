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
import { MyContext } from '../../types/Mycontext'
import { createAccessToken, createRefreshToken } from '../../auth/createToken'
import { sendRefreshToken } from '../../auth/sendRefreshToken'
import { Campaign,campaignModel } from '../../entities/campaign'
import { CampaignInput } from './types/campaign-input'

// @ObjectType()
// class UserResponse {
//   @Field()
//   accessToken!: string
//   @Field(() => User)
//   user!: User
// }

@Resolver()
class UserResolver {
  @Mutation(() => Campaign)
  async Addcampaign(
    @Arg('input') userInput: CampaignInput,
    @Ctx() ctx: MyContext
  ): Promise<Campaign | null> {
      return null
//     const newUser = new UserModel({
//       name: userInput.name,
//       email: userInput.email,
//       password: userInput.password,
//     })
//     try {
//       await newUser.save()
//       sendRefreshToken(ctx.res, createRefreshToken(newUser))
//       return { accessToken: createAccessToken(newUser), user: newUser }
//     } catch (err) {
//       console.log(err.errors)
//       return null
//     }
//   }
}

export default UserResolver
