import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_ME } from '../../apollo/queries/user'
import { Me } from '../../ts/user'
import { ReactComponent as BrandSvg } from '../../assets/brand.svg'
import { useHistory } from 'react-router'
import DropdownMenu from './components/DropdownMenu'
import {
  Dropdown,
  Nav,
  NavLinkContainer,
  StyledNavLink,
  SearchInput,
  StyledBrandLink,
} from './style'
import BottomNavbar from './components/BottomNavbar'

const ACTIVE_STYLE = {
  fontWeight: 700,
  color: '#00AEEF',
}
const Navbar = () => {
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false)
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
  const { data, loading } = useQuery(GET_ME)
  if (loading) return <></>
  const me: Me = data.me
  return (
    <>
      <Nav>
        <StyledBrandLink to='/'>
          <BrandSvg /> <span>YukBisa</span>
        </StyledBrandLink>

        <SearchInput placeholder='Coba cari “Bantu saya”' type='search' />
        <NavLinkContainer>
          <StyledNavLink exact to='/' activeStyle={ACTIVE_STYLE}>
            Donasi
          </StyledNavLink>
          <StyledNavLink to='/galang-dana' activeStyle={ACTIVE_STYLE}>
            Galang Dana
          </StyledNavLink>
          <StyledNavLink to='/my-donations' activeStyle={ACTIVE_STYLE}>
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
            <DropdownMenu setShowMenu={setShowMenu} showMenu={showMenu} />
          )}
        </>
      )}
      {size.x <= 1330 && <BottomNavbar />}
    </>
  )
}

export default Navbar
