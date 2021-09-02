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

export interface Campaigns {
  _id: string
  image: string
  title: string
  endPoint: string
  currentAmount: number
  fundraiserDetails: FundraiserDetails
}

export interface Campaign {
  _id: string
  image: string
  title: string
  beneficiaryName: string
  currentAmount: number
  target: number
  story: string
  purposeDescription: String
  fundraiserDetails: fundraiserDetails
  userDetails: [UserDetails]
}
