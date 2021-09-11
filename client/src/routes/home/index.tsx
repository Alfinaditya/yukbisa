import { useQuery } from '@apollo/client'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import { calcProgress, convertCurrency } from '../../helpers/helper'
import { Container } from '../../components/Container'
import { Campaigns } from '../../ts/campaign'
import {
  Card,
  CardImage,
  Fundraisername,
  CurrentAmount,
  CardText,
  CardDescription,
} from './style'
import { Image } from '../../components/Image'
import { Title } from '../../components/Title'
import { Progress } from '../../components/Progress'

const Home = () => {
  const { loading, data } = useQuery(GET_CAMPAIGNS)
  if (loading) {
    return <p>Loading....</p>
  }
  const campaigns: Campaigns[] = data.campaigns

  return (
    <Container>
      {data && campaigns.length ? (
        campaigns.map(campaign => {
          return (
            <Card key={campaign._id} to={`/campaign/${campaign.endPoint}`}>
              <CardImage>
                <Image src={campaign.image} alt={campaign.title} />
              </CardImage>
              <CardDescription>
                <Title>{campaign.title}</Title>
                <Fundraisername>
                  {campaign.fundraiserDetails.name}
                </Fundraisername>
                <Progress
                  value={calcProgress(campaign.currentAmount, campaign.target)}
                  max='100'
                ></Progress>
                <CardText>Terkumpul</CardText>
                <CurrentAmount>
                  {convertCurrency(campaign.currentAmount)}
                </CurrentAmount>
              </CardDescription>
            </Card>
          )
        })
      ) : (
        <p>Belum ada campaign</p>
      )}
    </Container>
  )
}

export default Home
