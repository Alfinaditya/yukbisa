import { gql } from '@apollo/client'

export const ADD_CAMPAIGN = gql`
  mutation AddCampaign($input: CampaignInput!) {
    addCampaign(input: $input) {
      endPoint
    }
  }
`
