import { gql } from '@apollo/client'

export const GET_USER = gql`
  query {
    bye
  }
`

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      email
      displayImage
    }
  }
`
