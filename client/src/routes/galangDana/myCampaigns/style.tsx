import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Title } from '../../../components/Title'
import { Button } from '../../../components/Button'
import { Container } from '../../../components/Container'

export const MyCampaignsContainer = styled(Container)`
  margin-top: 60px;
`
export const Card = styled(Link)`
  text-decoration: none;
  display: block;
  margin-right: 40px;
  padding-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media only screen and (max-width: 1219px) {
    margin-right: 0;
    margin-bottom: 80px;
    width: 100%;
  }
`
export const CardTitle = styled(Title)`
  margin-bottom: 10px;
`
export const CardImage = styled.div`
  width: 448px;
  height: 250px;
  @media only screen and (max-width: 1219px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    height: 206.17px;
  }
`
export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 1219px) {
    justify-content: center;
  }
`
export const CampaignButton = styled(Button)`
  margin-top: 100px;
  margin-bottom: 50px;
  width: 100%;
  background: var(--main);
  @media only screen and (max-width: 324px) {
    font-size: 23px;
  }
`
