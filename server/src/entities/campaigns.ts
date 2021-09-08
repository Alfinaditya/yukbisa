import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, Ref, mongoose } from '@typegoose/typegoose'
import { User } from './user'
import { UserDonation } from './userDonation'

@ObjectType()
export class Campaigns {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property()
  title!: string

  @Field()
  @Property()
  endPoint!: string

  @Field()
  @Property()
  image!: string

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

  @Field(() => User)
  @Property({
    foreignField: '_id',
    localField: 'fundraiserId', // compare
    justOne: true,
  })
  fundraiserDetails!: Ref<User>

  @Field()
  @Property({ default: Date.now() })
  createdAt!: Date
}
