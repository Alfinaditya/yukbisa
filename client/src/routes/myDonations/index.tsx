import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { GET_MY_DONATIONS } from '../../apollo/queries/userDonation'
import { getAccessToken } from '../../auth/accessToken'
import { UserDonations } from '../../ts/donations'
interface Token {
  id: string
  name: string
}
const MyDonations = () => {
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
      <h1>My Donations</h1>
      {myDonations ? (
        myDonations.map(myDonation => (
          <div>
            <img src={myDonation.image} alt={myDonation.title} />
            <p>{myDonation.currentAmount}</p>
          </div>
        ))
      ) : (
        <p>Tidak ada penggalangan dana</p>
      )}
    </div>
  )
}

export default MyDonations
