import { gql } from '@apollo/client'

export const GET_MY_DONATIONS = gql`
  query MyDonations($input: String!) {
    myDonations(_id: $input) {
      image
      title
      createdAt
      userDonations {
        amount
      }
    }
  }
`
