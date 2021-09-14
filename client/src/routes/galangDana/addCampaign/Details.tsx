import React, { useState, useContext } from 'react'
import {
  Currency,
  ErrorText,
  Form,
  HeaderForm,
  Input,
  InputEndPoint,
  LabelForm,
  NextButton,
  PreviousButton,
  TextArea,
} from './style'
import PhoneInput from 'react-phone-input-2'
import { useForm, SubmitHandler } from 'react-hook-form'
import 'react-phone-input-2/lib/material.css'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { useHistory } from 'react-router'
import { createEndpoint } from '../../../helpers/helper'

type Inputs = {
  title: string
  endPoint: string
  purposeDescription: string
}

const Details = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<Inputs> = async data => {
    context?.setTitle(data.title)
    context?.setEndPoint(createEndpoint(data.endPoint))
    context?.setPurposeDescription(data.purposeDescription)
    history.push('/galang-dana/add-campaign/photo')
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HeaderForm>Detail penggalan dana & perkiraan biaya</HeaderForm>
      <LabelForm title>
        Beri judul untuk penggalangan danamu <span> * </span>
      </LabelForm>
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
      <LabelForm endPoint>
        Tentukan link untuk penggalangan danamu <span> * </span>
      </LabelForm>
      <LabelForm sub>gunakan huruf tanpa spasi</LabelForm>
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
      {context?.endPointDuplicateErrorMessage && (
        <p>{context.endPointDuplicateErrorMessage}</p>
      )}

      {errors.endPoint?.type === 'required' && (
        <ErrorText>Wajib memasukan Link</ErrorText>
      )}
      {errors.endPoint?.type === 'maxLength' && (
        <ErrorText>Link terlalu panjang (maximal 15 huruf)</ErrorText>
      )}
      <LabelForm currency>
        Berapa biaya yang kamu butuhkan <span> * </span>
      </LabelForm>

      <Currency
        placeholder='Masukan angka'
        prefix={'Rp. '}
        decimalsLimit={2}
        value={context?.target}
        required={true}
        onValueChange={value => context?.setTarget(value as string)}
      />
      <LabelForm textArea>
        Untuk apa dana tersebut digunakan? <span> * </span>
      </LabelForm>
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
      <LabelForm phone>
        Nomor hp kamu yang dapat dihubungi <span> * </span>
      </LabelForm>
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
