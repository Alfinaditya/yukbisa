import { useQuery } from '@apollo/client'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import { convertDate } from '../../helpers/helper'
import { Container } from '../../components/Container'
import { Campaigns } from '../../ts/campaign'
import { Title, Card } from './style'
import { Image } from '../../components/Image'

const Home = () => {
  const { loading, data } = useQuery(GET_CAMPAIGNS)
  if (loading) {
    return <p>Loading....</p>
  }
  const campaigns: Campaigns[] = data.campaigns

  return (
    <Container>
      {data &&
        campaigns &&
        campaigns.map(campaign => {
          const { date, month, years } = convertDate(campaign.createdAt)
          return (
            <Card key={campaign._id} to={`/campaign/${campaign.endPoint}`}>
              <Image src={campaign.image} alt={campaign.title} />
              <Title>{campaign.title}</Title>
              <p>{campaign.fundraiserDetails.name}</p>
              <p>
                {date} {month} {years}
              </p>
              <p>Terkumpul</p>
              <p>{campaign.currentAmount}</p>
            </Card>
          )
        })}
    </Container>
  )
}

export default Home
