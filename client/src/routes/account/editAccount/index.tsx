import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { EDIT_ME } from '../../../apollo/mutations/user'
import { GET_ME } from '../../../apollo/queries/user'
import { UserImage } from '../../../components/Image'
import { encodedImage } from '../../../helpers/helper'
import { Me } from '../../../ts/user'

type Inputs = {
  image: any
  name: string
  bio: string
  dateOfBirth: Date
}

const EditAccount = () => {
  const history = useHistory()
  const [nameDuplicateErrorMessage, setNameDuplicateErrorMessage] = useState('')
  const { loading, data } = useQuery(GET_ME)
  const [editMe, { loading: mutationLoading }] = useMutation(EDIT_ME, {
    fetchPolicy: 'network-only',
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data)
    let body
    try {
      if (data.image.length) {
        const encodedImageResult = await encodedImage(data.image[0])
        body = {
          image: encodedImageResult,
          imageId: me.displayImageId,
          name: data.name,
          bio: data.bio,
          dateOfBirth: data.dateOfBirth,
        }
      } else {
        body = {
          image: me.displayImage,
          imageId: me.displayImageId,
          name: data.name,
          bio: data.bio,
          dateOfBirth: data.dateOfBirth,
        }
      }
      try {
        const res = await editMe({
          variables: { input: body },
          refetchQueries: ({ data }) =>
            data.editMe.error.path === 'success' ? [{ query: GET_ME }] : [],
        })
        if (res.data.editMe.error.path === 'success') {
          history.push('/account')
        }
        if (res.data.editMe.error.path === 'name') {
          setNameDuplicateErrorMessage(res.data.editMe.error.message)
        }
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (loading) return <p>Loading...</p>
  const me: Me = data.me
  return (
    <div>
      <h1>Edit Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Foto</label>
        <UserImage src={me.displayImage} />
        <input {...register('image')} accept='.jpg, .jpeg, .png' type='file' />

        <input
          {...register('name', { required: true, maxLength: 15 })}
          defaultValue={me.name}
          type='text'
        />
        {errors.name?.type === 'required' && <p>Wajib memasukan nama</p>}
        {errors.name?.type === 'maxLength' && (
          <p>Nama terlalu panjang minimal (15 huruf)</p>
        )}
        {nameDuplicateErrorMessage && <p>{nameDuplicateErrorMessage}</p>}
        <label>Bio</label>
        <textarea
          {...register('bio', { required: true })}
          defaultValue={me.bio}
        />
        {errors.bio?.type === 'required' && <p>Wajib memasukan Bio</p>}
        <label>Date</label>
        <input
          {...register('dateOfBirth', {
            required: true,
          })}
          defaultValue={new Date(me.dateOfBirth).toISOString().substr(0, 10)}
          type='date'
        />
        {errors.dateOfBirth?.type === 'required' && (
          <p>Wajib memasukan Tanggal lahir</p>
        )}

        {mutationLoading ? (
          <button type='submit' disabled>
            Submit
          </button>
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </div>
  )
}

export default EditAccount
