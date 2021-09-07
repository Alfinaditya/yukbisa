import { gql } from '@apollo/client'

export const ADD_CAMPAIGN = gql`
  mutation AddCampaign($input: CampaignInput!) {
    addCampaign(input: $input) {
      endPoint
    }
  }
`
export const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($imageId: String!, $endPoint: String!) {
    deleteCampaign(imageId: $imageId, endPoint: $endPoint)
  }
`
