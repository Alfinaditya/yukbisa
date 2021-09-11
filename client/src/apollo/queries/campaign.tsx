import { gql } from '@apollo/client'

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      _id
      image
      title
      endPoint
      currentAmount
      target
      userDonations {
        userId
      }
      createdAt
      fundraiserDetails {
        name
      }
    }
  }
`

export const GET_CAMPAIGN_DETAILS = gql`
  query GetCampaignDetails($input: String!) {
    campaignDetails(endPoint: $input) {
      _id
      imageId
      image
      title
      beneficiaryName
      currentAmount
      target
      story
      purposeDescription
      fundraiserId
      userDonations {
        userId
      }
      userDetails {
        userId
        amount
        message
        createdAt
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
  query MyCampaigns($fundraiserId: String!) {
    myCampaigns(fundraiserId: $fundraiserId) {
      _id
      title
      image
      endPoint
      currentAmount
      target
    }
  }
`

export const GET_CAMPAIGN = gql`
  query GetCampaign($endPoint: String!) {
    campaign(endPoint: $endPoint) {
      beneficiaryName
      title
      phoneNumber
      purposeDescription
      story
      target
      imageId
      image
    }
  }
`
