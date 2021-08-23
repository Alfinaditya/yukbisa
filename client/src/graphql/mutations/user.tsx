import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation ($input: UserInput!) {
    createUser(input: $input) {
      _id
      name
      email
      dateOfBirth
      bio
    }
  }
`
