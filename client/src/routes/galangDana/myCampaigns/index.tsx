import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import { GET_MY_CAMPAIGNS } from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Container } from '../../../components/Container'
import { Image } from '../../../components/Image'
import { Progress } from '../../../components/Progress'
import { calcProgress, convertCurrency } from '../../../helpers/helper'
import { Mycampaigns } from '../../../ts/campaign'
import { Token } from '../../../ts/token'
import { CardDescription, CardText, CurrentAmount } from '../../home/style'
import { CampaignButton, Card, Cards, CardTitle, CardImage } from './style'
import { v4 as uuidv4 } from 'uuid'
import Loading from '../../../components/Loading'

const MyCampaigns = () => {
  const history = useHistory()
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data } = useQuery(GET_MY_CAMPAIGNS, {
    variables: { fundraiserId: token.id },
  })
  if (loading) {
    return <Loading />
  }

  const myCampaigns: Mycampaigns[] = data.myCampaigns

  return (
    <Container>
      <Cards>
        {myCampaigns && myCampaigns.length ? (
          myCampaigns.map(myCampaign => (
            <Card key={uuidv4()} to={`/campaign/${myCampaign.endPoint}`}>
              <CardImage>
                <Image src={myCampaign.image} alt={myCampaign.title} />
              </CardImage>
              <CardDescription>
                <CardTitle>{myCampaign.title}</CardTitle>
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
          <p
            style={{
              display: 'block',
              width: '100%',
              marginTop: '200px',
              textAlign: 'center',
            }}
          >
            Anda tidak punya campaign aktif.Buat campaign sekarang dengan klik
            tombol <b>Galang Dana Sekarang</b>
          </p>
        )}
      </Cards>
      <CampaignButton
        onClick={() => history.push('/galang-dana/add-campaign/beneficiary')}
      >
        Galang Dana Sekarang !
      </CampaignButton>
    </Container>
  )
}

export default MyCampaigns
