import React, { useState } from 'react'
import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Inputs } from '..'
import {
  HeaderForm,
  LabelForm,
  Input,
  NextButton,
  ErrorText,
  ListBoxButton,
  ListBoxOptions,
  ListBoxOption,
  ListBox,
  CancelLink,
} from '../style'
interface Props {
  receiver: string
  setReceiver: React.Dispatch<React.SetStateAction<string>>
  register: UseFormRegister<Inputs>
  errors: DeepMap<Inputs, FieldError>
  isValid: boolean
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
const BeneficiaryForm: React.FC<Props> = ({
  receiver,
  setReceiver,
  register,
  errors,
  isValid,
  page,
  setPage,
}) => {
  const [showMenu, setshowMenu] = useState(false)
  const [currentReceiver, setCurrentReceiver] = useState('Saya Sendiri')
  function handleReceiver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setReceiver(e.currentTarget.id)
    setCurrentReceiver(e.currentTarget.innerHTML)
    setshowMenu(false)
  }
  return (
    <>
      <HeaderForm>Isi data di bawah ini untuk galang dana</HeaderForm>
      <LabelForm>
        Untuk siapa kamu menggalang dana <span> *</span>
      </LabelForm>
      <ListBox>
        <ListBoxButton onClick={() => setshowMenu(!showMenu)}>
          {currentReceiver}
        </ListBoxButton>
        {showMenu && (
          <ListBoxOptions>
            <ListBoxOption id={'me'} onClick={e => handleReceiver(e)}>
              Saya Sendiri
            </ListBoxOption>
            <ListBoxOption id={'others'} onClick={e => handleReceiver(e)}>
              Orang Lain
            </ListBoxOption>
          </ListBoxOptions>
        )}
      </ListBox>
      {/* <select value={receiver} onChange={e => setReceiver(e.target.value)}>
        <option value='me'>Saya Sendiri</option>
        <option value='others'>Orang Lain</option>
      </select> */}

      {receiver === 'others' && (
        <>
          <LabelForm>Nama Penerima</LabelForm>
          <Input
            type='text'
            {...register('beneficiaryName', {
              required: true,
              maxLength: 20,
            })}
          />
        </>
      )}

      {errors.beneficiaryName?.type === 'required' && (
        <ErrorText>Wajib memasukan nama penerima</ErrorText>
      )}
      {errors.beneficiaryName?.type === 'maxLength' && (
        <ErrorText>Nama terlalu panjang (maximal 20 huruf)</ErrorText>
      )}
      <NextButton disabled={!isValid} onClick={() => setPage(page + 1)}>
        Selanjutnya
      </NextButton>
      <CancelLink to='/galang-dana'>Batal menggalang dana</CancelLink>
    </>
  )
}

export default BeneficiaryForm
