import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Redirect, useHistory } from 'react-router'
import { ADD_CAMPAIGN } from '../../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_MY_CAMPAIGNS,
} from '../../../apollo/queries/campaign'
import jwtDecode from 'jwt-decode'
import { Token } from '../../../ts/token'
import { getAccessToken } from '../../../auth/accessToken'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { encodedImage } from '../../../helpers/helper'
import Loading from '../../../components/Loading'

const Result = () => {
  const history = useHistory()
  const token: Token = jwtDecode(getAccessToken())
  const ctx = useContext(AddCampaignContext)
  const [addCampaign, { loading, error }] = useMutation(ADD_CAMPAIGN, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_CAMPAIGNS },
      {
        query: GET_MY_CAMPAIGNS,
        variables: { fundraiserId: token.id },
      },
    ],
  })
  useEffect(() => {
    handleSubmit()
  }, [])
  if (loading) {
    return <Loading message={'Tunggu sebentar'} />
  }
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }

  async function handleSubmit() {
    try {
      const encodedImageResult = await encodedImage(ctx?.image)
      const body = {
        beneficiaryName: ctx?.beneficiaryName,
        title: ctx?.title,
        endPoint: ctx?.endPoint,
        target: parseInt(ctx?.target as string),
        phoneNumber: ctx?.phoneNumber,
        purposeDescription: ctx?.purposeDescription,
        image: encodedImageResult,
        story: ctx?.story,
      }
      try {
        const res = await addCampaign({
          variables: { input: body },
        })
        ctx?.setIsSuccessEndPoint(res.data.addCampaign.endPoint)
        history.push('/galang-dana/add-campaign/finish')
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {ctx?.beneficiaryName === '' &&
        ctx.title === '' &&
        ctx?.endPoint === '' &&
        ctx.target === '' &&
        ctx.phoneNumber === '' &&
        ctx.purposeDescription === '' &&
        ctx.image === '' && (
          <Redirect to='/galang-dana/add-campaign/beneficiary' />
        )}
    </div>
  )
}

export default Result
