import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, getModelForClass, post } from '@typegoose/typegoose'

@post<User>('save', function (user) {
  console.log('executed')
  console.log(user)
})
@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property({ required: true, unique: true })
  public email!: string

  @Property()
  protected password?: string

  @Field()
  @Property({ required: true, unique: true })
  public name!: string

  @Field()
  @Property()
  public dateOfBirth?: Date

  @Field()
  @Property()
  public bio?: string

  @Field()
  @Property({ required: true })
  public provider!: string
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
