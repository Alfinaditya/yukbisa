import { useContext } from 'react'
import {
  HeaderForm,
  ListBox,
  ListBoxButton,
  ListBoxOptions,
  ListBoxOption,
} from './style'
import { useForm, SubmitHandler } from 'react-hook-form'
import jwtDecode from 'jwt-decode'
import { Token } from '../../../ts/token'
import { getAccessToken } from '../../../auth/accessToken'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { useHistory } from 'react-router'
import { Form, Input, Label } from '../../../components/Form'
import { ErrorText } from '../../../components/ErrorText'
import { CancelLink, NextButton } from '../../../components/Button'

type Inputs = {
  beneficiaryName: string
}
const Beneficiary = () => {
  const history = useHistory()
  const ctx = useContext(AddCampaignContext)
  const token: Token = jwtDecode(getAccessToken())
  function handleReceiver(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    ctx?.setReceiver(e.currentTarget.id)
    ctx?.setCurrentReceiver(e.currentTarget.innerHTML)
    ctx?.setShowMenu(false)
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { beneficiaryName: ctx?.beneficiaryName || token.name },
  })
  const onSubmit: SubmitHandler<Inputs> = async data => {
    ctx?.setBeneficiaryName(data.beneficiaryName)
    history.push('/galang-dana/add-campaign/details')
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <HeaderForm>Isi data di bawah ini untuk galang dana</HeaderForm>
      <Label>
        Untuk siapa kamu menggalang dana <span> *</span>
      </Label>
      <ListBox>
        <ListBoxButton
          onClick={() => {
            ctx?.setShowMenu(!ctx.showMenu)
          }}
        >
          {ctx?.currentReceiver}
        </ListBoxButton>
        {ctx?.showMenu && (
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

      {ctx?.receiver === 'others' && (
        <>
          <Label>Nama Penerima</Label>
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
