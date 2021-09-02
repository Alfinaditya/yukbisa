type fundraiserDetails = {
  name: string
  displayImage: string
}

type User = {
  name: string
  displayImage: string
}

export interface Campaigns {
  _id: string
  image: string
  title: string
  currentAmount: number
  endPoint: string
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

export interface UserDetails {
  userId: string
  amount: number
  message: string
  user: User
}
