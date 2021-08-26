import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: UserRegisterInput!) {
    register(input: $input) {
      accessToken
    }
  }
`
export const LOGIN_USER = gql`
  mutation LoginUser($input: UserLoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`
