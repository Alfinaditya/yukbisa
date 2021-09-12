import React from 'react'
import PhoneInput from 'react-phone-input-2'
import {
  HeaderForm,
  LabelForm,
  Input,
  InputEndPoint,
  ErrorText,
  Currency,
  TextArea,
  NextButton,
  PreviousButton,
} from '../style'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { Inputs } from '..'
interface Props {
  register: UseFormRegister<Inputs>
  errors: DeepMap<Inputs, FieldError>
  isValid: boolean
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  endPointDuplicateErrorMessage: string
  target: string | undefined
  setTarget: React.Dispatch<React.SetStateAction<string | undefined>>
  phoneNumber: string
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
}
const DetailsForm: React.FC<Props> = ({
  register,
  errors,
  isValid,
  page,
  setPage,
  target,
  setTarget,
  phoneNumber,
  setPhoneNumber,
  endPointDuplicateErrorMessage,
}) => {
  return (
    <>
      <HeaderForm>Detail penggalan dana & perkiraan biaya</HeaderForm>
      <LabelForm title>
        Beri judul untuk penggalangan danamu <span> * </span>
      </LabelForm>
      <Input
        type='text'
        {...register('title', { required: true, maxLength: 50 })}
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
        />
      </InputEndPoint>
      {endPointDuplicateErrorMessage && <p>{endPointDuplicateErrorMessage}</p>}

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
        value={target}
        required={true}
        onValueChange={value => setTarget(value)}
      />
      <LabelForm textArea>
        Untuk apa dana tersebut digunakan? <span> * </span>
      </LabelForm>
      <TextArea
        placeholder={
          'Contoh: Untuk berlangganan netflix dan mukbang slime,sisa uang akan didonasikan ke perut saya sendiri'
        }
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
        value={phoneNumber}
        disableDropdown={true}
        countryCodeEditable={false}
        inputStyle={{
          width: '100%',
          height: '59px',
          outline: 'none',
        }}
        onChange={phone => setPhoneNumber(phone)}
      />
      <NextButton disabled={!isValid} onClick={() => setPage(page + 1)}>
        Selanjutnya
      </NextButton>
      <PreviousButton onClick={() => setPage(page - 1)}>
        Sebelumnya
      </PreviousButton>
    </>
  )
}

export default DetailsForm
