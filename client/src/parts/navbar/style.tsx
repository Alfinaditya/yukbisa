import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from '../../components/Form'
import { HandHoldingHeart } from '@styled-icons/fa-solid/HandHoldingHeart'
import { HeartCircle } from '@styled-icons/boxicons-solid/HeartCircle'
import { ClipboardHeart } from '@styled-icons/fluentui-system-filled/ClipboardHeart'
import { User } from '@styled-icons/boxicons-solid/User'

export const Nav = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  align-items: center;
  margin-top: 20px;
`
export const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: #fcfcfc;
  border-top: 1px solid #c9c9c9;
`
export const ContainerBottomNav = styled.div`
  display: fixed;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: auto;
`
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin-right: 30px;
  color: var(--black);
  font-size: 15px;
  &:hover {
    color: var(--main);
  }
`
export const StyledBottomNavLink = styled(NavLink)`
  text-decoration: none;
  color: var(--icon--color);
  font-size: 12px;
  display: block;
  padding: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    color: var(--main);
  }
  p {
    margin-top: 6px;
  }
`
export const StyledBrandLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    font-size: 24px;
    font-weight: bold;
    color: var(--main);
  }
`
export const NavLinkContainer = styled.div`
  text-decoration: none;
  width: 60%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1330px) {
    display: none;
  }
`
export const Dropdown = styled.div`
  cursor: pointer;
  margin-right: 15px;
  color: var(--black);
  font-size: 15px;
  &:hover {
    color: var(--main);
  }
`
export const SearchInput = styled(Input)`
  width: 100%;
  border-radius: 20px;
  height: 47px;
  margin-left: 50px;
  margin-right: 20px;
  background: #fafafa;
  font-size: 12px;
  padding: 15px;
  &:hover {
    border: 1px solid #bdbdbd;
  }
  &::placeholder {
    color: #bdbdbd;
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
  background: green;
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

// icon
export const CampaignSvg = styled(HandHoldingHeart)`
  width: var(--icon--size--lg);
  height: var(--icon--size--lg);
  /* margin-bottom: 10px; */
  /* text-align: center; */
`
export const MyDonationsSvg = styled(ClipboardHeart)`
  width: var(--icon--size--lg);
  height: var(--icon--size--lg);
  /* margin-bottom: 10px; */
`
export const DonationSvg = styled(HeartCircle)`
  width: var(--icon--size--lg);
  height: var(--icon--size--lg);
  /* margin-bottom: 10px; */
`
export const UserSvg = styled(User)`
  width: var(--icon--size--lg);
  height: var(--icon--size--lg);
  /* margin-bottom: 10px; */
`
