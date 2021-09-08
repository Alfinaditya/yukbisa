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
        displayImageId
        displayImage
        name
        dateOfBirth
        bio
      }
    }
  }
`
export const EDIT_ME = gql`
  mutation EditMe($input: EditMeInput!) {
    editMe(input: $input) {
      name
      email
      displayImage
      displayImageId
      dateOfBirth
      bio
    }
  }
`
