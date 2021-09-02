import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_CAMPAIGNS } from '../../apollo/queries/campaign'
import { Campaigns } from '../../ts/campaign'

const Home = () => {
  const { loading, data } = useQuery(GET_CAMPAIGNS)
  if (loading) {
    return <p>Loading....</p>
  }
  if (data) {
    console.log(data)
  }
  return (
    <div>
      {data &&
        data?.campaigns &&
        data?.campaigns.map((campaign: Campaigns) => (
          <div key={campaign._id}>
            <Link to={`/campaign/${campaign.endPoint}`}>
              <img src={campaign.image} alt={campaign.title} />
              <h1>{campaign.title}</h1>
              <p>{campaign.currentAmount}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Home
