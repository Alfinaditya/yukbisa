import { useContext } from 'react'

import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import {
  BeneficiaryContainer,
  BeneficiaryTitle,
  BeneficiaryProfile,
  BeneficiaryName,
  BeneficiaryDescription,
  PurposeDescription,
  UserReceivedSvg,
} from '../style'

const BeneficiaryCard = () => {
  const ctx = useContext(CampaignDetailsContext)
  return (
    <>
      <BeneficiaryContainer>
        <BeneficiaryTitle>Penerima Dana</BeneficiaryTitle>
        <BeneficiaryProfile>
          <UserReceivedSvg />
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
