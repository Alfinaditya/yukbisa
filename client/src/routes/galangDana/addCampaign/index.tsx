import { SubmitHandler } from 'react-hook-form'
// import { AddCampaignContext } from '../../../context/addCampaignContext'
import Beneficiary from './Beneficiary'
import Details from './Details'
import ProtectedRoute from '../../ProtectedRoute'
import Photo from './Photo'
import Story from './Story'
import { Redirect, Switch, useRouteMatch, Route } from 'react-router'
import Finish from './Finish'
import Result from './Result'

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
  // const [target, setTarget] = useState<string | undefined>('0')
  // const [page, setPage] = useState(1)
  // const [endPoint, setEndPoint] = useState('')
  // const [endPointDuplicateErrorMessage, setEndPointDuplicateErrorMessage] =
  //   useState('')
  // const [receiver, setReceiver] = useState('me')
  // const [addCampaign, { data, loading, error }] = useMutation(ADD_CAMPAIGN, {
  //   fetchPolicy: 'network-only',
  // })

  // if (error) {
  //   console.log(JSON.stringify(error, null, 2))
  // }
  const onSubmit: SubmitHandler<Inputs> = async data => {
    // todo if submit loading return progress page if success finish if error error pages
    // try {
    //   const encodedImageResult = await encodedImage(data.image[0])
    //   const body = {
    //     beneficiaryName: data.beneficiaryName,
    //     title: data.title,
    //     endPoint: createEndpoint(data.endPoint),
    //     target: parseInt(target!),
    //     phoneNumber: phoneNumber,
    //     purposeDescription: data.purposeDescription,
    //     image: encodedImageResult,
    //     story: data.story,
    //   }
    //   try {
    //     const res = await addCampaign({
    //       variables: { input: body },
    //       refetchQueries: ({ data }) =>
    //         data.addCampaign.error.path === 'success'
    //           ? [
    //               { query: GET_CAMPAIGNS },
    //               {
    //                 query: GET_MY_CAMPAIGNS,
    //                 variables: { fundraiserId: token.id },
    //               },
    //             ]
    //           : [],
    //     })
    //     if (res.data.addCampaign.error.path === 'success') {
    //       setEndPoint(createEndpoint(data.endPoint))
    //       setPage(page + 1)
    //     }
    //     if (res.data.addCampaign.error.path === 'endPoint') {
    //       setPage(2)
    //       setEndPointDuplicateErrorMessage(res.data.addCampaign.error.message)
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <>
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
    </>
  )
}

export default AddCampaign
