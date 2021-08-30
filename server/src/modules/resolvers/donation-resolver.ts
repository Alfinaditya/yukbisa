import { UserDonation, UserDonationModel } from '../../entities/userDonation'
import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { DonationInput } from './types/donation-input'
import { CampaignModel } from '../../entities/campaign'
@Resolver()
class DonationResolver {
  @Query(() => [UserDonation])
  async myDonations(@Arg('name') name: string): Promise<UserDonation[] | null> {
    try {
      const myDonations = await UserDonationModel.find({ name: name })
      return myDonations
    } catch (err) {
      return null
    }
  }

  @Mutation(() => UserDonation)
  async addDonation(
    @Arg('input') input: DonationInput
  ): Promise<UserDonation | null> {
    const userDonation = new UserDonationModel({ ...input })
    try {
      await userDonation.save()
      try {
        await CampaignModel.findOneAndUpdate(
          { endPoint: userDonation.endPoint },
          { $inc: { currentAmount: userDonation.amount } }
        )
      } catch (error) {
        console.log(error)
      }
      return userDonation
    } catch (err) {
      console.log(err.errors)
      return null
    }
  }
}
export default DonationResolver
