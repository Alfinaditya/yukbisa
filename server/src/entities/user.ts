import { ObjectType, Field, ID } from 'type-graphql'
import { prop as Property, getModelForClass, pre } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'

@pre<User>('save', async function () {
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    } catch (error) {
      console.log(error)
    }
  }
})
@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id!: string

  @Field()
  @Property({ required: true, unique: true })
  email!: string

  @Property()
  password?: string

  @Field()
  @Property({ required: true, unique: true })
  name!: string

  @Field()
  @Property()
  dateOfBirth?: Date

  @Field()
  @Property()
  bio?: string

  @Field()
  @Property({ required: true })
  provider!: string
}

@ObjectType()
export class AuthData {
  @Field()
  @Property()
  public token!: string
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
