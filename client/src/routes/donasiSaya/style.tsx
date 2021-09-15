import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Image } from '../../components/Image'

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
  height: 112px;
  width: 288px;
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
export const MyDonationstitle = styled.h1`
  font-size: 15px;
  font-weight: bold;
  margin-top: 50px;
`
