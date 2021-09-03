import { gql } from '@apollo/client'

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      _id
      image
      title
      endPoint
      currentAmount
      fundraiserDetails {
        name
      }
    }
  }
`

export const GET_CAMPAIGN_DETAILS = gql`
  query GetCampaignDetails($input: String!) {
    campaign(endPoint: $input) {
      _id
      image
      title
      beneficiaryName
      currentAmount
      target
      story
      purposeDescription
      userDetails {
        userId
        amount
        message
        user {
          name
          displayImage
        }
      }
      fundraiserDetails {
        name
        displayImage
      }
    }
  }
`

export const GET_MY_CAMPAIGNS = gql`
  query MyCampaigns($input: String!) {
    myCampaigns(input: $input) {
      _id
      title
      image
      currentAmount
    }
  }
`
