import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { GET_MY_CAMPAIGNS } from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Container } from '../../../components/Container'
import { Image } from '../../../components/Image'
import { Mycampaigns } from '../../../ts/campaign'
import { Token } from '../../../ts/token'
import { Card } from './style'

const MyCampaigns = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data } = useQuery(GET_MY_CAMPAIGNS, {
    variables: { fundraiserId: token.id },
  })
  if (loading) {
    return <p>Loading</p>
  }

  const myCampaigns: Mycampaigns[] = data.myCampaigns

  return (
    <Container>
      {myCampaigns && myCampaigns.length ? (
        myCampaigns.map(myCampaign => (
          <Card to={`/campaign/${myCampaign.endPoint}`}>
            <Image src={myCampaign.image} alt={myCampaign.title} />
            <h1>{myCampaign.title}</h1>
            <p>{myCampaign.currentAmount}</p>
          </Card>
        ))
      ) : (
        <p>
          Anda tidak punya campaign aktif.Buat campaign sekarang dengan klik
          tombol <b>Galang Dana Sekarang</b>
        </p>
      )}
      <Link to='/galang-dana/add-campaign'>Galang Dana Sekarang</Link>
    </Container>
  )
}

export default MyCampaigns
