import { CampaignModel, Campaign } from '../../entities/campaign'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { DonationInput } from './types/donation-input'
import { UserDonation } from '../../entities/userDonation'
import { mongoose } from '@typegoose/typegoose'
// import { DonationInput } from './types/donation-input'
// import { CampaignModel } from '../../entities/campaign'

@Resolver()
class DonationResolver {
  @Query(() => String)
  async myDonations() {
    return 'ok'
    // try {
    //   const myDonations = await UserDonationModel.find({ name: name })
    //   return myDonations
    // } catch (err) {
    //   return null
    // }
  }

  @Mutation(() => String)
  async addDonation(@Arg('input') input: DonationInput) {
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
      console.log(err.errors)
      return null
    }
  }
}
export default DonationResolver
