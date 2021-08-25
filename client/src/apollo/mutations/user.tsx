import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: UserRegisterInput!) {
    register(input: $input) {
      accessToken
      user {
        _id
      }
    }
  }
`
export const LOGIN_USER = gql`
  mutation ($input: UserLoginInput!) {
    login(input: $input) {
      accessToken
      user {
        _id
      }
    }
  }
`
