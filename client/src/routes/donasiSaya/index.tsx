import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { GET_MY_DONATIONS } from '../../apollo/queries/userDonation'
import { getAccessToken } from '../../auth/accessToken'
import Loading from '../../components/Loading'
import { v4 as uuidv4 } from 'uuid'
import { convertCurrency, convertDate } from '../../helpers/helper'
import { Mydonations } from '../../ts/donations'
import { Token } from '../../ts/token'
import {
  Card,
  CardDate,
  CardImage,
  CardTitle,
  CurrentAmount,
  MyDonationstitle,
  MyDonationsImage,
  CardDescription,
  MyDonationsContainer,
} from './style'

const MyDonations = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data } = useQuery(GET_MY_DONATIONS, {
    variables: { input: token.id },
  })
  if (loading) return <Loading />
  const myDonations: Mydonations[] = data.myDonations
  return (
    <MyDonationsContainer>
      <MyDonationstitle>Riwayat Donasi</MyDonationstitle>
      {myDonations && myDonations.length ? (
        myDonations.map(myDonation => {
          const { date, month, years } = convertDate(
            myDonation.userDonations.createdAt as any
          )
          return (
            <Card key={uuidv4()} to={`/campaign/${myDonation.endPoint}`}>
              <CardImage>
                <MyDonationsImage
                  src={myDonation.image}
                  alt={myDonation.title}
                />
              </CardImage>
              <CardDescription>
                <CardDate>
                  {date} {month} {years}{' '}
                </CardDate>
                <CardTitle>{myDonation.title}</CardTitle>
                <CurrentAmount>
                  {convertCurrency(myDonation.userDonations.amount)}
                </CurrentAmount>
              </CardDescription>
            </Card>
          )
        })
      ) : (
        <p>Belum pernah berdonasi</p>
      )}
    </MyDonationsContainer>
  )
}

export default MyDonations
