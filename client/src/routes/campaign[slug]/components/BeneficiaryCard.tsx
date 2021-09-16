import React, { useContext } from 'react'
import { ReactComponent as UserSvg } from '../../../assets/user.svg'
import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import {
  BeneficiaryContainer,
  BeneficiaryTitle,
  BeneficiaryProfile,
  BeneficiaryName,
  BeneficiaryDescription,
  PurposeDescription,
} from '../style'

const BeneficiaryCard = () => {
  const ctx = useContext(CampaignDetailsContext)
  return (
    <>
      <BeneficiaryContainer>
        <BeneficiaryTitle>Penerima Dana</BeneficiaryTitle>
        <BeneficiaryProfile>
          <UserSvg />
          <BeneficiaryName>
            {ctx?.campaignDetails.beneficiaryName}
          </BeneficiaryName>
        </BeneficiaryProfile>
        <BeneficiaryDescription>
          <PurposeDescription>
            {ctx?.campaignDetails.purposeDescription}
          </PurposeDescription>
        </BeneficiaryDescription>
      </BeneficiaryContainer>
    </>
  )
}

export default BeneficiaryCard
