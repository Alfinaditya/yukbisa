type Fundraiser = {
  name: string
  image: string
}

export interface Campaigns {
  _id: string
  image: string
  title: string
  currentAmount: number
  endPoint: string
  fundraiser: Fundraiser
}

type campaign = {
  image: string
  title: string
  currentAmount: number
  target: number
  beneficiaryName: string
  fundraiser: Fundraiser
  purposeDescription: string
  story: string
}

export interface Campaign {
  campaginByEndPoint: campaign
}
