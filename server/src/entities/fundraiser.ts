import { ObjectType, Field } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class Fundraiser {
  @Field()
  @Property({ required: true })
  name!: string

  @Field()
  @Property({ required: true })
  image!: string
}
