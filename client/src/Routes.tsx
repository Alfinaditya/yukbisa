import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Account from './routes/account'
import Navbar from './components/navbar/Navbar'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import AddCampaign from './routes/galangDana/addCampaign'
import MyDonations from './routes/donations/myDonations'
import DetailsCampaign from './routes/details/Campaign'
import Donation from './routes/donations/addDonation'
import MyCampaigns from './routes/galangDana/myCampaigns'
import ProtectedRoute from './routes/ProtectedRoute'
import EditCampaign from './routes/details/editCampaign'
import EditAccount from './routes/account/editAccount'
import Beneficiary from './routes/galangDana/addCampaign/Beneficiary'
import Details from './routes/galangDana/addCampaign/Details'
import Photo from './routes/galangDana/addCampaign/Photo'
import Story from './routes/galangDana/addCampaign/Story'

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />

        <ProtectedRoute path='/account/edit-account' component={EditAccount} />
        <ProtectedRoute path='/account' component={Account} />

        <ProtectedRoute
          path='/galang-dana/add-campaign/beneficiary'
          component={Beneficiary}
        />
        <ProtectedRoute
          path='/galang-dana/add-campaign/details'
          component={Details}
        />
        <ProtectedRoute
          path='/galang-dana/add-campaign/photo'
          component={Photo}
        />
        <ProtectedRoute
          path='/galang-dana/add-campaign/story'
          component={Story}
        />
        <ProtectedRoute
          path='/galang-dana/add-campaign'
          component={AddCampaign}
        />

        <ProtectedRoute path='/galang-dana' component={MyCampaigns} />
        <ProtectedRoute path='/my-donations' component={MyDonations} />

        <ProtectedRoute path='/campaign/:slug/donation' component={Donation} />
        <ProtectedRoute
          path='/campaign/:slug/edit-campaign'
          component={EditCampaign}
        />
        <Route path='/campaign/:slug' component={DetailsCampaign} />
      </Switch>
    </Router>
  )
}

export default Routes
