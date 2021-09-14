import { authMiddleware } from '../middlewares/authMiddleware'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { Campaign, CampaignModel } from '../../entities/campaign'
import { CampaignInput, EditCampaignInput } from './types/campaign-input'
import { MyContext } from '../../types/Mycontext'
import Cloudinary from '../../config/cloudinary-config'
import { mongoose } from '@typegoose/typegoose'
import { Campaigns } from '../../entities/campaigns'
import { CampaignDetails } from '../../entities/campaignDetails'
import { ErrorResponse } from '../shared/errorResponse'

// @ObjectType()
// class AddCampaignResponse {
//   @Field(() => Campaign, { nullable: true })
//   campaign!: Campaign | null

//   @Field(() => ErrorResponse)
//   error!: ErrorResponse
// }

@Resolver()
class CampaignResolver {
  @Query(() => [Campaigns])
  async campaigns(): Promise<Campaigns[] | null> {
    try {
      const campaigns = await CampaignModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'fundraiserId',
            foreignField: '_id',
            as: 'fundraiserDetails',
          },
        },
        {
          $unwind: {
            path: '$fundraiserDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      return campaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => [Campaign])
  async myCampaigns(
    @Arg('fundraiserId') fundraiserId: string
  ): Promise<Campaign[] | null> {
    try {
      const myCampaigns = await CampaignModel.find({
        fundraiserId: fundraiserId,
      })
      return myCampaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => Campaign)
  async campaign(@Arg('endPoint') endPoint: string): Promise<Campaign | null> {
    try {
      const myCampaigns = await CampaignModel.findOne({
        endPoint: endPoint,
      })
      return myCampaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => [CampaignDetails])
  async campaignDetails(
    @Arg('endPoint') endPoint: string
  ): Promise<CampaignDetails[] | null> {
    try {
      const campaign = await CampaignModel.aggregate([
        { $match: { endPoint: endPoint } },
        {
          $unwind: { path: '$userDonations', preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userDonations.userId',
            foreignField: '_id',
            as: 'userDonations.user',
          },
        },
        {
          $unwind: {
            path: '$userDonations.user',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            userDonations: {
              $push: '$userDonations',
            },
          },
        },
        {
          $lookup: {
            from: 'campaigns',
            localField: '_id',
            foreignField: '_id',
            as: 'campaignDetails',
          },
        },
        {
          $unwind: {
            path: '$campaignDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            'campaignDetails.userDetails': '$userDonations',
          },
        },
        {
          $replaceRoot: {
            newRoot: '$campaignDetails',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'fundraiserId',
            foreignField: '_id',
            as: 'fundraiserDetails',
          },
        },
        { $unwind: '$fundraiserDetails' },
      ])
      return campaign
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => Campaign)
  async addCampaign(
    @Arg('input') input: CampaignInput,
    @Ctx() ctx: MyContext
  ): Promise<Campaign | null> {
    // todo jangan di delete bangsat
    // const isEndPointExist = await CampaignModel.findOne({
    //   endPoint: input.endPoint,
    // })
    // if (!isEndPointExist) {
    //   const result = await Cloudinary.uploader.upload(input.image, {
    //     folder: 'Yuk Bisa/campaigns',
    //     allowed_formats: ['jpg,jpeg,png'],
    //   })
    //   const newCampaign = await CampaignModel.create({
    //     beneficiaryName: input.beneficiaryName,
    //     title: input.title,
    //     endPoint: input.endPoint,
    //     target: input.target,
    //     phoneNumber: input.phoneNumber,
    //     purposeDescription: input.purposeDescription,
    //     imageId: result.public_id,
    //     image: result.secure_url,
    //     story: input.story,
    //     fundraiserId: new mongoose.Types.ObjectId(ctx.payload!.id),
    //   })
    //   return {
    //     campaign: newCampaign,
    //     error: { path: 'success', message: '' },
    //   }
    // }
    const result = await Cloudinary.uploader.upload(input.image, {
      folder: 'Yuk Bisa/campaigns',
      allowed_formats: ['jpg,jpeg,png'],
      timeout: 60000,
    })
    const newCampaign = await CampaignModel.create({
      beneficiaryName: input.beneficiaryName,
      title: input.title,
      endPoint: input.endPoint,
      target: input.target,
      phoneNumber: input.phoneNumber,
      purposeDescription: input.purposeDescription,
      imageId: result.public_id,
      image: result.secure_url,
      story: input.story,
      fundraiserId: new mongoose.Types.ObjectId(ctx.payload!.id),
    })
    return newCampaign
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => String)
  async editCampaign(
    @Arg('input') input: EditCampaignInput
  ): Promise<String | null> {
    try {
      await CampaignModel.findOneAndUpdate(
        {
          endPoint: input.endPoint,
        },
        {
          beneficiaryName: input.beneficiaryName,
          title: input.beneficiaryName,
          target: input.target,
          phoneNumber: input.phoneNumber,
          purposeDescription: input.purposeDescription,
          story: input.story,
        }
      )
      return 'success'
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @UseMiddleware(authMiddleware)
  @Mutation(() => String)
  async deleteCampaign(
    @Arg('endPoint') endPoint: string,
    @Arg('imageId') imageId: string
  ): Promise<string | null> {
    try {
      await Cloudinary.uploader.destroy(imageId)
      await CampaignModel.findOneAndDelete({
        endPoint: endPoint,
      })
      return 'sukses mendelete'
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Mutation(() => ErrorResponse)
  async isEndPointAvailable(
    @Arg('endPoint') endPoint: string
  ): Promise<ErrorResponse | null> {
    const isEndPointExist = await CampaignModel.findOne({ endPoint })
    if (isEndPointExist) {
      return { path: 'endPoint', message: 'Link sudah dipakai' }
    }
    return { path: 'success', message: '' }
  }
}

export default CampaignResolver
