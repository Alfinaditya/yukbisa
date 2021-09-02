import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import { Campaigns } from '../../ts/campaign'

const Home = () => {
  const { loading, data } = useQuery(GET_CAMPAIGNS)
  if (loading) {
    return <p>Loading....</p>
  }
  const campaigns: Campaigns[] = data.campaigns
  return (
    <div>
      {data &&
        campaigns &&
        campaigns.map(campaign => (
          <div key={campaign._id}>
            <Link to={`/campaign/${campaign.endPoint}`}>
              <img src={campaign.image} alt={campaign.title} />
              <h1>{campaign.title}</h1>
              <p>{campaign.fundraiserDetails.name}</p>
              <p>{campaign.currentAmount}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Home
