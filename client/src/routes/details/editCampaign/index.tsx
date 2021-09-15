import { useMutation, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { useHistory, useParams } from 'react-router'
import { EDIT_CAMPAIGN } from '../../../apollo/mutations/campaign'
import {
  GET_CAMPAIGN,
  GET_CAMPAIGNS,
  GET_CAMPAIGN_DETAILS,
  GET_MY_CAMPAIGNS,
} from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Campaign } from '../../../ts/campaign'
import { Token } from '../../../ts/token'
import { Form, Input, TextArea } from '../../galangDana/addCampaign/style'

type Inputs = {
  beneficiaryName: string
  title: string
  endPoint: string
  purposeDescription: string
  image: any
  story: string
}

const EditCampaign = () => {
  const history = useHistory()
  const token: Token = jwtDecode(getAccessToken())
  const { slug } = useParams<{ slug?: string }>()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [target, setTarget] = useState<string | undefined>('0')
  const { loading, data } = useQuery(GET_CAMPAIGN, {
    variables: { endPoint: slug },
  })
  const [editCampaign, { data: editData }] = useMutation(EDIT_CAMPAIGN, {
    fetchPolicy: 'network-only',
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()
  if (loading) return <p>Loading.....</p>
  if (editData) console.log(editData)
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const body = {
      beneficiaryName: data.beneficiaryName,
      title: data.title,
      endPoint: slug,
      target: parseInt(target!) || campaign.target,
      phoneNumber: phoneNumber || campaign.phoneNumber,
      purposeDescription: data.purposeDescription,
      story: data.story,
    }
    await editCampaign({
      variables: { input: body },
      refetchQueries: [
        { query: GET_CAMPAIGNS },
        { query: GET_CAMPAIGN_DETAILS, variables: { input: slug } },
        { query: GET_MY_CAMPAIGNS, variables: { fundraiserId: token.id } },
      ],
    })
    history.push(`/campaign/${slug}`)
  }
  const campaign: Campaign = data.campaign
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Nama Penerima</label>
        <Input
          type='text'
          {...register('beneficiaryName', { required: true, maxLength: 20 })}
          defaultValue={campaign.beneficiaryName}
        />
        <label>Beri judul untuk penggalangan danamu</label>
        <Input
          type='text'
          {...register('title', { required: true, maxLength: 50 })}
          defaultValue={campaign.title}
        />
        <label>Untuk apa dana tersebut digunakan?</label>
        <TextArea
          {...register('purposeDescription', {
            required: true,
            maxLength: 480,
          })}
          defaultValue={campaign.purposeDescription}
        />
        <label>Nomor hp kamu yang dapat dihubungi</label>
        <PhoneInput
          country={'id'}
          value={campaign.phoneNumber}
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
          defaultValue={campaign.target}
          required={true}
          onValueChange={value => setTarget(value)}
        />
        <label>
          Untuk memudahkanmu,kami membuat informasi yang kamu masukan menjadi
          cerita penggalangan dana. kamu dapat mengubah cerita di bawah ini
          sesuai keinginanmu.
        </label>
        <TextArea
          {...register('story', {
            required: true,
          })}
          defaultValue={campaign.story}
        />
        <button type='submit'>Submit</button>
      </Form>
    </div>
  )
}

export default EditCampaign
