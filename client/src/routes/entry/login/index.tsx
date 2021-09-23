import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { LOGIN_USER } from '../../../apollo/mutations/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GET_ME } from '../../../apollo/queries/user'
import { getAccessToken, setAccessToken } from '../../../auth/accessToken'
import { ReactComponent as EntryImage } from '../../../assets/entryImage.svg'

import {
  HeaderEntry,
  StayAtHome,
  Entry,
  EntryInputContainer,
  EntryImageContainer,
  FormEntry,
  SubmitEntryButton,
  GoogleLoginButton,
  EntryLink,
  EntryLabel,
  EntryInput,
} from '../style'
import { ErrorText } from '../../../components/ErrorText'
import Loading from '../../../components/Loading'
import { googleAuthUrl } from '../../../constant/constants'
import { Helmet } from 'react-helmet-async'
type Inputs = {
  email: string
  password: string
}
const Login = () => {
  const history = useHistory()
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    fetchPolicy: 'network-only',
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()
  if (loading) return <Loading />

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const body = { email: data.email, password: data.password }
    await loginUser({
      variables: { input: body },
      update: (store, { data }) => {
        if (!data) {
          return null
        }
        setLoginErrorMessage(data.login.error.message)
        if (data.login.user && data.login.accessToken) {
          setAccessToken(data.login.accessToken)
          store.writeQuery({
            query: GET_ME,
            data: {
              me: data.login.user,
            },
          })
          history.push('/')
        }
      },
    })
  }

  function handleLoginGoogle() {
    window.location.replace(googleAuthUrl)
  }
  return (
    <Entry>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Login sekarang !!!!' />
        <link rel='canonical' href='https://yukbisa.netlify.app/login' />
      </Helmet>
      {getAccessToken() && <Redirect to={'/'} />}
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
          {errors.email?.type === 'required' && (
            <ErrorText>Wajib memasukan Email</ErrorText>
          )}
          {errors.email?.type === 'pattern' && (
            <ErrorText>Masukan Email yang valid</ErrorText>
          )}
          {loginErrorMessage && <ErrorText>{loginErrorMessage}</ErrorText>}

          <EntryLabel>Password</EntryLabel>
          <EntryInput
            type='password'
            placeholder='Password'
            {...register('password', {
              required: true,
            })}
          />
          {errors.password?.type === 'required' && (
            <ErrorText>Wajib memasukan password</ErrorText>
          )}
          <EntryLink>
            Belum punya akun ? <Link to={'/register'}>Daftar disini </Link>
          </EntryLink>
          <SubmitEntryButton type='submit'>Submit</SubmitEntryButton>
          <GoogleLoginButton onClick={handleLoginGoogle}>
            <img
              src='https://res.cloudinary.com/alfin-software/image/upload/v1631765208/assets/google_tqpmnb.svg'
              alt=''
            />{' '}
            <span>Login dengan Google</span>
          </GoogleLoginButton>
        </EntryInputContainer>

        <EntryImageContainer>
          <StayAtHome>#StayAtHome</StayAtHome>
          <EntryImage />
        </EntryImageContainer>
      </FormEntry>
    </Entry>
  )
}

export default Login
