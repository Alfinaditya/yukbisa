import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin-top: 25px;
  margin-right: 15px;
  color: var(--black);
  font-size: 15px;
  &:hover {
    color: var(--main);
  }
`
export const NavLinkContainer = styled.div`
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const Nav = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  align-items: center;
  /* position: relative; */
`
export const Dropdown = styled.div`
  margin-top: 25px;
  cursor: pointer;
  margin-right: 15px;
  color: var(--black);
  font-size: 15px;
  &:hover {
    color: var(--main);
  }
`
export const DropdownMenu = styled.div`
  width: 90%;
  margin: auto;
`
export const Menu = styled.div`
  width: 132px;
  height: 81px;
  padding: 10px;
  right: 0px;
  border-radius: 7px;
  position: absolute;
  top: 60px;
  z-index: 10;
  transform: translateX(-20%);
  box-shadow: var(--shadow);
  font-size: 14px;
`
export const MenuLink = styled(NavLink)`
  text-decoration: none;
  color: var(--black);
  margin-bottom: 20px;
  display: block;
  &:hover {
    color: var(--main);
  }
`
export const Logout = styled.div`
  cursor: pointer;
  &:hover {
    color: var(--main);
  }
`
