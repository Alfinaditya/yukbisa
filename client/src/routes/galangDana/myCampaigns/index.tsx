import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { GET_MY_DONATIONS } from '../../../apollo/queries/userDonation'
import { getAccessToken } from '../../../auth/accessToken'
import { UserDonations } from '../../../ts/donations'
interface Token {
  id: string
  name: string
}
const MyCampaigns = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data, error } = useQuery(GET_MY_DONATIONS, {
    variables: { input: token.id },
  })
  if (loading) {
    return <p>Loading</p>
  }

  if (data) {
    console.log(data)
  }

  const myDonations: UserDonations[] = data.myDonations

  return (
    <div>
      <h1>Campaign saya</h1>
      <h1>My Donations</h1>
      {myDonations.length === 0 && (
        <p>
          Anda tidak punya campaign aktif.Buat campaign sekarang dengan klik
          tombol <b> Galang Dana Sekarang</b>
        </p>
      )}
      {myDonations &&
        myDonations.map(myDonation => (
          <div>
            <img src={myDonation.image} alt={myDonation.title} />
            <h1>{myDonation.title}</h1>
            <p>{myDonation.currentAmount}</p>
          </div>
        ))}
      <Link to='/galang-dana/add-campaign'>Galang Dana Sekarang</Link>
    </div>
  )
}

export default MyCampaigns
