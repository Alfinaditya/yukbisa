import { Field, InputType } from 'type-graphql'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator'

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email!: string

  @Field()
  @IsString({ message: 'Masukan Password dengan benar' })
  @IsNotEmpty({ message: 'Password Tidak boleh kosong' })
  password?: string

  @IsString({ message: 'Masukan nama dengan benar' })
  @MaxLength(15, { message: 'Nama Terlalu panjang' })
  @Field()
  name!: string

  @Field({ defaultValue: null })
  @IsDate({ message: 'Masukan Format tanggal dengan benar' })
  dateOfBirth?: Date

  @Field({ defaultValue: 'Hi saya orang baik!!!' })
  @IsString({ message: 'Masukan format bio yang benar' })
  bio?: string

  @Field({ defaultValue: 'original' })
  @IsString()
  provider!: string
}
