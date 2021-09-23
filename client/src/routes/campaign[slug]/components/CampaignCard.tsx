import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useHistory, useRouteMatch } from 'react-router'

import { getAccessToken } from '../../../auth/accessToken'
import { Image } from '../../../components/Image'
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
  async function handleDelete() {
    await ctx?.deleteCampaign({
      variables: {
        endPoint: ctx?.slug,
        imageId: ctx?.campaignDetails.imageId,
      },
    })
    history.push('/')
  }
  return (
    <Campaign>
      <Helmet>
        <title>{ctx?.campaignDetails.title}</title>
        <meta name='description' content={ctx?.campaignDetails.story} />
        <link
          rel='canonical'
          href={`https://yukbisa.netlify.app/${ctx?.slug}`}
        />
      </Helmet>
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
