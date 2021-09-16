import {
  ApolloCache,
  ApolloError,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
  useQuery,
} from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { useState, createContext } from 'react'
import { useParams } from 'react-router'
import { DELETE_CAMPAIGN } from '../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_DETAILS,
  GET_MY_CAMPAIGNS,
} from '../apollo/queries/campaign'
import { getAccessToken } from '../auth/accessToken'
import Loading from '../components/Loading'
import { CampaignDetails } from '../ts/campaign'
import { Token } from '../ts/token'
interface ContextProps {
  campaignDetails: CampaignDetails
  token: Token
  slug: string | undefined
  deleteCampaign: (
    options?:
      | MutationFunctionOptions<
          any,
          OperationVariables,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ) => Promise<any>
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
  const { loading, data } = useQuery(GET_CAMPAIGN_DETAILS, {
    variables: {
      input: slug,
    },
  })
  const [deleteCampaign, { loading: deleteMutationLoading }] = useMutation(
    DELETE_CAMPAIGN,
    {
      fetchPolicy: 'network-only',
      refetchQueries: [
        { query: GET_CAMPAIGNS },
        {
          query: GET_MY_CAMPAIGNS,
          variables: { fundraiserId: token.id },
        },
      ],
    }
  )
  if (loading) return <Loading />
  if (deleteMutationLoading)
    return <Loading message={'Tunggu sebentar,sedang menghapus'} />
  const campaignDetails: CampaignDetails = data.campaignDetails[0]

  return (
    <CampaignDetailsContext.Provider
      value={{ token, campaignDetails, slug, deleteCampaign }}
    >
      {children}
    </CampaignDetailsContext.Provider>
  )
}
