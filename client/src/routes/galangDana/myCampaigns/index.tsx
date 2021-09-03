import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { GET_MY_CAMPAIGNS } from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Mycampaigns } from '../../../ts/campaign'
import { Token } from '../../../ts/token'

const MyCampaigns = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data, error } = useQuery(GET_MY_CAMPAIGNS, {
    variables: { input: token.id },
  })
  if (loading) {
    return <p>Loading</p>
  }

  if (data) {
    console.log(data)
  }

  const myCampaigns: Mycampaigns[] = data.myCampaigns

  return (
    <div>
      <h1>Campaign saya</h1>
      <h1>My Donations</h1>
      {myCampaigns && myCampaigns.length ? (
        myCampaigns.map(myCampaigns => (
          <div>
            <img src={myCampaigns.image} alt={myCampaigns.title} />
            <h1>{myCampaigns.title}</h1>
            <p>{myCampaigns.currentAmount}</p>
          </div>
        ))
      ) : (
        <p>
          Anda tidak punya campaign aktif.Buat campaign sekarang dengan klik
          tombol <b>Galang Dana Sekarang</b>
        </p>
      )}
      <Link to='/galang-dana/add-campaign'>Galang Dana Sekarang</Link>
    </div>
  )
}

export default MyCampaigns
