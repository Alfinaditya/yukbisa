import { useQuery } from '@apollo/client'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import { calcProgress, convertCurrency } from '../../helpers/helper'
import { Campaigns } from '../../ts/campaign'
import {
  Card,
  CardImage,
  Fundraisername,
  CurrentAmount,
  CardText,
  CardDescription,
  CardTitle,
  SearchInput,
  HomeContainer,
} from './style'
import { Image } from '../../components/Image'
import { Progress } from '../../components/Progress'
import Loading from '../../components/Loading'
const Home = () => {
  const { loading, data } = useQuery(GET_CAMPAIGNS)
  if (loading) {
    return <Loading />
  }
  const campaigns: Campaigns[] = data.campaigns
  return (
    <HomeContainer>
      <SearchInput placeholder='Coba cari “Bantu saya”' type='search' />
      {data && campaigns.length ? (
        campaigns.map(campaign => {
          return (
            <Card key={campaign._id} to={`/campaign/${campaign.endPoint}`}>
              <CardImage>
                <Image src={campaign.image} alt={campaign.title} />
              </CardImage>
              <CardDescription>
                <CardTitle>{campaign.title}</CardTitle>
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
    </HomeContainer>
  )
}

export default Home
