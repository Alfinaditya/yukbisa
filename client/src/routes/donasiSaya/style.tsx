import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Image } from '../../components/Image'
import { Title } from '../../components/Title'
import { Container } from '../../components/Container'

export const MyDonationsContainer = styled(Container)`
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`

export const Card = styled(Link)`
  margin: 20px 0;
  box-shadow: var(--shadow);
  color: var(--black);
  text-decoration: none;
  display: flex;
  padding: 15px;
  align-items: center;
`
export const MyDonationsImage = styled(Image)`
  border-radius: 4px;
`
export const CardImage = styled.div`
  width: 288px;
  height: 112px;
  @media only screen and (max-width: 554px) {
    width: 188px;
  }
  @media only screen and (max-width: 404px) {
    width: 88px;
    height: 88px;
  }
`
export const CardDescription = styled.div`
  margin-left: 15px;
`
export const CardTitle = styled.h1`
  font-size: 12px;
  font-weight: 700;
  margin: 20px 0;
`
export const CurrentAmount = styled.h1`
  font-size: 12px;
  font-weight: 100;
`
export const CardDate = styled.p`
  font-size: 12px;
  font-weight: 100;
`
export const MyDonationstitle = styled(Title)`
  margin-top: 50px;
`
