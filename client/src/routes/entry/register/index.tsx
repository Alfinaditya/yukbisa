import { useMutation } from '@apollo/client'
import React, { FormEvent, useState } from 'react'
import { CREATE_USER } from '../../../apollo/mutations/user'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from '../../../auth/accessToken'
import { GET_ME } from '../../../apollo/queries/user'

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    fetchPolicy: 'network-only',
  })
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  if (data) {
    setAccessToken(data.register.accessToken)
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = { email, name, password }
    try {
      await createUser({
        variables: { input: body },
        update: (store, { data }) => {
          if (!data) {
            return null
          }
          store.writeQuery({
            query: GET_ME,
            data: {
              me: data.register.user,
            },
          })
        },
      })
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Register</h1>
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
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
