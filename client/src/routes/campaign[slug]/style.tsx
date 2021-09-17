import styled from 'styled-components'
import { Title } from '../../components/Title'
import { Button } from '../../components/Button'

export const Container = styled.div`
  width: 93%;
  margin: auto;
`
const DetailsContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin-top: 20px;
`

// Campaign
export const Campaign = styled.div`
  display: flex;
  align-items: center;
  padding: 60px;
  margin-top: 30px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  @media only screen and (max-width: 1232px) {
    flex-direction: column;
    padding: 50px;
  }
  @media only screen and (max-width: 537px) {
    padding: 0px;
  }
`
export const CampaignImage = styled.div`
  height: 373px;
  width: 60%;
  @media only screen and (max-width: 1232px) {
    width: 100%;
  }
`
export const Details = styled.div`
  margin-left: 40px;
  @media only screen and (max-width: 1232px) {
    width: 100%;
    margin-top: 30px;
    margin-left: 0;
  }
  /* @media only screen and (max-width: 537px) {
    padding: 0 10px;
  } */
`
export const CampaignTitle = styled(Title)`
  font-weight: 700;
`
export const Amount = styled.div`
  margin: 20px 0;
`
export const CurrentAmount = styled.span`
  font-size: 18px;
  color: var(--main);
`
export const Target = styled.span`
  font-size: 13px;
`
export const CampaignDonations = styled.div`
  margin: 30px 0;
  font-size: 11px;
`
export const SumOfUserDonations = styled.span`
  font-weight: 500;
  font-size: 18px;
`
export const DonationButton = styled(Button)`
  width: 100%;
`
export const EditButton = styled(Button)`
  margin-bottom: 10px;
  width: 100%;
`
export const DeleteButton = styled(Button)`
  width: 100%;
`

// Body
export const Fundraiser = styled.div`
  margin-top: 70px;
`
export const FundraiserContainer = styled(DetailsContainer)`
  padding: 15px;
`
export const FundraiserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`
export const FundraiserTitle = styled.h1`
  padding-left: 7px;
  padding-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 15px;
`
export const FundraiserName = styled.p`
  font-weight: 100;
  font-size: 14px;
  margin-left: 10px;
`
export const BeneficiaryContainer = styled(DetailsContainer)`
  padding: 15px;
`
export const BeneficiaryTitle = styled.h1`
  font-weight: 700;
  font-size: 15px;
`
export const BeneficiaryProfile = styled.h1`
  display: flex;
  align-items: center;
  margin: 20px 0;
`
export const BeneficiaryName = styled.p`
  font-weight: 100;
  font-size: 14px;
  margin-left: 10px;
`
export const BeneficiaryDescription = styled.p`
  background: #f8f8f8;
`
export const PurposeDescription = styled.p`
  font-weight: 100;
  font-size: 12px;
  padding: 10px;
`
export const FundraiserHeader = styled(Title)`
  font-weight: 400;
`
export const StoryContainer = styled(DetailsContainer)`
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
`
export const StoryTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 500;
`

// Footer
export const UserDonations = styled.div`
  margin-top: 50px;
  margin-bottom: 70px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px 15px;
`
export const UserDonationsTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`
export const UserDonation = styled.div`
  margin: 20px 0;
  padding: 15px;
  background: #fafafa;
  display: flex;
  align-items: center;
`
export const UserDonationName = styled.p`
  font-weight: 700;
  font-size: 17px;
  color: var(--main);
  margin-top: 12px;
`
export const UserDonationAmount = styled.div`
  margin: 4px 0;
`
export const UserDonationDate = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #a3a2a2;
  margin-bottom: 15px;
`
export const UserDonationMessage = styled.p`
  font-size: 14px;
  font-weight: 100;
`
export const UserDonationDetails = styled.div`
  margin-left: 30px;
`
