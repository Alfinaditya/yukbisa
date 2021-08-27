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
