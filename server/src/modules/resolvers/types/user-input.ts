import { Field, InputType } from 'type-graphql'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'

@InputType()
export class UserRegisterInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @IsString({ message: 'Masukan Password dengan benar' })
  @IsNotEmpty({ message: 'Password Tidak boleh kosong' })
  password!: string

  @IsString({ message: 'Masukan nama dengan benar' })
  @MaxLength(15, { message: 'Nama Terlalu panjang' })
  @Field()
  name!: string
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @IsString({ message: 'Masukan Password dengan benar' })
  @IsNotEmpty({ message: 'Password Tidak boleh kosong' })
  password!: string
}

@InputType()
export class EditMeInput {
  @IsString({ message: 'Masukan image dengan benar' })
  @IsNotEmpty({ message: 'Image tidak boleh kosong' })
  @Field()
  image!: string

  @IsString({ message: 'Masukan imageId dengan benar' })
  @IsNotEmpty({ message: 'ImageId tidak boleh kosong' })
  @Field()
  imageId!: string

  @IsString({ message: 'Masukan nama dengan benar' })
  @MaxLength(15, { message: 'Nama Terlalu panjang' })
  @Field()
  name!: string

  @IsString({ message: 'Masukan bio dengan benar' })
  @IsNotEmpty({ message: 'Bio Tidak boleh kosong' })
  @Field()
  bio!: string

  @IsNotEmpty({ message: 'Date of birth Tidak boleh kosong' })
  @IsDate({ message: 'masukan Date of birth dengan benar' })
  @Field()
  dateOfBirth!: Date
}
