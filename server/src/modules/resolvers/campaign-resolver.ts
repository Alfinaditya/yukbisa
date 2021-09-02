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
            as: 'userDetails',
          },
        },
      ])
      return campaigns
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
  // @Query(() => [Campaign])
  // async campaginsByName(@Arg('name') name: string): Promise<Campaign[] | null> {
  //   try {
  //     const campaigns = await CampaignModel.find({ 'fundraiser.name': name })
  //     return campaigns
  //   } catch (err) {
  //     console.log(err)
  //     return null
  //   }
  // }

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
    // result.public_id
    // result.secure_url
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
      console.log(err.errors)
      return null
    }
  }
}

export default CampaignResolver
