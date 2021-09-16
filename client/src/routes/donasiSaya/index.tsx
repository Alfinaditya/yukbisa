import { useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { GET_MY_DONATIONS } from '../../apollo/queries/userDonation'
import { getAccessToken } from '../../auth/accessToken'
import { Container } from '../../components/Container'
import Loading from '../../components/Loading'
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
} from './style'

const MyDonations = () => {
  const token: Token = jwtDecode(getAccessToken())
  const { loading, data, error } = useQuery(GET_MY_DONATIONS, {
    variables: { input: token.id },
  })
  if (loading) return <Loading />
  if (data) console.log(data.myDonations)
  const myDonations: Mydonations[] = data.myDonations
  return (
    <Container>
      <MyDonationstitle>Riwayat Donasi</MyDonationstitle>
      {myDonations && myDonations.length ? (
        myDonations.map(myDonation => {
          const { date, month, years } = convertDate(
            myDonation.userDonations.createdAt as any
          )
          return (
            <Card to={`/campaign/${myDonation.endPoint}`}>
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
    </Container>
  )
}

export default MyDonations
