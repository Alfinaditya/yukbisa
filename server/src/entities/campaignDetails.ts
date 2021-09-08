import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, Ref, mongoose } from '@typegoose/typegoose'
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

  @Field(() => [UserDonation], {
    nullable: true,
    description: 'Length of the user Donations',
  })
  @Property()
  userDonations!: Ref<UserDonation>[]

  @Field()
  @Property()
  target!: number

  @Field(() => ID)
  @Property()
  fundraiserId!: mongoose.Types.ObjectId

  @Field(() => [UserDetails], {
    nullable: true,
    description: 'User Donations Details',
  })
  @Property()
  userDetails!: Ref<UserDetails>[]

  @Field(() => User)
  @Property({
    ref: () => User,
    foreignField: '_id',
    localField: 'fundraiserId', // compare
    justOne: true,
  })
  fundraiserDetails!: Ref<User>

  @Field()
  @Property({ default: Date.now() })
  createdAt!: Date
}

@ObjectType()
export class UserDetails {
  @Field(() => ID)
  @Property()
  readonly userId!: mongoose.Types.ObjectId

  @Field({ nullable: true })
  @Property()
  message?: string

  @Field({ nullable: true })
  @Property()
  amount!: number

  @Field()
  @Property({ default: Date.now() })
  createdAt!: Date

  @Field(() => User, { nullable: true })
  @Property({
    ref: () => User,
    foreignField: '_id',
    localField: 'userId', // compare
    justOne: true,
  })
  user!: Ref<User>
}
