import React, { useContext } from 'react'
import { CampaignDetailsContext } from '../../../context/campaignDetailsContext'
import {
  UserDonations,
  UserDonationsTitle,
  UserDonation,
  UserDonationDetails,
  UserDonationDate,
  UserDonationAmount,
  UserDonationMessage,
  UserDonationName,
} from '../style'
import { v4 as uuidv4 } from 'uuid'
import { UserImage } from '../../../components/Image'
import { convertCurrency, convertDate } from '../../../helpers/helper'

const UserDonationsCard = () => {
  const ctx = useContext(CampaignDetailsContext)
  return (
    <UserDonations>
      <UserDonationsTitle>
        Donasi ({ctx?.campaignDetails.userDonations.length})
      </UserDonationsTitle>
      {ctx?.campaignDetails.userDetails &&
        ctx?.campaignDetails.userDetails.map(user => (
          <UserDonation key={uuidv4()}>
            {user.amount && user.userId ? (
              <>
                <UserImage
                  src={
                    user.isAnonymous ? '/profile.png' : user.user.displayImage
                  }
                  alt={user.isAnonymous ? 'Anonymous' : user.user.name}
                />
                <UserDonationDetails>
                  <UserDonationName>
                    {user.isAnonymous ? 'Anonymous' : user.user.name}
                  </UserDonationName>
                  <UserDonationAmount>
                    Berdonasi sebesar <b>{convertCurrency(user.amount)}</b>
                  </UserDonationAmount>
                  <UserDonationDate>
                    {convertDate(user.createdAt).date}{' '}
                    {convertDate(user.createdAt).month}{' '}
                    {convertDate(user.createdAt).years}
                  </UserDonationDate>
                  <UserDonationMessage>{user.message}</UserDonationMessage>
                </UserDonationDetails>
              </>
            ) : (
              <p style={{ textAlign: 'center' }}>Belum ada yang menyumbang</p>
            )}
          </UserDonation>
        ))}
    </UserDonations>
  )
}

export default UserDonationsCard
