import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Input } from '../../components/Form'
import { Title } from '../../components/Title'
import { Container } from '../../components/Container'

export const HomeContainer = styled(Container)`
  margin-top: 80px;
`

export const SearchInput = styled(Input)`
  width: 100%;
  border-radius: 20px;
  height: 47px;
  background: #fafafa;
  font-size: 12px;
  padding: 15px;
  &:focus {
    border: 1px solid #bdbdbd;
  }
  &::placeholder {
    color: #bdbdbd;
  }
`

export const Card = styled(Link)`
  text-decoration: none;
  display: block;
  margin: 80px 0;
  box-shadow: var(--shadow);
  padding-bottom: 20px;
`
export const CardImage = styled.div`
  height: 500px;
  @media only screen and (max-width: 1024px) {
    height: 306.17px;
  }
  @media only screen and (max-width: 768px) {
    height: 206.17px;
  }
`
export const CardTitle = styled(Title)`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media only screen and (max-width: 425px) {
    font-size: 23px;
  }
`
export const CardDescription = styled.div`
  width: 95%;
  margin: auto;
  margin-top: 12px;
`
export const Fundraisername = styled.h1`
  font-weight: 300;
  font-size: 15px;
  color: var(--black);
  margin: 10px 0;
`
export const CardText = styled.p`
  font-size: 11px;
  color: var(--black);
  margin: 10px 0;
`
export const CurrentAmount = styled.p`
  font-weight: 700;
  font-size: 13px;
  color: var(--black);
`
