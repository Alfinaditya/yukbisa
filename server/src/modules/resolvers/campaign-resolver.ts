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
import { CampaignInput } from './types/campaign-input'
import { MyContext } from '../../types/Mycontext'
import Cloudinary from '../../config/cloudinary-config'
import { mongoose } from '@typegoose/typegoose'
import { Campaigns } from '../../entities/campaigns'
import { CampaignDetails } from '../../entities/campaignDetails'

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
      console.log(fundraiserId)
      const myCampaigns = await CampaignModel.find({
        fundraiserId: fundraiserId,
      })
      return myCampaigns
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => [CampaignDetails])
  async campaign(
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
    const result = await Cloudinary.uploader.upload(input.image, {
      folder: 'Yuk Bisa/campaigns',
      allowed_formats: ['jpg,jpeg,png'],
    })
    const newCampaign = new CampaignModel({
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
    try {
      await newCampaign.save()
      return newCampaign
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
}

export default CampaignResolver
