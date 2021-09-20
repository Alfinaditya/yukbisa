import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_ME } from '../../apollo/queries/user'
import { Container } from '../../components/Container'
import Loading from '../../components/Loading'
import { convertDate } from '../../helpers/helper'
import { Me } from '../../ts/user'
import {
  MeImage,
  MeContainer,
  MeDetails,
  MeLabel,
  EditLink,
  ExitSvg,
} from './style'

const Account = () => {
  const { loading, data } = useQuery(GET_ME)
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  })
  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    })
  useEffect(() => (window.onresize = updateSize), [])
  if (loading) return <Loading />
  const me: Me = data.me
  return (
    <Container me={true}>
      <span>
        <ExitSvg /> Log out
      </span>
      {me && (
        <MeContainer>
          <MeImage src={me.displayImage} alt={me.email} />
          <MeDetails>
            <div>
              <MeLabel>Nama Lengkap</MeLabel>
              <p>{me.name}</p>
              <MeLabel>Email</MeLabel>
              <p>{me.email}</p>

              {size.x > 566 && (
                <EditLink to='/account/edit-account'>Edit Profile</EditLink>
              )}
            </div>

            <div>
              <MeLabel>Tanggal Lahir</MeLabel>
              {!me.dateOfBirth ? (
                <p>1 September 1970</p>
              ) : (
                <p>
                  {convertDate(me.dateOfBirth).date}{' '}
                  {convertDate(me.dateOfBirth).month}{' '}
                  {convertDate(me.dateOfBirth).years}
                </p>
              )}
              <MeLabel>Bio Singkat</MeLabel>
              <p>{me.bio}</p>
              {size.x <= 566 && (
                <EditLink to='/account/edit-account'>Edit Profile</EditLink>
              )}
            </div>
          </MeDetails>
        </MeContainer>
      )}
    </Container>
  )
}

export default Account
