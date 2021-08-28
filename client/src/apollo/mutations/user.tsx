import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: UserRegisterInput!) {
    register(input: $input) {
      accessToken
      user {
        email
        displayImage
        name
        dateOfBirth
        bio
      }
    }
  }
`
export const LOGIN_USER = gql`
  mutation LoginUser($input: UserLoginInput!) {
    login(input: $input) {
      accessToken
      user {
        email
        displayImage
        name
        dateOfBirth
        bio
      }
    }
  }
`

export const ADD_CAMPAIGN = gql`
  mutation AddCampaign($input: CampaignInput!) {
    addCampaign(input: $input) {
      image
      imageId
    }
  }
`
