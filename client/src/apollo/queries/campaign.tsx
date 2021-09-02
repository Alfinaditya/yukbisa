import { gql } from '@apollo/client'

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      _id
      image
      title
      endPoint
      currentAmount
    }
  }
`

export const GET_CAMPAIGN_BY_ENDPOINT = gql`
  query GetCampaignByEndPoint($input: String!) {
    campaginByEndPoint(endPoint: $input) {
      image
      title
      currentAmount
      target
      beneficiaryName
      purposeDescription
      story
    }
  }
`
