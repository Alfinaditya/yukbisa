import { useMutation, useQuery, gql } from '@apollo/client'
import { useState, useEffect, FormEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useHistory } from 'react-router'
import { GET_ME } from '../../apollo/queries/user'
import { setAccessToken } from '../../auth/accessToken'
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
  Logout,
} from './style'
const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
const Account = () => {
  const history = useHistory()
  const { loading, data } = useQuery(GET_ME)
  const [logout, { client }] = useMutation(LOGOUT, {
    fetchPolicy: 'network-only',
  })
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

  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    await logout()
    setAccessToken('')
    await client.resetStore()
    history.push('/login')
  }
  if (loading) return <Loading />
  const me: Me = data.me
  return (
    <Container me={true}>
      <Helmet>
        <title>{'Account'}</title>
        <meta name='description' content={'Hi saya orang baik!!'} />
        <link rel='canonical' href='https://yukbisa.netlify.app/account' />
      </Helmet>
      <Logout onClick={handleLogout}>
        <ExitSvg /> Log out
      </Logout>
      {me && (
        <MeContainer>
          <MeImage src={me.displayImage} alt={me.email} />
          <MeDetails>
            <div>
              <MeLabel>Nama Lengkap</MeLabel>
              <p>{me.name}</p>
              <MeLabel>Email</MeLabel>
              <p>{me.email}</p>
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
              <EditLink to='/account/edit-account'>Edit Profile</EditLink>
            </div>
          </MeDetails>
        </MeContainer>
      )}
    </Container>
  )
}

export default Account
