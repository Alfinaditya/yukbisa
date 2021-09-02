import { gql } from '@apollo/client'

export const GET_MY_DONATIONS = gql`
  query Mydonations($input: String!) {
    myDonations(input: $input) {
      _id
      title
      image
      currentAmount
    }
  }
`
