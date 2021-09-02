import { CampaignModel, Campaign } from '../../entities/campaign'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { DonationInput } from './types/donation-input'
import { mongoose } from '@typegoose/typegoose'

@Resolver()
class DonationResolver {
  @Query(() => [Campaign])
  async myDonations(@Arg('input') input: string): Promise<Campaign[] | null> {
    try {
      const myDonations = await CampaignModel.find({ fundraiserId: input })
      return myDonations
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Mutation(() => String)
  async addDonation(
    @Arg('input') input: DonationInput
  ): Promise<string | null> {
    try {
      await CampaignModel.updateOne(
        {
          endPoint: input.endPoint,
        },
        {
          $inc: { currentAmount: input.amount },
          $push: {
            userDonations: {
              userId: new mongoose.Types.ObjectId(input.userId),
              message: input.message,
              amount: input.amount,
            },
          },
        }
      )
      return 'ok'
    } catch (err) {
      console.log(err)
      return null
    }
  }
}
export default DonationResolver
