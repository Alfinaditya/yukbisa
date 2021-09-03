import { gql, useMutation, useQuery } from '@apollo/client'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { GET_ME } from '../../apollo/queries/user'
import { setAccessToken } from '../../auth/accessToken'
import { Me } from '../../ts/user'
import { ReactComponent as BrandSvg } from '../../assets/brand.svg'
import { useHistory } from 'react-router'
import { NavLink } from './style'

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`
const Navbar = () => {
  const history = useHistory()
  const [logout, { client }] = useMutation(LOGOUT, {
    fetchPolicy: 'network-only',
  })
  const { data, loading } = useQuery<Me>(GET_ME)
  async function handleLogout(e: FormEvent) {
    e.preventDefault()
    await logout()
    setAccessToken('')
    await client.resetStore()
    history.push('/login')
  }

  return (
    <div>
      <Link to='/'>
        <BrandSvg />
      </Link>
      <NavLink to='/'>Home</NavLink>
      {!loading && data && !data.me && (
        <>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </>
      )}
      <NavLink to='/galang-dana'>Galang Dana</NavLink>
      <NavLink to='/my-donations'>Donasi Saya</NavLink>
      <NavLink to='/account'>Akun</NavLink>
      {!loading && data && data.me && <a onClick={handleLogout}>Log out</a>}
    </div>
  )
}

export default Navbar
