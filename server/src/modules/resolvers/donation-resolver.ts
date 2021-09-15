import { CampaignModel } from '../../entities/campaign'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { DonationInput } from './types/donation-input'
import { mongoose } from '@typegoose/typegoose'
import { MyDonations } from '../../entities/myDonations'

@Resolver()
class DonationResolver {
  @Query(() => [MyDonations])
  async myDonations(@Arg('_id') _id: string): Promise<MyDonations[] | null> {
    try {
      const campaigns = await CampaignModel.aggregate([
        {
          $unwind: { path: '$userDonations', preserveNullAndEmptyArrays: true },
        },
        {
          $match: { 'userDonations.userId': new mongoose.Types.ObjectId(_id) },
        },
      ])
      return campaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }

  // Todo fix this
  @Mutation(() => String)
  async addDonation(
    @Arg('input') input: DonationInput
  ): Promise<string | null> {
    try {
      await CampaignModel.findOneAndUpdate(
        {
          endPoint: input.endPoint,
        },
        {
          $inc: { currentAmount: input.amount },
          $push: {
            userDonations: {
              userId: new mongoose.Types.ObjectId(input.userId),
              message: input?.message,
              amount: input.amount,
              createdAt: Date.now(),
              isAnonymous: input.anonymous,
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
