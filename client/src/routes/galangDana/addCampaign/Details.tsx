import { useState, useContext } from 'react'
import { Currency, HeaderForm, InputEndPoint } from './style'
import PhoneInput from 'react-phone-input-2'
import { useForm, SubmitHandler } from 'react-hook-form'
import 'react-phone-input-2/lib/material.css'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { Redirect, useHistory } from 'react-router'
import { createEndpoint } from '../../../helpers/helper'
import { IS_ENDPOINT_AVAILABLE } from '../../../apollo/mutations/campaign'
import { useMutation } from '@apollo/client'
import { Form, Input, Label, TextArea } from '../../../components/Form'
import { ErrorText } from '../../../components/ErrorText'
import { NextButton, PreviousButton } from '../../../components/Button'

type Inputs = {
  title: string
  endPoint: string
  purposeDescription: string
}

const Details = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  const [endPointDuplicateErrorMessage, setEndPointDuplicateErrorMessage] =
    useState('')
  const [isEndPointAvailable, { error }] = useMutation(IS_ENDPOINT_AVAILABLE, {
    fetchPolicy: 'network-only',
  })
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  if (error) console.log(JSON.stringify(error, null, 2))
  const onSubmit: SubmitHandler<Inputs> = async data => {
    context?.setTitle(data.title)
    context?.setEndPoint(createEndpoint(data.endPoint))
    context?.setPurposeDescription(data.purposeDescription)
    const res = await isEndPointAvailable({
      variables: { input: createEndpoint(data.endPoint) },
    })
    if (res.data.isEndPointAvailable.path === 'endPoint') {
      setEndPointDuplicateErrorMessage(res.data.isEndPointAvailable.message)
    }
    if (res.data.isEndPointAvailable.path === 'success') {
      history.push('/galang-dana/add-campaign/photo')
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {context?.beneficiaryName === '' && (
        <Redirect to='/galang-dana/add-campaign/beneficiary' />
      )}
      <HeaderForm>Detail penggalan dana & perkiraan biaya</HeaderForm>
      <Label title>
        Beri judul untuk penggalangan danamu <span> * </span>
      </Label>
      <Input
        type='text'
        {...register('title', { required: true, maxLength: 50 })}
        defaultValue={context?.title}
      />
      {errors.title?.type === 'required' && (
        <ErrorText>Wajib memasukan judul</ErrorText>
      )}
      {errors.title?.type === 'maxLength' && (
        <ErrorText>Judul terlalu panjang (maximal 50 huruf)</ErrorText>
      )}
      <Label endPoint>
        Tentukan link untuk penggalangan danamu <span> * </span>
      </Label>
      <Label sub>gunakan huruf tanpa spasi</Label>
      <InputEndPoint>
        <div>YukBisa/campaign/</div>
        <Input
          type='text'
          {...register('endPoint', {
            required: true,
            maxLength: 15,
          })}
          defaultValue={context?.endPoint}
        />
      </InputEndPoint>
      {endPointDuplicateErrorMessage && <p>{endPointDuplicateErrorMessage}</p>}

      {errors.endPoint?.type === 'required' && (
        <ErrorText>Wajib memasukan Link</ErrorText>
      )}
      {errors.endPoint?.type === 'maxLength' && (
        <ErrorText>Link terlalu panjang (maximal 15 huruf)</ErrorText>
      )}
      <Label currency>
        Berapa biaya yang kamu butuhkan <span> * </span>
      </Label>

      <Currency
        placeholder='Masukan angka'
        prefix={'Rp. '}
        decimalsLimit={2}
        value={context?.target}
        required={true}
        onValueChange={value => context?.setTarget(value as string)}
      />
      <Label textArea>
        Untuk apa dana tersebut digunakan? <span> * </span>
      </Label>
      <TextArea
        placeholder={
          'Contoh: Untuk berlangganan netflix dan mukbang slime,sisa uang akan didonasikan ke perut saya sendiri'
        }
        defaultValue={context?.purposeDescription}
        {...register('purposeDescription', {
          required: true,
          maxLength: 480,
          minLength: 30,
        })}
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
      <Label phone>
        Nomor hp kamu yang dapat dihubungi <span> * </span>
      </Label>
      <PhoneInput
        country={'id'}
        value={context?.phoneNumber}
        disableDropdown={true}
        countryCodeEditable={false}
        inputStyle={{
          width: '100%',
          height: '59px',
          outline: 'none',
        }}
        inputProps={{
          required: true,
        }}
        onChange={phone => context?.setPhoneNumber(phone)}
      />
      <NextButton disabled={!isValid}>Selanjutnya</NextButton>
      <PreviousButton
        onClick={() => history.push('/galang-dana/add-campaign/beneficiary')}
      >
        Sebelumnya
      </PreviousButton>
    </Form>
  )
}

export default Details
