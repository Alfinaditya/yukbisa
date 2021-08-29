import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { GET_CAMPAIGN_BY_ENDPOINT } from '../../apollo/queries/campaign'

type campaign = {
  image: string
  title: string
  currentAmount: number
  target: number
  beneficiaryName: string
  fundraisingUserName: string
  purposeDescription: string
  story: string
}
interface Campaign {
  campaginByEndPoint: campaign
}

const DetailsCampaign = () => {
  const { id } = useParams<{ id?: string }>()
  const { loading, error, data } = useQuery<Campaign>(
    GET_CAMPAIGN_BY_ENDPOINT,
    {
      variables: {
        input: id,
      },
    }
  )
  if (loading) return <p>Loading...</p>
  if (data) console.log(data)
  return (
    <div>
      <h1>Details Campaign</h1>
      <p>Halooo ganggg</p>
      {data && data.campaginByEndPoint && (
        <div>
          <img
            src={data.campaginByEndPoint.image}
            alt={data.campaginByEndPoint.title}
          />
          <h1>{data.campaginByEndPoint.title}</h1>
          <p>
            {data.campaginByEndPoint.currentAmount} Terkumpul dari{' '}
            {data.campaginByEndPoint.target}
          </p>
          <h2>Informasi Penggalang Dana</h2>
          <p>{data.campaginByEndPoint.beneficiaryName}</p>
          <p>{data.campaginByEndPoint.purposeDescription}</p>
          <h1>Cerita</h1>
          <p>{data.campaginByEndPoint.story}</p>
        </div>
      )}
    </div>
  )
}

export default DetailsCampaign
