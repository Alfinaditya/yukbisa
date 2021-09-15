import { SubmitHandler } from 'react-hook-form'
import Beneficiary from './Beneficiary'
import Details from './Details'
import ProtectedRoute from '../../ProtectedRoute'
import Photo from './Photo'
import Story from './Story'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import Finish from './Finish'
import Result from './Result'
import { AddCampaignProvider } from '../../../context/addCampaignContext'

export type Inputs = {
  beneficiaryName: string
  title: string
  endPoint: string
  purposeDescription: string
  image: any
  story: string
}

const AddCampaign = () => {
  let { path } = useRouteMatch()

  return (
    <AddCampaignProvider>
      <Switch>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}beneficiary`} />
        </Route>
        <ProtectedRoute path={`${path}beneficiary`} component={Beneficiary} />
        <ProtectedRoute path={`${path}details`} component={Details} />
        <ProtectedRoute path={`${path}photo`} component={Photo} />
        <ProtectedRoute path={`${path}story`} component={Story} />
        <ProtectedRoute path={`${path}finish`} component={Finish} />
        <ProtectedRoute path={`${path}result`} component={Result} />
      </Switch>
    </AddCampaignProvider>
  )
}

export default AddCampaign
