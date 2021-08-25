import { useQuery } from '@apollo/client'
import { GET_ME } from '../../apollo/queries/user'

const Account = () => {
  const { loading, data } = useQuery(GET_ME, {
    fetchPolicy: 'network-only',
  })
  console.log(data)
  return (
    <div>
      {loading && <p>Loading...</p>}
      {data && data.me && (
        <div>
          <h1>{data.me.email}</h1>
          <img src={data.me.displayImage} alt={data.me.email} />
        </div>
      )}
    </div>
  )
}

export default Account
