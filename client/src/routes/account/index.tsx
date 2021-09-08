import { useMutation, useQuery } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EDIT_ME } from '../../apollo/mutations/user'
import { GET_ME } from '../../apollo/queries/user'
import { convertDate, encodedImage } from '../../helpers/helper'
import { Me } from '../../ts/user'
import { MeImage } from './style'
type Inputs = {
  image: any
  bio: string
  dateOfBirth: Date
}
const Account = () => {
  const { loading, data } = useQuery(GET_ME)
  const [editMe] = useMutation(EDIT_ME, {
    fetchPolicy: 'network-only',
    // refetchQueries: [
    //   { query: GET_CAMPAIGNS },
    //   { query: GET_MY_CAMPAIGNS, variables: { fundraiserId: token.id } },
    // ],
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>()
  if (loading) return <p>Loading...</p>
  const me: Me = data.me
  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const encodedImageResult = await encodedImage(data.image[0])
      const body = {
        image: encodedImageResult,
        imageId: me.displayImageId,
        bio: data.bio,
        dateOfBirth: data.dateOfBirth,
      }
      try {
        await editMe({
          variables: { input: body },
        })
      } catch (error) {
        console.log(JSON.stringify(error, null, 2))
      }
    } catch (error) {
      console.log(error)
    }

    // await editCampaign({
    //   variables: { input: body },
    //   refetchQueries: [
    //     { query: GET_CAMPAIGNS },
    //     { query: GET_CAMPAIGN_DETAILS, variables: { input: slug } },
    //     { query: GET_MY_CAMPAIGNS, variables: { fundraiserId: token.id } },
    //   ],
    // })
    // history.push(`/campaign/${slug}`)
  }

  // Todo created edit-me route
  return (
    <div>
      {me && (
        <div>
          {loading && <p>Loading....</p>}
          <h1>{me.email}</h1>
          <MeImage src={me.displayImage} alt={me.email} />
          <p>{me.bio}</p>
          {!me.dateOfBirth ? (
            <p>1 September 1970</p>
          ) : (
            <p>
              {/* Todo Fix this unholy code */}
              {convertDate(me.dateOfBirth).date}{' '}
              {convertDate(me.dateOfBirth).month}{' '}
              {convertDate(me.dateOfBirth).years}
            </p>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Foto</label>
        <input
          {...register('image', {
            required: true,
          })}
          accept='.jpg, .jpeg, .png'
          type='file'
        />
        <label>Bio</label>
        <input
          {...register('bio', {
            required: true,
          })}
          type='text'
        />
        <label>Date</label>
        <input
          {...register('dateOfBirth', {
            required: true,
          })}
          type='date'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Account
