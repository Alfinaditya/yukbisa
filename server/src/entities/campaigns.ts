import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, Ref, mongoose } from '@typegoose/typegoose'
import { User } from './user'
import { truncate } from 'fs'

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
  @Property({ required: true, default: 0 })
  currentAmount!: number

  @Field()
  @Property({ required: true })
  target!: number

  @Field(() => ID)
  @Property({ required: true })
  fundraiserId!: mongoose.Types.ObjectId

  @Field(() => User)
  @Property({
    foreignField: '_id',
    localField: 'fundraiserId', // compare
    justOne: true,
  })
  fundraiserDetails!: Ref<User>
}
