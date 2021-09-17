import { useState } from 'react'
import { useEffect } from 'react'
import { setAccessToken } from './auth/accessToken'
import Loading from './components/Loading'
import Routes from './Routes'
function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:3001/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
      .then(x => {
        return x.json()
      })
      .then(res => {
        const { accessToken } = res
        setAccessToken(accessToken)
        setLoading(false)
      })
  }, [])
  if (loading) return <Loading />
  return (
    <div>
      <Routes />
    </div>
  )
}

export default App
