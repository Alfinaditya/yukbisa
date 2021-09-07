import { useQuery } from '@apollo/client'
import { GET_ME } from '../../apollo/queries/user'
import { Me } from '../../ts/user'

const Account = () => {
  const { loading, data, error } = useQuery<Me>(GET_ME)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong</p>
  return (
    <div>
      {data && data.me && (
        <div>
          {loading && <p>Loading....</p>}
          <h1>{data.me.email}</h1>
          <img src={data.me.displayImage} alt={data.me.email} />
          <p>{data.me.bio}</p>
          <p>{data.me.dateOfBirth || '1 September 1970'}</p>
        </div>
      )}
      <form action=''>
        <label>Foto</label>
        <input type='file' />
        <label>Bio</label>
        <input type='text' />
        <label>Date</label>
        <input type='date' />
      </form>
    </div>
  )
}

export default Account
