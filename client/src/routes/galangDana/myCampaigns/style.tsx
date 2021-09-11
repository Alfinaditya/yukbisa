import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from '../../../components/Title'
import { Button } from '../../../components/Button'

export const Card = styled(Link)`
  text-decoration: none;
  display: block;
  margin-top: 60px;
  margin-right: 40px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
export const CardTitle = styled(Title)`
  margin-bottom: 10px;
`
export const CardImage = styled.div`
  width: 448px;
  height: 250px;
`
export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const CampaignButton = styled(Button)`
  margin-top: 100px;
  margin-bottom: 50px;
  width: 100%;
  background: var(--main);
`
