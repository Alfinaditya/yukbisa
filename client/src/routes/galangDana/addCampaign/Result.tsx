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
import { createEndpoint, encodedImage } from '../../../helpers/helper'

const Result = () => {
  const history = useHistory()
  const token: Token = jwtDecode(getAccessToken())
  const context = useContext(AddCampaignContext)
  const [addCampaign, { data, loading, error }] = useMutation(ADD_CAMPAIGN, {
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    handleSubmit()
  }, [])
  if (loading) {
    return <p>Loading......</p>
  }
  if (error) {
    console.log(JSON.stringify(error, null, 2))
  }

  async function handleSubmit() {
    try {
      const encodedImageResult = await encodedImage(context?.image)
      const body = {
        beneficiaryName: context?.beneficiaryName,
        title: context?.title,
        endPoint: context?.endPoint,
        target: parseInt(context?.target as string),
        phoneNumber: context?.phoneNumber,
        purposeDescription: context?.purposeDescription,
        image: encodedImageResult,
        story: context?.story,
      }
      try {
        const res = await addCampaign({
          variables: { input: body },
          refetchQueries: ({ data }) =>
            data.addCampaign.error.path === 'success'
              ? [
                  { query: GET_CAMPAIGNS },
                  {
                    query: GET_MY_CAMPAIGNS,
                    variables: { fundraiserId: token.id },
                  },
                ]
              : [],
        })
        if (res.data.addCampaign.error.path === 'success') {
          history.push('/galang-dana/add-campaign/finish')
          context?.setEndPoint(createEndpoint(data.endPoint))
        }
        if (res.data.addCampaign.error.path === 'endPoint') {
          history.push('/galang-dana/add-campaign/details')
          context?.setEndPointDuplicateErrorMessage(
            res.data.addCampaign.error.message
          )
        }
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const body = {
    beneficiaryName: context?.beneficiaryName,
    title: context?.title,
    endPoint: context?.endPoint,
    target: parseInt(context?.target as string),
    phoneNumber: context?.phoneNumber,
    purposeDescription: context?.purposeDescription,
    image: context?.image,
    story: context?.story,
  }
  console.log(body)
  return (
    <div>
      <p>You are dead wrong</p>
    </div>
  )
}

export default Result
