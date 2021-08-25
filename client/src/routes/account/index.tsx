import { useQuery } from '@apollo/client'
import { GET_ME } from '../../apollo/queries/user'

const Account = () => {
  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
  })
  let me: any = null
  if (loading) {
    me = <p>Loading....</p>
  } else if (data && data.me) {
    me = <p>{data.me.email}</p>
  } else {
    me = <p>You are not auth</p>
  }
  return <div>{me}</div>
}

export default Account
