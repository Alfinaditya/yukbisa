import { ApolloError, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { useState, createContext } from 'react'
import { useParams } from 'react-router'
import { GET_CAMPAIGN_DETAILS } from '../apollo/queries/campaign'
import { getAccessToken } from '../auth/accessToken'
import { CampaignDetails } from '../ts/campaign'
import { Token } from '../ts/token'
interface ContextProps {
  campaignDetails: CampaignDetails
  token: Token
  slug: string | undefined
}
export const CampaignDetailsContext = createContext<ContextProps | null>(null)

export const CampaignDetailsProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const { slug } = useParams<{ slug?: string }>()
  let token: any = ''
  if (getAccessToken()) {
    token = jwtDecode(getAccessToken())
  }
  const { loading, data, error } = useQuery(GET_CAMPAIGN_DETAILS, {
    variables: {
      input: slug,
    },
  })
  if (loading) return <p>Loading...</p>
  if (error) console.log(JSON.stringify(error, null, 2))
  const campaignDetails: CampaignDetails = data.campaignDetails[0]

  return (
    <CampaignDetailsContext.Provider value={{ token, campaignDetails, slug }}>
      {children}
    </CampaignDetailsContext.Provider>
  )
}
