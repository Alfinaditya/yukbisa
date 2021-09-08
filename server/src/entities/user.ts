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
  @Property({
    required: true,
    default: 'oid',
  })
  displayImageId!: string

  @Field()
  @Property({
    default: '/profile.png',
  })
  displayImage!: string

  @Field({ nullable: true })
  @Property({ default: null })
  dateOfBirth?: Date

  @Field()
  @Property({ required: true, default: 'Hi saya orang baik!!!' })
  bio?: string

  @Field()
  @Property({ required: true, default: 'original' })
  provider!: string

  @Property({ type: () => Number, default: 0 })
  tokenVersion!: number
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
