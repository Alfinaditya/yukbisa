import { authMiddleware } from '../../middlewares/authMiddleware'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { Campaign, CampaignModel } from '../../entities/campaign'
import { CampaignInput } from './types/campaign-input'
import { MyContext } from '../../types/Mycontext'

// @ObjectType()
// class UserResponse {
//   @Field()
//   accessToken!: string
//   @Field(() => User)
//   user!: User
// }

@Resolver()
class CampaignResolver {
  @Query(() => [Campaign])
  async campaigns(): Promise<Campaign[] | null> {
    try {
      const campaigns = await CampaignModel.find()
      return campaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }
  @Mutation(() => String)
  testMutation(@Arg('input') input: string) {
    console.log(input)
    return input
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => Campaign)
  async addCampaign(
    @Arg('input') input: CampaignInput,
    @Ctx() ctx: MyContext
  ): Promise<Campaign | null> {
    console.log(input)
    const newCampaign = new CampaignModel({
      beneficiaryName: input.beneficiaryName,
      title: input.title,
      endPoint: input.endPoint,
      target: input.target,
      phoneNumber: input.phoneNumber,
      purposeDescription: input.purposeDescription,
      imageId: 'sfsdfsdafsas',
      image: input.image,
      story: input.story,
      fundraisingUserId: ctx.payload!.id,
    })
    try {
      await newCampaign.save()
      console.log(newCampaign)
      return newCampaign
    } catch (err) {
      console.log(err.errors)
      return null
    }
  }
}

export default CampaignResolver
