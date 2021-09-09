import { useMutation, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import { DELETE_CAMPAIGN } from '../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_DETAILS,
  GET_MY_CAMPAIGNS,
} from '../../apollo/queries/campaign'

import { getAccessToken } from '../../auth/accessToken'
import { Container } from '../../components/Container'
import { UserImage, Image } from '../../components/Image'
import { CampaignDetails } from '../../ts/campaign'
import { v4 as uuidv4 } from 'uuid'
import {
  Title,
  Progress,
  UserDonationName,
  FundraiserContainer,
  BeneficiaryContainer,
  StoryContainer,
  BeneficiaryTitle,
} from './style'
import { calcProgress, convertCurrency } from '../../helpers/helper'

const DetailsCampaign = () => {
  const history = useHistory()
  const { slug } = useParams<{ slug?: string }>()
  const { url } = useRouteMatch()
  let token: any = ''
  const { loading, data } = useQuery(GET_CAMPAIGN_DETAILS, {
    variables: {
      input: slug,
    },
  })
  if (getAccessToken()) {
    token = jwtDecode(getAccessToken())
  }
  const [deleteCampaign, { loading: deleteCampaignLoading }] = useMutation(
    DELETE_CAMPAIGN,
    {
      fetchPolicy: 'network-only',
      refetchQueries: [
        { query: GET_CAMPAIGNS },
        { query: GET_MY_CAMPAIGNS, variables: { fundraiserId: token.id } },
      ],
    }
  )
  if (loading) return <p>Loading...</p>

  if (deleteCampaignLoading) return <p>Delete DetaiCampaignDetails</p>

  const campaignDetails: CampaignDetails = data.campaignDetails[0]
  async function handleDelete() {
    await deleteCampaign({
      variables: { endPoint: slug, imageId: campaignDetails.imageId },
    })
    history.push('/')
  }
  return (
    <Container>
      {campaignDetails && (
        <>
          <Image src={campaignDetails.image} />
          <Title>{campaignDetails.title}</Title>
          <p>
            {convertCurrency(campaignDetails.currentAmount)} Terkumpul dari{' '}
            {convertCurrency(campaignDetails.target)}
          </p>

          <Progress
            value={calcProgress(
              campaignDetails.currentAmount,
              campaignDetails.target
            )}
            max='100'
          ></Progress>
          <p>{campaignDetails.userDonations.length} Donasi</p>

          {getAccessToken() && token.id === campaignDetails.fundraiserId ? (
            <div>
              <Link to={`${url}/edit-campaign?slug=${slug}`}>
                <button>Edit</button>
              </Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          ) : (
            <Link to={`${url}/donation?slug=${slug}`}>
              <button>Donasi Sekarang</button>
            </Link>
          )}

          <h1>Informasi Penggalangan Dana</h1>

          <FundraiserContainer>
            <p>Penggalang Dana</p>
            <UserImage src={campaignDetails.fundraiserDetails.displayImage} />
            <p>{campaignDetails.fundraiserDetails.name}</p>
          </FundraiserContainer>

          <BeneficiaryContainer>
            <BeneficiaryTitle>Penerima Dana</BeneficiaryTitle>
            <p>{campaignDetails.beneficiaryName}</p>
            <p>{campaignDetails.purposeDescription}</p>
          </BeneficiaryContainer>

          <StoryContainer>
            <h1>Cerita</h1>
            <p>{campaignDetails.story}</p>
          </StoryContainer>
          <p>Donasi ({campaignDetails.userDonations.length})</p>
          {campaignDetails.userDetails &&
            campaignDetails.userDetails.map(user => (
              <div key={uuidv4()}>
                {user.amount && user.userId ? (
                  <>
                    <UserImage
                      src={user.user.displayImage}
                      alt={user.user.name}
                    />
                    <UserDonationName>{user.user.name}</UserDonationName>
                    <p>
                      Berdonasi sebesar <b>{convertCurrency(user.amount)}</b>
                    </p>
                    <p>{user.message}</p>
                  </>
                ) : (
                  <p>Belum ada yang menyumbang</p>
                )}
              </div>
            ))}
        </>
      )}
    </Container>
  )
}

export default DetailsCampaign
