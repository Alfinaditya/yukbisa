import { Field, InputType } from 'type-graphql'
import { Length, IsNotEmpty, IsString, MaxLength } from 'class-validator'

@InputType()
export class CampaignInput {
  @Field()
  @IsNotEmpty({ message: 'Nama Penerima Tidak boleh kosong' })
  beneficiaryName!: string

  @Field()
  @Length(10, 100)
  @IsNotEmpty({ message: 'Title Tidak boleh kosong' })
  @IsString({ message: 'isi title dengan benar' })
  title!: string

  @IsString({ message: 'Masukan endpoint dengan benar' })
  @IsNotEmpty({ message: 'Endpoint Tidak boleh kosong' })
  @MaxLength(15, { message: 'Endpoint Terlalu panjang' })
  @Field()
  endPoint!: string

  @IsString({ message: 'Masukan nomor telepon dengan benar' })
  @IsNotEmpty({ message: 'Nomor telepon Tidak boleh kosong' })
  @MaxLength(13, { message: 'Nomor telepon Terlalu panjang' })
  @Field()
  phoneNumber!: string

  @IsString({ message: 'Masukan tujuan dengan benar' })
  @IsNotEmpty({ message: 'Tujuan Tidak boleh kosong' })
  @Field()
  purposeDescription!: string

  @IsNotEmpty({ message: 'Target Tidak boleh kosong' })
  @Field()
  target!: number

  @IsString({ message: 'Masukan id dengan benar' })
  @IsNotEmpty({ message: 'Image id tidak boleh kosong' })
  @Field()
  imageId!: string

  @IsString({ message: 'Masukan id dengan benar' })
  @IsNotEmpty({ message: 'Image tidak boleh kosong' })
  @Field()
  image!: string

  @IsString({ message: 'Masukan story dengan benar' })
  @IsNotEmpty({ message: 'story tidak boleh kosong' })
  @Field()
  story!: string
}
