import { useQuery } from '@apollo/client'
import { GET_CAMPAIGNS } from '../../apollo/mutations/campaign'
import { Campaign } from '../../ts/campaign'

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
        data?.campaigns.map((campaign: Campaign) => (
          <div key={campaign._id}>
            <img src={campaign.image} alt='' />
            <h1>{campaign.title}</h1>
            <p>{campaign.fundraisingUserName}</p>
            <p>{campaign.currentAmount}</p>
          </div>
        ))}
    </div>
  )
}

export default Home
