import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { GET_MY_CAMPAIGNS } from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Container } from '../../../components/Container'
import { Image } from '../../../components/Image'
import { Progress } from '../../../components/Progress'
import { Title } from '../../../components/Title'
import { calcProgress, convertCurrency } from '../../../helpers/helper'
import { Mycampaigns } from '../../../ts/campaign'
import { Token } from '../../../ts/token'
import { CardDescription, CardText, CurrentAmount } from '../../home/style'
import { CampaignButton, Card } from './style'

const MyCampaigns = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data } = useQuery(GET_MY_CAMPAIGNS, {
    variables: { fundraiserId: token.id },
  })
  if (loading) {
    return <p>Loading</p>
  }

  const myCampaigns: Mycampaigns[] = data.myCampaigns

  return (
    <Container>
      {myCampaigns && myCampaigns.length ? (
        myCampaigns.map(myCampaign => (
          <Card to={`/campaign/${myCampaign.endPoint}`}>
            <Image src={myCampaign.image} alt={myCampaign.title} />
            <CardDescription>
              <Title>{myCampaign.title}</Title>
              <Progress
                value={calcProgress(
                  myCampaign.currentAmount,
                  myCampaign.target
                )}
                max='100'
              ></Progress>
              <CardText>Terkumpul</CardText>
              <CurrentAmount>
                {convertCurrency(myCampaign.currentAmount)}
              </CurrentAmount>
            </CardDescription>
          </Card>
        ))
      ) : (
        <p>
          Anda tidak punya campaign aktif.Buat campaign sekarang dengan klik
          tombol <b>Galang Dana Sekarang</b>
        </p>
      )}
      <CampaignButton to='/galang-dana/add-campaign'>
        Galang Dana Sekarang
      </CampaignButton>
    </Container>
  )
}

export default MyCampaigns
