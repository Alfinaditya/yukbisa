import { useMutation } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { CREATE_USER } from '../../../apollo/mutations/user'
import cookie from 'js-cookie'

// Todo create interface User
// Todo install react hook form
const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [
    createUser,
    {
      data: createUserData,
      loading: createUserLoading,
      error: createUserError,
    },
  ] = useMutation(CREATE_USER)
  if (createUserLoading) return <p>Loading....</p>
  if (createUserError) return <p>Error</p>
  if (createUserData) {
    cookie.set('INFO_LOGIN', `Bearer ${createUserData.register.accessToken}`)
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const body = { email, name, password }
    createUser({ variables: { input: body } })
  }
  return (
    <div>
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
