import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { LOGIN_USER } from '../../../apollo/mutations/user'
import { setAccessToken } from '../../../auth/accessToken'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    fetchPolicy: 'network-only',
  })
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  if (data) {
    setAccessToken(data.login.accessToken)
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = { email, password }
    loginUser({ variables: { input: body } })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
