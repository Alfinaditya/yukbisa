import { useQuery } from '@apollo/client'
import { GET_USER } from '../../apollo/queries/user'

const Home = () => {
  const { loading, error, data } = useQuery(GET_USER, {
    fetchPolicy: 'network-only',
  })
  if (loading) return <p>Loading....</p>
  if (error) return <p>You are not auth</p>
  if (data) console.log(data)
  return (
    <div>
      <h1>Yuk Bisa</h1>
      {data && (
        <div>
          <h1>You are auth</h1>
          <p>{data.bye}</p>
        </div>
      )}
    </div>
  )
}

export default Home
