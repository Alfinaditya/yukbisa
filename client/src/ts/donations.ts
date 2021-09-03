type Donations = {
  amount: number
}

export interface Mydonations {
  image: string
  title: string
  createdAt: Date
  userDonations: Donations
}
