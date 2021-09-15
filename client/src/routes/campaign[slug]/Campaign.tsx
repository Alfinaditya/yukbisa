import { useMutation, useQuery } from '@apollo/client'
import jwtDecode from 'jwt-decode'
import { Link, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import { DELETE_CAMPAIGN } from '../../apollo/mutations/campaign'
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN_DETAILS,
  GET_MY_CAMPAIGNS,
} from '../../apollo/queries/campaign'
import { ReactComponent as UserSvg } from '../../assets/user.svg'
import { getAccessToken } from '../../auth/accessToken'
import { UserImage, Image } from '../../components/Image'
import { CampaignDetails } from '../../ts/campaign'
import { v4 as uuidv4 } from 'uuid'
import {
  Container,
  CampaignTitle,
  UserDonationName,
  FundraiserContainer,
  BeneficiaryContainer,
  StoryContainer,
  BeneficiaryTitle,
  Amount,
  CurrentAmount,
  Target,
  DonationButton,
  CampaignDonations,
  SumOfUserDonations,
  Header,
  Body,
  Footer,
  FundraiserTitle,
  FundraiserName,
  FundraiserProfile,
  BeneficiaryName,
  PurposeDescription,
  BeneficiaryDescription,
  BeneficiaryProfile,
  EditButton,
  DeleteButton,
  StoryTitle,
  CampaignImage,
  Details,
  UserDonationsTitle,
  FundraiserHeader,
  UserDonation,
  UserDonationAmount,
  UserDonationDate,
  UserDonationMessage,
  UserDonationDetails,
} from './style'
import {
  calcProgress,
  convertCurrency,
  convertDate,
} from '../../helpers/helper'
import { Progress } from '../../components/Progress'

const DetailsCampaign = () => {
  const history = useHistory()
  const { slug } = useParams<{ slug?: string }>()
  const { url } = useRouteMatch()
  let token: any = ''
  const { loading, data, error } = useQuery(GET_CAMPAIGN_DETAILS, {
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
  if (data) console.log(data)
  if (error) console.log(JSON.stringify(error, null, 2))
  if (deleteCampaignLoading) return <p>Delete DetaiCampaignDetails</p>

  const campaignDetails: CampaignDetails = data.campaignDetails[0]
  async function handleDelete() {
    await deleteCampaign({
      variables: { endPoint: slug, imageId: campaignDetails.imageId },
    })
    history.push('/')
  }
  // Footer,body,header === nanti diganti dengan nama component
  return (
    <Container>
      {campaignDetails && (
        <>
          <Header>
            <CampaignImage>
              <Image src={campaignDetails.image} />
            </CampaignImage>
            <Details>
              <CampaignTitle>{campaignDetails.title}</CampaignTitle>
              <Amount>
                <CurrentAmount>
                  {convertCurrency(campaignDetails.currentAmount)}{' '}
                </CurrentAmount>
                <Target>
                  Terkumpul dari {convertCurrency(campaignDetails.target)}
                </Target>
              </Amount>
              <Progress
                value={calcProgress(
                  campaignDetails.currentAmount,
                  campaignDetails.target
                )}
                max='100'
              ></Progress>
              <CampaignDonations>
                <SumOfUserDonations>
                  {campaignDetails.userDonations.length}{' '}
                </SumOfUserDonations>
                <span>Donasi</span>
              </CampaignDonations>

              {getAccessToken() && token.id === campaignDetails.fundraiserId ? (
                <div>
                  <EditButton
                    onClick={() =>
                      history.push(`${url}/edit-campaign?slug=${slug}`)
                    }
                  >
                    Edit
                  </EditButton>
                  <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                </div>
              ) : (
                <DonationButton
                  onClick={() => history.push(`${url}/donation?slug=${slug}`)}
                >
                  Donasi Sekarang !
                </DonationButton>
              )}
            </Details>
          </Header>

          <Body>
            <FundraiserHeader>Informasi Penggalangan Dana</FundraiserHeader>
            <FundraiserContainer>
              <FundraiserTitle>Penggalang Dana</FundraiserTitle>
              <FundraiserProfile>
                <UserImage
                  src={campaignDetails.fundraiserDetails.displayImage}
                />
                <FundraiserName>
                  {campaignDetails.fundraiserDetails.name}
                </FundraiserName>
              </FundraiserProfile>
            </FundraiserContainer>

            <BeneficiaryContainer>
              <BeneficiaryTitle>Penerima Dana</BeneficiaryTitle>
              <BeneficiaryProfile>
                <UserSvg />
                <BeneficiaryName>
                  {campaignDetails.beneficiaryName}
                </BeneficiaryName>
              </BeneficiaryProfile>
              <BeneficiaryDescription>
                <PurposeDescription>
                  {campaignDetails.purposeDescription}
                </PurposeDescription>
              </BeneficiaryDescription>
            </BeneficiaryContainer>

            <StoryContainer>
              <StoryTitle>Cerita</StoryTitle>
              <p>{campaignDetails.story}</p>
            </StoryContainer>
          </Body>

          <Footer>
            <UserDonationsTitle>
              Donasi ({campaignDetails.userDonations.length})
            </UserDonationsTitle>
            {campaignDetails.userDetails &&
              campaignDetails.userDetails.map(user => (
                <UserDonation key={uuidv4()}>
                  {user.amount && user.userId ? (
                    <>
                      <UserImage
                        src={user.user.displayImage}
                        alt={user.user.name}
                      />
                      <UserDonationDetails>
                        <UserDonationName>{user.user.name}</UserDonationName>
                        <UserDonationAmount>
                          Berdonasi sebesar{' '}
                          <b>{convertCurrency(user.amount)}</b>
                        </UserDonationAmount>
                        <UserDonationDate>
                          {convertDate(user.createdAt).date}{' '}
                          {convertDate(user.createdAt).month}{' '}
                          {convertDate(user.createdAt).years}
                        </UserDonationDate>
                        <UserDonationMessage>
                          {user.message}
                        </UserDonationMessage>
                      </UserDonationDetails>
                    </>
                  ) : (
                    <p style={{ textAlign: 'center' }}>
                      Belum ada yang menyumbang
                    </p>
                  )}
                </UserDonation>
              ))}
          </Footer>
        </>
      )}
    </Container>
  )
}

export default DetailsCampaign
