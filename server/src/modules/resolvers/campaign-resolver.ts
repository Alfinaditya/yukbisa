import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Campaign, CampaignModel } from '../../entities/campaign'
import { CampaignInput } from './types/campaign-input'

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

  @Mutation(() => Campaign)
  async addCampaign(
    @Arg('input') input: CampaignInput
  ): Promise<Campaign | null> {
    const newCampaign = new CampaignModel({ ...input })
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
