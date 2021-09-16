import React, { useContext } from 'react'
import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import { StoryContainer, StoryTitle } from '../style'

const StoryCard = () => {
  const ctx = useContext(CampaignDetailsContext)
  return (
    <StoryContainer>
      <StoryTitle>Cerita</StoryTitle>
      <p>{ctx?.campaignDetails.story}</p>
    </StoryContainer>
  )
}

export default StoryCard
