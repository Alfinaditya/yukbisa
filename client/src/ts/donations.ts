type Donations = {
  amount: number
  createdAt: number
}

export interface Mydonations {
  image: string
  title: string
  userDonations: Donations
  endPoint: string
}
