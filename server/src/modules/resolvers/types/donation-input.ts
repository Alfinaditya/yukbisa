import { Field, InputType } from 'type-graphql'
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsInt,
  MaxLength,
  IsMongoId,
} from 'class-validator'

@InputType()
export class DonationInput {
  @Field()
  @IsMongoId()
  userId!: string

  @Field({ nullable: true })
  message?: string

  @Field()
  @IsNotEmpty({ message: 'Jumlah tidak boleh kosong' })
  @IsInt({ message: 'Wajib bertipe integer' })
  amount!: number

  @IsString({ message: 'Masukan endpoint dengan benar' })
  @IsNotEmpty({ message: 'Endpoint Tidak boleh kosong' })
  @MaxLength(15, { message: 'Endpoint Terlalu panjang' })
  @IsLowercase({ message: 'Wajib huruf kecil' })
  @Field()
  endPoint!: string
}
