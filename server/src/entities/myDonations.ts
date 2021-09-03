import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, Ref, mongoose } from '@typegoose/typegoose'
import { UserDonation } from './userDonation'

@ObjectType()
export class MyDonations {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property({ required: true })
  beneficiaryName!: string

  @Field()
  @Property({ required: true })
  title!: string

  @Field()
  @Property({ required: true, unique: true, lowercase: true })
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

  @Field(() => ID)
  @Property({ required: true })
  fundraiserId!: mongoose.Types.ObjectId

  @Field(() => UserDonation)
  @Property()
  userDonations!: Ref<UserDonation>

  @Field()
  @Property({ default: Date.now() })
  createdAt!: Date
}
