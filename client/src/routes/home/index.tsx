import { useQuery } from '@apollo/client'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import {
  calcProgress,
  convertCurrency,
  convertDate,
} from '../../helpers/helper'
import { Container } from '../../components/Container'
import { Campaigns } from '../../ts/campaign'
import { Title, Card, CardImage } from './style'
import { Image } from '../../components/Image'
import { Progress } from '../details/style'

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
          const { date, month, years } = convertDate(campaign.createdAt)
          return (
            <Card key={campaign._id} to={`/campaign/${campaign.endPoint}`}>
              <CardImage>
                <Image src={campaign.image} alt={campaign.title} />
              </CardImage>
              <Title>{campaign.title}</Title>
              <p>{campaign.fundraiserDetails.name}</p>
              <p>
                {date} {month} {years}
              </p>
              <Progress
                value={calcProgress(campaign.currentAmount, campaign.target)}
                max='100'
              ></Progress>
              <p>Terkumpul</p>
              <p>{convertCurrency(campaign.currentAmount)}</p>
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
