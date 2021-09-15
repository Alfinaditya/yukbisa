import { ObjectType, Field, ID, Int } from 'type-graphql'
import { mongoose, prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class UserDonation {
  @Field(() => ID)
  @Property()
  readonly userId!: mongoose.Types.ObjectId

  @Field()
  @Property({ required: true })
  createdAt!: number

  @Field(() => Int)
  @Property({ required: true })
  amount!: number

  @Field({ nullable: true })
  @Property()
  message?: string

  @Field({ nullable: true })
  @Property()
  isAnonymous?: boolean
}
