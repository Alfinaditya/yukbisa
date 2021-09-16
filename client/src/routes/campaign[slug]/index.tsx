import { Container } from '../../components/Container'
import { CampaignDetailsProvider } from '../../context/campaignDetailsContext'
import BeneficiaryCard from './components/BeneficiaryCard'
import CampaignCard from './components/CampaignCard'
import FundraiserCard from './components/FundraiserCard'
import StoryCard from './components/StoryCard'
import UserDonationsCard from './components/UserDonationsCard'

const DetailsCampaign = () => {
  return (
    <CampaignDetailsProvider>
      <Container>
        <CampaignCard />
        <FundraiserCard />
        <BeneficiaryCard />
        <StoryCard />
        <UserDonationsCard />
      </Container>
    </CampaignDetailsProvider>
  )
}

export default DetailsCampaign
