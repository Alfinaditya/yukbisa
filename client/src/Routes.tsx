import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Account from './routes/account'
import Navbar from './components/navbar/Navbar'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import MyDonations from './routes/donations/myDonations'
import DetailsCampaign from './routes/details/Campaign'
import Donation from './routes/donations/addDonation'
import MyCampaigns from './routes/galangDana/myCampaigns'
import ProtectedRoute from './routes/ProtectedRoute'
import EditCampaign from './routes/details/editCampaign'
import EditAccount from './routes/account/editAccount'
import AddCampaign from './routes/galangDana/addCampaign'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute
          path='/galang-dana/add-campaign/'
          component={AddCampaign}
        />
        <>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />

          <ProtectedRoute
            path='/account/edit-account'
            component={EditAccount}
          />
          <ProtectedRoute path='/account' component={Account} />

          <ProtectedRoute path='/galang-dana' component={MyCampaigns} />
          <ProtectedRoute path='/my-donations' component={MyDonations} />

          <ProtectedRoute
            path='/campaign/:slug/donation'
            component={Donation}
          />
          <ProtectedRoute
            path='/campaign/:slug/edit-campaign'
            component={EditCampaign}
          />
          <Route path='/campaign/:slug' component={DetailsCampaign} />
        </>
      </Switch>
    </Router>
  )
}

export default Routes
