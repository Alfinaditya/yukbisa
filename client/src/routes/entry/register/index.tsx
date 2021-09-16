import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../apollo/mutations/user'
import { setAccessToken } from '../../../auth/accessToken'
import { GET_ME } from '../../../apollo/queries/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useState } from 'react'
import {
  EntryInputContainer,
  Entry,
  EntryLabel,
  FormEntry,
  HeaderEntry,
  SubmitEntryButton,
  StayAtHome,
  EntryImageContainer,
  EntryInput,
  EntryLink,
} from '../style'
import { ErrorText } from '../../../components/ErrorText'
import { ReactComponent as EntryImage } from '../../../assets/entryImage.svg'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  name: string
  password: string
}

const Register = () => {
  const history = useHistory()
  const [nameDuplicateErrorMessage, setNameDuplicateErrorMessage] = useState('')
  const [emailDuplicateErrorMessage, setEmailDuplicateErrorMessage] =
    useState('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    fetchPolicy: 'network-only',
  })
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await createUser({
        variables: { input: data },
        update: (store, { data }) => {
          setEmailDuplicateErrorMessage('')
          setNameDuplicateErrorMessage('')
          if (!data) {
            return null
          }
          if (data.register.error.path === 'email') {
            setEmailDuplicateErrorMessage(data.register.error.message)
          }
          if (data.register.error.path === 'name') {
            setNameDuplicateErrorMessage(data.register.error.message)
          }
          if (data.register.user && data.register.accessToken) {
            setAccessToken(data.register.accessToken)
            store.writeQuery({
              query: GET_ME,
              data: {
                me: data.register.user,
              },
            })
            history.push('/')
          }
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  return (
    <Entry>
      <FormEntry onSubmit={handleSubmit(onSubmit)}>
        <EntryInputContainer>
          <HeaderEntry>Selamat datang di YukBisa</HeaderEntry>
          <EntryLabel>Email</EntryLabel>
          <EntryInput
            type='email'
            placeholder='Email'
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === 'required' && <p>Wajib memasukan Email</p>}
          {errors.email?.type === 'pattern' && <p>Masukan Email yang valid</p>}
          {emailDuplicateErrorMessage && <p>{emailDuplicateErrorMessage}</p>}
          <EntryLabel>Password</EntryLabel>
          <EntryInput
            type='password'
            placeholder='Password'
            {...register('password', {
              required: true,
              minLength: 7,
            })}
          />
          {errors.password?.type === 'required' && (
            <ErrorText>Wajib memasukan password</ErrorText>
          )}
          {errors.password?.type === 'minLength' && (
            <ErrorText>Password terlalu lemah (minimal 7 huruf)</ErrorText>
          )}
          <EntryLabel>Nama kamu</EntryLabel>
          <EntryInput
            type='text'
            placeholder='Nama kamu'
            {...register('name', {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
          />
          {errors.name?.type === 'required' && <p>Wajib memasukan nama</p>}
          {errors.name?.type === 'minLength' && (
            <ErrorText>Nama teralu pendek (minimal 5 huruf)</ErrorText>
          )}
          {nameDuplicateErrorMessage && <p>{nameDuplicateErrorMessage}</p>}

          <EntryLink>
            Sudah punya akun ? <Link to={'/login'}>Login disini </Link>
          </EntryLink>
          <SubmitEntryButton type='submit'>Daftar sekarang</SubmitEntryButton>
        </EntryInputContainer>

        <EntryImageContainer>
          <StayAtHome>#StayAtHome</StayAtHome>
          <EntryImage />
        </EntryImageContainer>
      </FormEntry>
    </Entry>
  )
}

export default Register
