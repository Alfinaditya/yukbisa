import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import { useState } from 'react'
import { useEffect } from 'react'
import { setAccessToken } from './auth/accessToken'
import Account from './routes/account'

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:3001/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
      .then(x => {
        console.log(x)
        return x.json()
      })
      .then(res => {
        const { accessToken } = res
        console.log(accessToken)
        setAccessToken(accessToken)
        setLoading(false)
      })
  }, [])
  if (loading) return <p>Loading....</p>
  return (
    <div className='App'>
      <Router>
        <Link to='/login'>Login</Link>
        <br />
        <Link to='/register'>Register</Link>
        <br />
        <Link to='/'>Yuk Bisa</Link>
        <br />
        <Link to='/account'>Account</Link>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={Account} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
