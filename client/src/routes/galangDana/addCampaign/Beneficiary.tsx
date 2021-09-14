import { useContext, useState } from 'react'
import {
  HeaderForm,
  LabelForm,
  ListBox,
  ListBoxButton,
  ListBoxOptions,
  ListBoxOption,
  ErrorText,
  CancelLink,
  NextButton,
  Input,
  Form,
} from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { Token } from '../../../ts/token'
import { getAccessToken } from '../../../auth/accessToken'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { useHistory } from 'react-router'

type Inputs = {
  beneficiaryName: string
}
const Beneficiary = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  const token: Token = jwtDecode(getAccessToken())
  function handleReceiver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    context?.setReceiver(e.currentTarget.id)
    context?.setCurrentReceiver(e.currentTarget.innerHTML)
    context?.setShowMenu(false)
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { beneficiaryName: context?.beneficiaryName || token.name },
  })
  const onSubmit: SubmitHandler<Inputs> = async data => {
    context?.setBeneficiaryName(data.beneficiaryName)
    history.push('/galang-dana/add-campaign/details')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HeaderForm>Isi data di bawah ini untuk galang dana</HeaderForm>
      <LabelForm>
        Untuk siapa kamu menggalang dana <span> *</span>
      </LabelForm>
      <ListBox>
        <ListBoxButton
          onClick={() => {
            context?.setShowMenu(!context.showMenu)
          }}
        >
          {context?.currentReceiver}
        </ListBoxButton>
        {context?.showMenu && (
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

      {context?.receiver === 'others' && (
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
      <NextButton type='submit' disabled={!isValid}>
        Selanjutnya
      </NextButton>
      <CancelLink to='/galang-dana'>Batal menggalang dana</CancelLink>
    </Form>
  )
}

export default Beneficiary
