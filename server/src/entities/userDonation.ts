import { ObjectType, Field, ID } from 'type-graphql'
import { mongoose, prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class UserDonation {
  @Field(() => ID)
  @Property({ required: true })
  readonly userId!: mongoose.Types.ObjectId

  @Field()
  @Property({ required: true })
  amount!: number

  @Field({ nullable: true })
  @Property()
  message?: string
}
