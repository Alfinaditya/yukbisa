import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation ($input: UserInput!) {
    register(input: $input) {
      accessToken
      user {
        _id
      }
    }
  }
`
