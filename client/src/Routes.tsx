import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Account from './routes/account'
import Navbar from './components/Navbar'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import Campaign from './routes/campaign'
import MyDonations from './routes/myDonations'

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/account' component={Account} />
        <Route path='/campaign' component={Campaign} />
        <Route path='/my-donations' component={MyDonations} />
      </Switch>
    </Router>
  )
}

export default Routes
