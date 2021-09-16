import { useMutation, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { useState } from 'react'
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
import { CancelLink, NextButton } from '../../../components/Button'
import { ErrorText } from '../../../components/ErrorText'
import { Form, Input, Label, TextArea } from '../../../components/Form'
import Loading from '../../../components/Loading'
import { Campaign } from '../../../ts/campaign'
import { Token } from '../../../ts/token'
import { Currency, HeaderForm } from '../../galangDana/addCampaign/style'

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
  const [editCampaign] = useMutation(EDIT_CAMPAIGN, {
    fetchPolicy: 'network-only',
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  if (loading) return <Loading />

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
        { query: GET_CAMPAIGN, variables: { endPoint: slug } },
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
        <HeaderForm>Ubah data di bawah ini untuk galang dana</HeaderForm>
        <Label>
          Nama Penerima <span>*</span>
        </Label>
        <Input
          type='text'
          {...register('beneficiaryName', { required: true, maxLength: 20 })}
          defaultValue={campaign.beneficiaryName}
        />
        {errors.beneficiaryName?.type === 'maxLength' && (
          <ErrorText>
            Nama penerima terlalu panjang (maximal 20 huruf)
          </ErrorText>
        )}
        {errors.beneficiaryName?.type === 'required' && (
          <ErrorText>Wajib memasukan nama penerima</ErrorText>
        )}
        <Label>
          Beri judul untuk penggalangan danamu <span>*</span>
        </Label>
        <Input
          type='text'
          {...register('title', { required: true, maxLength: 50 })}
          defaultValue={campaign.title}
        />
        {errors.title?.type === 'required' && (
          <ErrorText>Wajib memasukan judul</ErrorText>
        )}
        {errors.title?.type === 'maxLength' && (
          <ErrorText>Judul terlalu panjang (maximal 50 huruf)</ErrorText>
        )}
        <Label>
          Berapa biaya yang kamu butuhkan <span>*</span>
        </Label>
        <Currency
          placeholder='Masukan angka'
          prefix={'Rp. '}
          decimalsLimit={2}
          defaultValue={campaign.target}
          required={true}
          onValueChange={value => setTarget(value)}
        />
        <Label>
          Untuk apa dana tersebut digunakan? <span>*</span>
        </Label>
        <TextArea
          {...register('purposeDescription', {
            required: true,
            maxLength: 480,
            minLength: 30,
          })}
          defaultValue={campaign.purposeDescription}
        />
        {errors.purposeDescription?.type === 'minLength' && (
          <ErrorText>Tujuan terlalu pendek (minimal 40 huruf)</ErrorText>
        )}
        {errors.purposeDescription?.type === 'required' && (
          <ErrorText>Wajib memasukan Tujuan</ErrorText>
        )}
        {errors.purposeDescription?.type === 'maxLength' && (
          <ErrorText>Tujuan terlalu panjang (maximal 480 huruf)</ErrorText>
        )}
        <Label>Nomor hp kamu yang dapat dihubungi</Label>
        <PhoneInput
          country={'id'}
          value={campaign.phoneNumber}
          disableDropdown={true}
          countryCodeEditable={false}
          placeholder='Isi nomor telepon'
          inputStyle={{
            width: '100%',
            height: '59px',
            outline: 'none',
          }}
          inputProps={{
            required: true,
          }}
          onChange={phone => setPhoneNumber(phone)}
        />
        <Label>
          Untuk memudahkanmu,kami membuat informasi yang kamu masukan menjadi
          cerita penggalangan dana. kamu dapat mengubah cerita di bawah ini
          sesuai keinginanmu.
        </Label>
        <TextArea
          {...register('story', {
            required: true,
          })}
          defaultValue={campaign.story}
        />
        {errors.story?.type === 'required' && (
          <ErrorText>Wajib mengisi cerita</ErrorText>
        )}
        <NextButton type='submit'>Submit</NextButton>
        <CancelLink to={`campaign/${slug}`}>Batal mengedit</CancelLink>
      </Form>
    </div>
  )
}

export default EditCampaign
