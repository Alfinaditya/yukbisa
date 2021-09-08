import { useMutation, useQuery } from '@apollo/client'
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
  const { loading, data } = useQuery(GET_ME)
  const [editMe, { loading: mutationLoading }] = useMutation(EDIT_ME, {
    fetchPolicy: 'network-only',
    refetchQueries: [{ query: GET_ME }],
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
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
        await editMe({
          variables: { input: body },
        })
        history.push('/account')
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
        <label>Bio</label>
        <input
          {...register('bio', { required: true })}
          defaultValue={me.bio}
          type='text'
        />
        <label>Date</label>
        <input
          {...register('dateOfBirth', {
            required: true,
          })}
          defaultValue={new Date(me.dateOfBirth).toISOString().substr(0, 10)}
          type='date'
        />
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
