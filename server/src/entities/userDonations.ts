import { ObjectType, Field } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class UserDonations {
  @Field()
  @Property()
  name?: string

  @Field()
  @Property()
  image?: string

  @Field()
  @Property()
  message?: string

  @Field()
  @Property()
  amount?: number
}
