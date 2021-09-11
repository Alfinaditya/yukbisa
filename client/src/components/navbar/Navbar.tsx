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
  NavLink,
  MenuLink,
  NavLinkContainer,
  DropdownMenu,
  Logout,
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

  if (loading) return <p>Loading</p>
  const me: Me = data.me

  return (
    <>
      <Nav>
        <NavLink to='/'>
          <BrandSvg />
        </NavLink>
        <NavLinkContainer>
          <NavLink to='/'>Donasi</NavLink>
          <NavLink to='/galang-dana'>Galang Dana</NavLink>
          <NavLink to='/my-donations'>Donasi Saya</NavLink>
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
              <MenuLink to='/account'>Lihat Akun</MenuLink>
              <Logout onClick={handleLogout}>Log out</Logout>
            </Menu>
          )}
        </>
      )}
    </>
  )
}

export default Navbar
