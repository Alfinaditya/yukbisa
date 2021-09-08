type fundraiserDetails = {
  name: string
  displayImage: string
}

type User = {
  name: string
  displayImage: string
}

type FundraiserDetails = {
  name: string
}

type UserDetails = {
  userId: string
  amount: number
  message: string
  user: User
}

export interface Mycampaigns {
  _id: string
  title: string
  image: string
  endPoint: string
  currentAmount: number
}

export interface Donations {
  _id: string
  title: string
  image: string
  currentAmount: number
  createdAt: Date
}

export interface Campaigns {
  _id: string
  image: string
  title: string
  endPoint: string
  currentAmount: number
  target: number
  userDonations: [{ userId: string }]
  createdAt: Date
  fundraiserDetails: FundraiserDetails
}

export interface Campaign {
  title: string
  beneficiaryName: string
  phoneNumber: string
  purposeDescription: string
  story: string
  target: number
  image: string
  imageId: string
}

export interface CampaignDetails {
  _id: string
  imageId: string
  image: string
  title: string
  beneficiaryName: string
  currentAmount: number
  target: number
  story: string
  purposeDescription: string
  fundraiserId: string
  userDonations: [{ userId: string }]
  fundraiserDetails: fundraiserDetails
  createdAt: Date
  userDetails: [UserDetails]
}
