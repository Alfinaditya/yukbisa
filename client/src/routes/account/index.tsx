import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_ME } from '../../apollo/queries/user'
import { convertDate } from '../../helpers/helper'
import { Me } from '../../ts/user'
import { MeImage } from './style'

const Account = () => {
  const { loading, data } = useQuery(GET_ME)
  if (loading) return <p>Loading...</p>
  const me: Me = data.me
  return (
    <div>
      {me && (
        <div>
          {loading && <p>Loading....</p>}
          <MeImage src={me.displayImage} alt={me.email} />
          <h1>{me.name}</h1>
          <p>{me.email}</p>
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

      <Link to='/account/edit-account'>Edit</Link>
    </div>
  )
}

export default Account
