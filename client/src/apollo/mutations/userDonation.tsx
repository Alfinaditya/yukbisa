import { gql } from '@apollo/client'

export const ADD_DONATION = gql`
  mutation AddDonation($input: DonationInput!) {
    addDonation(input: $input) {
      amount
    }
  }
`
