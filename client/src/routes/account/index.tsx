import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_ME } from '../../apollo/queries/user'
import { Container } from '../../components/Container'
import { convertDate } from '../../helpers/helper'
import { Me } from '../../ts/user'
import { MeImage, MeContainer, MeDetails, MeLabel } from './style'

const Account = () => {
  const { loading, data } = useQuery(GET_ME)
  if (loading) return <p>Loading...</p>
  const me: Me = data.me
  return (
    <Container me>
      {me && (
        <MeContainer>
          {loading && <p>Loading....</p>}
          <MeImage src={me.displayImage} alt={me.email} />
          <MeDetails>
            <MeLabel>Nama Lengkap</MeLabel>
            <p>{me.name}</p>
            <MeLabel>Email</MeLabel>
            <p>{me.email}</p>
            <MeLabel>Tanggal Lahir</MeLabel>
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
            <MeLabel>Bio Singkat</MeLabel>
            <p>{me.bio}</p>
          </MeDetails>
        </MeContainer>
      )}

      <Link to='/account/edit-account'>Edit</Link>
    </Container>
  )
}

export default Account
