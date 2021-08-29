import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose'
import { UserDonations } from './userDonations'

@ObjectType()
export class Campaign {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property({ required: true })
  beneficiaryName!: string

  @Field()
  @Property({ required: true })
  title!: string

  @Field()
  @Property({ required: true, unique: true })
  endPoint!: string

  @Field()
  @Property({ required: true })
  phoneNumber!: string

  @Field()
  @Property({ required: true })
  purposeDescription!: string

  @Field()
  @Property({ required: true })
  imageId!: string

  @Field()
  @Property({ required: true })
  image!: string

  @Field()
  @Property({ required: true })
  story!: string

  @Field()
  @Property({ required: true, default: 0 })
  currentAmount!: number

  @Field()
  @Property({ required: true })
  target!: number

  @Field(() => UserDonations)
  @Property({ ref: () => UserDonations, default: [] })
  userDonations?: Ref<UserDonations>[]

  @Field()
  @Property({ required: true })
  fundraisingUserName!: string

  @Field(() => ID)
  @Property({ required: true })
  fundraisingUserId!: string
}

export const CampaignModel = getModelForClass(Campaign, {
  schemaOptions: { timestamps: true },
})
