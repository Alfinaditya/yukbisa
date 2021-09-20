import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { FormEvent } from 'react'
import { useHistory } from 'react-router'
import { setAccessToken } from '../../../auth/accessToken'
import { Menu, MenuLink, Logout } from '../style'
const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
interface Props {
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}
const DropdownMenu: React.FC<Props> = ({ showMenu, setShowMenu }) => {
  const history = useHistory()
  const [logout, { client }] = useMutation(LOGOUT, {
    fetchPolicy: 'network-only',
  })
  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    await logout()
    setAccessToken('')
    await client.resetStore()
    history.push('/login')
  }

  return (
    <Menu onMouseLeave={() => setShowMenu(!showMenu)}>
      <MenuLink to='/account'>Lihat Akun</MenuLink>
      <Logout onClick={handleLogout}>Log out</Logout>
    </Menu>
  )
}

export default DropdownMenu
