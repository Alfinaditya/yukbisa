import { ObjectType, Field } from 'type-graphql'
import { getModelForClass, prop as Property } from '@typegoose/typegoose'

@ObjectType()
export class UserDonation {
  @Field()
  @Property({ required: true })
  name!: string

  @Field()
  @Property({ required: true })
  image!: string

  @Field({ nullable: true })
  @Property()
  message?: string

  @Field()
  @Property({ required: true })
  amount!: number

  @Field()
  @Property({ required: true, lowercase: true })
  endPoint!: string
}

export const UserDonationModel = getModelForClass(UserDonation, {
  schemaOptions: { timestamps: true },
})
