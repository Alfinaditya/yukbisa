import { Field, InputType } from 'type-graphql'
import { IsLowercase, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class UserRegisterInput {
  @IsString({ message: 'Masukan nama dengan benar' })
  @MaxLength(15, { message: 'Nama Terlalu panjang' })
  @Field()
  name!: string

  @IsString({ message: 'Masukan image dengan benar' })
  @IsNotEmpty({ message: 'Image tidak boleh kosong' })
  @Field()
  image!: string

  @IsNotEmpty({ message: 'Message tidak boleh kosong' })
  @Field()
  message!: string

  @Field()
  @IsNotEmpty({ message: 'Jumlah tidak boleh kosong' })
  amount!: number

  @IsString({ message: 'Masukan endpoint dengan benar' })
  @IsNotEmpty({ message: 'Endpoint Tidak boleh kosong' })
  @MaxLength(15, { message: 'Endpoint Terlalu panjang' })
  @IsLowercase({ message: 'Wajib huruf kecil' })
  @Field()
  endPoint!: string
}
