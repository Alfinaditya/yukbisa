import { gql } from '@apollo/client'

export const ADD_CAMPAIGN = gql`
  mutation AddCampaign($input: CampaignInput!) {
    addCampaign(input: $input) {
      image
      imageId
    }
  }
`
export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      _id
      image
      title
      endPoint
      currentAmount
      fundraisingUserName
    }
  }
`
