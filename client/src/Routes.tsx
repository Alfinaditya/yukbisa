import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Account from './routes/account'
import Navbar from './components/Navbar'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import AddCampaign from './routes/addCampaign'
import MyDonations from './routes/myDonations'
import DetailsCampaign from './routes/details/Campaign'
import Donation from './routes/donation'

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/my-donations' component={MyDonations} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/account' component={Account} />
        <Route path='/add-campaign' component={AddCampaign} />
        <Route path='/my-donations' component={MyDonations} />
        <Route path='/campaign/:slug/donation' component={Donation} />
        <Route path='/campaign/:slug' component={DetailsCampaign} />
      </Switch>
    </Router>
  )
}

export default Routes
