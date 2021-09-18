import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from '../../components/Title'

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
  @media only screen and (max-width: 425px) {
    height: 108px;
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
