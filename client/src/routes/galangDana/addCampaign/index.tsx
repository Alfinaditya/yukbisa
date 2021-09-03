import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { createEndpoint, encodedImage } from '../../../helpers/helper'
import { useMutation } from '@apollo/client'
import { ADD_CAMPAIGN } from '../../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_MY_CAMPAIGNS,
} from '../../../apollo/queries/campaign'
import { Token } from '../../../ts/token'
import jwtDecode from 'jwt-decode'
import { getAccessToken } from '../../../auth/accessToken'

type Inputs = {
  beneficiaryName: string
  title: string
  endPoint: string
  purposeDescription: string
  image: any
  story: string
}

const Campaign = () => {
  const token: Token = jwtDecode(getAccessToken())
  const [target, setTarget] = useState<string | undefined>('0')
  const [addCampaign, { data, loading, error }] = useMutation(ADD_CAMPAIGN, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_CAMPAIGNS },
      { query: GET_MY_CAMPAIGNS, variables: { input: token.id } },
    ],
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }
  if (data) {
    console.log(data)
  }
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const encodedImageResult = await encodedImage(data.image[0])
      const body = {
        beneficiaryName: data.beneficiaryName,
        title: data.title,
        endPoint: createEndpoint(data.endPoint),
        target: parseInt(target!),
        phoneNumber: phoneNumber,
        purposeDescription: data.purposeDescription,
        image: encodedImageResult,
        story: data.story,
      }
      try {
        await addCampaign({
          variables: { input: body },
        })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Galang Dana</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Untuk siapa kamu menggalang dana</label>
        <select name='' id=''>
          <option value='saya-sendiri'>Saya Sendiri</option>
          <option value='orang-lain'>Orang Lain</option>
        </select>
        <label>Nama Penerima</label>
        <input
          type='text'
          {...register('beneficiaryName', { required: true, maxLength: 20 })}
        />
        {errors.beneficiaryName?.type === 'required' && (
          <p>Wajib memasukan nama penerima</p>
        )}
        {errors.beneficiaryName?.type === 'maxLength' && (
          <p>Nama terlalu panjang (maximal 20 huruf)</p>
        )}
        <label>Beri judul untuk penggalangan danamu</label>
        <input
          type='text'
          {...register('title', { required: true, maxLength: 50 })}
        />
        {errors.title?.type === 'required' && <p>Wajib memasukan judul</p>}
        {errors.title?.type === 'maxLength' && (
          <p>Judul terlalu panjang (maximal 50 huruf)</p>
        )}
        <label>Tentukan link untuk penggalangan danamu</label>
        <label>gunakan huruf tanpa spasi</label>
        <input
          type='text'
          {...register('endPoint', {
            required: true,
            maxLength: 15,
          })}
        />
        {errors.endPoint?.type === 'required' && <p>Wajib memasukan Link</p>}
        {errors.endPoint?.type === 'maxLength' && (
          <p>Link terlalu panjang (maximal 15 huruf)</p>
        )}
        <label>Untuk apa dana tersebut digunakan?</label>
        <textarea
          {...register('purposeDescription', {
            required: true,
            maxLength: 480,
          })}
        />
        {errors.purposeDescription?.type === 'required' && (
          <p>Wajib memasukan Tujuan</p>
        )}
        {errors.purposeDescription?.type === 'maxLength' && (
          <p>Tujuan terlalu panjang (maximal 480 huruf)</p>
        )}
        <label>Nomor hp kamu yang dapat dihubungi</label>
        <PhoneInput
          country={'id'}
          value={phoneNumber}
          disableDropdown={true}
          countryCodeEditable={false}
          placeholder='Isi nomor telepon'
          onChange={phone => setPhoneNumber(phone)}
        />
        <label>Berapa biaya yang kamu butuhkan</label>
        <CurrencyInput
          placeholder='Masukan angka'
          prefix={'Rp. '}
          decimalsLimit={2}
          value={target}
          required={true}
          onValueChange={value => setTarget(value)}
        />
        <label>Pilih salah satu foto utama untuk penggalan danamu</label>
        <input
          {...register('image', {
            required: true,
          })}
          accept='.jpg, .jpeg, .png'
          type='file'
        />
        {errors.image?.type === 'required' && <p>Wajib mengupload gambar</p>}

        <label>
          Untuk memudahkanmu,kami membuat informasi yang kamu masukan menjadi
          cerita penggalangan dana. kamu dapat mengubah cerita di bawah ini
          sesuai keinginanmu.
        </label>
        <textarea
          {...register('story', {
            required: true,
          })}
        />
        {errors.story?.type === 'required' && <p>Wajib diisi</p>}
        {loading ? (
          <button type='submit' disabled>
            Submit
          </button>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </div>
  )
}

export default Campaign
