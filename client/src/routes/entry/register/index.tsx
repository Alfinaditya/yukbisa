import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../../apollo/mutations/user'
import { setAccessToken } from '../../../auth/accessToken'
import { GET_ME } from '../../../apollo/queries/user'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

type Inputs = {
  email: string
  name: string
  password: string
}

const Register = () => {
  const history = useHistory()
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
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error</p>
  if (data) {
    setAccessToken(data.register.accessToken)
  }
  // async function handleSubmit(e: FormEvent) {
  //   e.preventDefault()
  //   // const body = { email, name, password }
  //   try {
  //     await createUser({
  //       variables: { input: body },
  //       update: (store, { data }) => {
  //         if (!data) {
  //           return null
  //         }
  //         store.writeQuery({
  //           query: GET_ME,
  //           data: {
  //             me: data.register.user,
  //           },
  //         })
  //       },
  //     })
  //     history.push('/')
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          type='email'
          {...register('email', {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email?.type === 'required' && <p>Wajib memasukan Email</p>}
        {errors.email?.type === 'pattern' && <p>Masukan Email yang valid</p>}
        <label>Password</label>
        <input
          type='password'
          {...register('password', {
            required: true,
            minLength: 7,
          })}
        />
        {errors.password?.type === 'required' && (
          <p>Wajib memasukan password</p>
        )}
        {errors.password?.type === 'minLength' && (
          <p>Password terlalu lemah (minimal 7 huruf)</p>
        )}
        <label>Name</label>
        <input
          type='text'
          {...register('name', {
            required: true,
            minLength: 5,
            maxLength: 20,
          })}
        />
        {errors.name?.type === 'required' && <p>Wajib memasukan nama</p>}
        {errors.name?.type === 'minLength' && (
          <p>Nama teralu pendek (minimal 5 huruf)</p>
        )}
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register
