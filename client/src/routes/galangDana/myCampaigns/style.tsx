import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DonationButton } from '../../details/style'

export const Card = styled(Link)`
  text-decoration: none;
  display: block;
  margin: auto;
  margin-top: 60px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
export const Cards = styled.div`
  display: flex;
`
export const CampaignButton = styled(DonationButton)`
  margin-top: 100px;
  background: var(--main);
`
