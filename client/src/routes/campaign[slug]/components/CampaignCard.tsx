import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import { DELETE_CAMPAIGN } from '../../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_MY_CAMPAIGNS,
} from '../../../apollo/queries/campaign'
import { getAccessToken } from '../../../auth/accessToken'
import { Image } from '../../../components/Image'
import Loading from '../../../components/Loading'
import { Progress } from '../../../components/Progress'
import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import { convertCurrency, calcProgress } from '../../../helpers/helper'
import {
  Amount,
  CampaignDonations,
  CampaignImage,
  CampaignTitle,
  EditButton,
  Campaign,
  DonationButton,
  DeleteButton,
  Details,
  SumOfUserDonations,
  CurrentAmount,
  Target,
} from '../style'

const CampaignCard = () => {
  const { url } = useRouteMatch()
  const ctx = useContext(CampaignDetailsContext)
  const history = useHistory()
  const [deleteCampaign, { loading }] = useMutation(DELETE_CAMPAIGN, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_CAMPAIGNS },
      {
        query: GET_MY_CAMPAIGNS,
        variables: { fundraiserId: ctx?.token.id },
      },
    ],
  })
  async function handleDelete() {
    await deleteCampaign({
      variables: {
        endPoint: ctx?.slug,
        imageId: ctx?.campaignDetails.imageId,
      },
    })
    history.push('/')
  }
  if (loading) return <Loading />
  return (
    <Campaign>
      <CampaignImage>
        <Image src={ctx?.campaignDetails.image} />
      </CampaignImage>
      <Details>
        <CampaignTitle>{ctx?.campaignDetails.title}</CampaignTitle>
        <Amount>
          <CurrentAmount>
            {convertCurrency(ctx?.campaignDetails.currentAmount as number)}{' '}
          </CurrentAmount>
          <Target>
            Terkumpul dari{' '}
            {convertCurrency(ctx?.campaignDetails.target as number)}
          </Target>
        </Amount>
        <Progress
          value={calcProgress(
            ctx?.campaignDetails.currentAmount as number,
            ctx?.campaignDetails.target as number
          )}
          max='100'
        ></Progress>
        <CampaignDonations>
          <SumOfUserDonations>
            {ctx?.campaignDetails.userDonations.length}{' '}
          </SumOfUserDonations>
          <span>Donasi</span>
        </CampaignDonations>

        {getAccessToken() &&
        ctx?.token.id === ctx?.campaignDetails.fundraiserId ? (
          <div>
            <EditButton
              onClick={() =>
                history.push(`${url}/edit-campaign?slug=${ctx?.slug}`)
              }
            >
              Edit
            </EditButton>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </div>
        ) : (
          <DonationButton
            onClick={() => history.push(`${url}/donation?slug=${ctx?.slug}`)}
          >
            Donasi Sekarang !
          </DonationButton>
        )}
      </Details>
    </Campaign>
  )
}

export default CampaignCard
