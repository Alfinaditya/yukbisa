import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { LOGIN_USER } from '../../../apollo/mutations/user'
import { GET_ME } from '../../../apollo/queries/user'
import { setAccessToken } from '../../../auth/accessToken'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    fetchPolicy: 'network-only',
  })
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  if (data) {
    console.log(data)
    setAccessToken(data.login.accessToken)
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = { email, password }
    await loginUser({
      variables: { input: body },
      update: (store, { data }) => {
        if (!data) {
          return null
        }
        store.writeQuery({
          query: GET_ME,
          data: {
            me: data.login.user,
          },
        })
      },
    })
    history.push('/')
  }
  function handleLoginGoogle() {
    window.location.replace('http://localhost:3001/auth/google')
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
      <button onClick={handleLoginGoogle}>Login Google</button>
    </div>
  )
}

export default Login
