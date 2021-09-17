import { gql, useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { GET_ME } from '../../apollo/queries/user'
import { setAccessToken } from '../../auth/accessToken'
import { Me } from '../../ts/user'
import { ReactComponent as BrandSvg } from '../../assets/brand.svg'
import { useHistory } from 'react-router'
import {
  Dropdown,
  Menu,
  Nav,
  MenuLink,
  NavLinkContainer,
  Logout,
  StyledNavLink,
} from './style'

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
const Navbar = () => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false)
  const [logout, { client }] = useMutation(LOGOUT, {
    fetchPolicy: 'network-only',
  })
  const { data, loading } = useQuery(GET_ME)
  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    await logout()
    setAccessToken('')
    await client.resetStore()
    history.push('/login')
  }

  if (loading) return <></>
  const me: Me = data.me

  return (
    <>
      <Nav>
        <StyledNavLink to='/'>
          <BrandSvg />
        </StyledNavLink>
        <NavLinkContainer>
          <StyledNavLink
            exact
            to='/'
            activeStyle={{ fontWeight: 700, color: '#00AEEF' }}
          >
            Donasi
          </StyledNavLink>
          <StyledNavLink
            to='/galang-dana/'
            activeStyle={{ fontWeight: 700, color: '#00AEEF' }}
          >
            Galang Dana
          </StyledNavLink>
          <StyledNavLink
            to='/my-donations'
            activeStyle={{ fontWeight: 700, color: '#00AEEF' }}
          >
            Donasi Saya
          </StyledNavLink>
          {!loading && me && (
            <>
              <Dropdown onClick={() => setShowMenu(!showMenu)}>Akun</Dropdown>
            </>
          )}
          {!loading && !me && (
            <Dropdown onClick={() => history.push('/login')}>Akun</Dropdown>
          )}
        </NavLinkContainer>
      </Nav>
      {showMenu && (
        <>
          {!loading && me && (
            <Menu onMouseLeave={() => setShowMenu(!showMenu)}>
              <MenuLink
                to='/account'
                activeStyle={{ fontWeight: 700, color: '#00AEEF' }}
              >
                Lihat Akun
              </MenuLink>
              <Logout onClick={handleLogout}>Log out</Logout>
            </Menu>
          )}
        </>
      )}
    </>
  )
}

export default Navbar
