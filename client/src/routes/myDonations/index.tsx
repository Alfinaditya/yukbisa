import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { GET_MY_DONATIONS } from '../../apollo/queries/userDonation'
import { getAccessToken } from '../../auth/accessToken'
import { Mydonations } from '../../ts/donations'
import { Token } from '../../ts/token'

const MyDonations = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data, error } = useQuery(GET_MY_DONATIONS, {
    variables: { input: token.id },
  })
  if (loading) return <p>Loading....</p>
  if (data) console.log(data.myDonations)
  const myDonations: Mydonations[] = data.myDonations
  return (
    <div>
      {myDonations && myDonations.length ? (
        myDonations.map(myDonation => (
          <div>
            <img src={myDonation.image} alt={myDonation.title} />
            <h1>{myDonation.title}</h1>
            <p>{myDonation.userDonations.amount}</p>
          </div>
        ))
      ) : (
        <p>Belum pernah berdonasi</p>
      )}
      <h1>Donasi saya</h1>
    </div>
  )
}

export default MyDonations
