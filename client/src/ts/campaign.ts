export interface Campaigns {
  _id: string
  image: string
  title: string
  currentAmount: number
  endPoint: string
}

type campaign = {
  image: string
  title: string
  currentAmount: number
  target: number
  beneficiaryName: string
  purposeDescription: string
  story: string
}

export interface Campaign {
  campaginByEndPoint: campaign
}
