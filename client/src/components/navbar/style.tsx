import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const NavLink = styled(Link)`
  text-decoration: none;
  margin: 25px 0;
  margin-right: 15px;
  color: var(--black);
  font-size: 15px;
`
export const NavLinkContainer = styled.div`
  text-decoration: none;
  /* margin: 80px 0; */
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
export const Nav = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  align-items: center;
`
