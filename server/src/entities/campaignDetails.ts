import { ObjectType, Field, ID } from 'type-graphql'
import {
  prop as Property,
  getModelForClass,
  Ref,
  mongoose,
} from '@typegoose/typegoose'
import { UserDonation } from './userDonation'
import { User } from './user'

@ObjectType()
export class CampaignDetails {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property()
  beneficiaryName!: string

  @Field()
  @Property()
  title!: string

  @Field()
  @Property()
  endPoint!: string

  @Field()
  @Property()
  phoneNumber!: string

  @Field()
  @Property()
  purposeDescription!: string

  @Field()
  @Property()
  imageId!: string

  @Field()
  @Property()
  image!: string

  @Field()
  @Property()
  story!: string

  @Field()
  @Property()
  currentAmount!: number

  // Length of the user Donations
  @Field(() => [UserDonation], { description: 'Length of the user Donations' })
  @Property()
  userDonations!: Ref<UserDonation>[]

  @Field()
  @Property()
  target!: number

  @Field(() => ID)
  @Property()
  fundraiserId!: mongoose.Types.ObjectId

  @Field(() => [Users], { description: 'User Donations Details' })
  @Property()
  users!: Ref<Users>[]
}

@ObjectType()
export class Users {
  @Field(() => ID)
  @Property()
  readonly userId!: mongoose.Types.ObjectId

  @Field()
  @Property()
  message?: string

  @Field()
  @Property()
  amount!: number

  @Field(() => User)
  @Property({
    ref: () => User,
    foreignField: '_id',
    localField: 'userId', // compare
    justOne: true,
  })
  user!: Ref<User>
}
