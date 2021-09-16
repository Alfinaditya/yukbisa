import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LOGIN_USER } from '../../../apollo/mutations/user'
import { GET_ME } from '../../../apollo/queries/user'
import { setAccessToken } from '../../../auth/accessToken'
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
const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    fetchPolicy: 'network-only',
  })
  if (loading) return <p>Loading....</p>

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = { email, password }
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
    window.location.replace('http://localhost:3001/auth/google')
  }
  return (
    <Entry>
      <FormEntry onSubmit={handleSubmit}>
        <EntryInputContainer>
          <HeaderEntry>Selamat datang di YukBisa</HeaderEntry>
          <EntryLabel>Email</EntryLabel>
          <EntryInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          {loginErrorMessage && <p>{loginErrorMessage}</p>}

          <EntryLabel>Password</EntryLabel>
          <EntryInput
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
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
