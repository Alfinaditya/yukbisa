import { useQuery } from '@apollo/client'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import { GET_CAMPAIGN_DETAILS } from '../../apollo/queries/campaign'
import { Container } from '../../components/Container'
import { DonationImage, Image } from '../../components/Image'
import { Campaign } from '../../ts/campaign'
import { Title } from './style'

const DetailsCampaign = () => {
  const { slug } = useParams<{ slug?: string }>()
  let { url } = useRouteMatch()
  const { loading, data } = useQuery(GET_CAMPAIGN_DETAILS, {
    variables: {
      input: slug,
    },
  })

  if (loading) return <p>Loading...</p>
  const campaignDetails: Campaign = data.campaign[0]

  return (
    <Container>
      <h1>Details Campaign</h1>
      <p>Halooo ganggg</p>
      <Link to={`${url}/donation?slug=${slug}`}>
        <button>Donasi Sekarang</button>
      </Link>
      {data && campaignDetails && (
        <>
          <Image src={campaignDetails.image} />
          <Title>{campaignDetails.title}</Title>
          <h1>{campaignDetails.beneficiaryName}</h1>
          <p>{campaignDetails.currentAmount || campaignDetails.target}</p>
          <p>{campaignDetails.purposeDescription}</p>
          <p>{campaignDetails.story}</p>
          {campaignDetails.userDetails &&
            campaignDetails.userDetails.map(user =>
              user.amount && user.userId ? (
                <div>
                  <DonationImage
                    src={user.user.displayImage}
                    alt={user.user.name}
                  />
                  <p>{user.user.name}</p>
                  <p>{user.amount}</p>
                  <p>{user.message}</p>
                </div>
              ) : (
                <p>Belum ada yang menyumbang</p>
              )
            )}
        </>
      )}
    </Container>
  )
}

export default DetailsCampaign
