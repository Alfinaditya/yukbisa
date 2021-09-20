import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { GET_ME } from '../../apollo/queries/user'
import { Me } from '../../ts/user'
import { ReactComponent as BrandSvg } from '../../assets/brand.svg'
import { useHistory, useLocation } from 'react-router'
import DropdownMenu from './components/DropdownMenu'
import {
  TriggerDropdown,
  Nav,
  NavLinkContainer,
  StyledNavLink,
  ContainerDropdownMenu,
  StyledBrandLink,
} from './style'
import BottomNavbar from './components/BottomNavbar'

const ACTIVE_STYLE = {
  fontWeight: 700,
  color: '#00AEEF',
}
const Navbar = () => {
  const history = useHistory()
  const { pathname } = useLocation()
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
        <NavLinkContainer otherRoutes={pathname != '/' ? true : false}>
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
            <ContainerDropdownMenu>
              <TriggerDropdown
                activeStyle={pathname == '/account' ? true : false}
                onClick={() => setShowMenu(!showMenu)}
              >
                Akun
              </TriggerDropdown>
              {showMenu && (
                <>
                  {!loading && me && (
                    <DropdownMenu
                      setShowMenu={setShowMenu}
                      showMenu={showMenu}
                    />
                  )}
                </>
              )}
            </ContainerDropdownMenu>
          )}
          {!loading && !me && (
            <TriggerDropdown onClick={() => history.push('/login')}>
              Akun
            </TriggerDropdown>
          )}
        </NavLinkContainer>
      </Nav>

      {size.x <= 1330 && <BottomNavbar />}
    </>
  )
}

export default Navbar
