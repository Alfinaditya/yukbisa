import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class Fundraiser {
  @Field(() => ID)
  @Property({ required: true })
  readonly id!: string

  @Field()
  @Property({ required: true })
  name!: string

  @Field()
  @Property({ required: true })
  image!: string
}
