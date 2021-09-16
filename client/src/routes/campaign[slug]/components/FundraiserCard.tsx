import React, { useContext } from 'react'
import { UserImage } from '../../../components/Image'
import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import {
  Fundraiser,
  FundraiserContainer,
  FundraiserHeader,
  FundraiserProfile,
  FundraiserTitle,
  FundraiserName,
} from '../style'

const FundraiserCard = () => {
  const ctx = useContext(CampaignDetailsContext)
  return (
    <Fundraiser>
      <FundraiserHeader>Informasi Penggalangan Dana</FundraiserHeader>
      <FundraiserContainer>
        <FundraiserTitle>Penggalang Dana</FundraiserTitle>
        <FundraiserProfile>
          <UserImage
            src={ctx?.campaignDetails.fundraiserDetails.displayImage}
          />
          <FundraiserName>
            {ctx?.campaignDetails.fundraiserDetails.name}
          </FundraiserName>
        </FundraiserProfile>
      </FundraiserContainer>
    </Fundraiser>
  )
}

export default FundraiserCard
