import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Account from './routes/account'
import Navbar from './parts/navbar'
import Register from './routes/entry/register'
import Home from './routes/home'
import Login from './routes/entry/login'
import MyCampaigns from './routes/galangDana/myCampaigns'
import ProtectedRoute from './routes/ProtectedRoute'
import EditAccount from './routes/account/editAccount'
import AddCampaign from './routes/galangDana/addCampaign'
import EditCampaign from './routes/campaign[slug]/editCampaign'
import Donation from './routes/addDonation'
import MyDonations from './routes/donasiSaya'
import DetailsCampaign from './routes/campaign[slug]'
import Footer from './parts/footer'
import { Wrapper } from './style'
import ScrollToTop from './routes/ScrollToTop'

const Routes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <ProtectedRoute
          path='/galang-dana/add-campaign/'
          component={AddCampaign}
        />
        <ProtectedRoute
          path='/campaign/:slug/edit-campaign'
          component={EditCampaign}
        />
        <ProtectedRoute path='/campaign/:slug/donation' component={Donation} />
        <ProtectedRoute path='/account/edit-account' component={EditAccount} />
        <>
          <Wrapper>
            <Navbar />
            <Route exact path='/' component={Home} />
            <ProtectedRoute path='/account' component={Account} />
            <ProtectedRoute path='/galang-dana' component={MyCampaigns} />
            <ProtectedRoute path='/my-donations' component={MyDonations} />
            <Route path='/campaign/:slug' component={DetailsCampaign} />
            {/* <Route exact path='*' component={NoMatch} /> */}
          </Wrapper>
          <Footer />
        </>
      </Switch>
    </Router>
  )
}

export default Routes
