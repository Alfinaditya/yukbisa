import { useQuery } from '@apollo/client'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import { GET_CAMPAIGN_BY_ENDPOINT } from '../../apollo/queries/campaign'
import { Campaign } from '../../ts/campaign'

const DetailsCampaign = () => {
  const { slug } = useParams<{ slug?: string }>()
  let { url } = useRouteMatch()
  const { loading, data } = useQuery<Campaign>(GET_CAMPAIGN_BY_ENDPOINT, {
    variables: {
      input: slug,
    },
  })
  if (loading) return <p>Loading...</p>
  if (data) console.log(data)
  return (
    <div>
      <h1>Details Campaign</h1>
      <p>Halooo ganggg</p>
      <Link to={`${url}/donation?slug=${slug}`}>
        <button>Donasi Sekarang</button>
      </Link>
      {/* {data && data.campaginByEndPoint && (
        <div>
          <img
            src={data.campaginByEndPoint.image}
            alt={data.campaginByEndPoint.title}
          />
          <Link to={`${url}/donation?slug=${slug}`}>
            <button>Donasi Sekarang</button>
          </Link>
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
      )} */}
    </div>
  )
}

export default DetailsCampaign
