import {
  UserSvg,
  DonationSvg,
  MyDonationsSvg,
  CampaignSvg,
  BottomNav,
  StyledBottomNavLink,
  ContainerBottomNav,
} from '../style'

const ACTIVE_STYLE = {
  color: '#00AEEF',
  fontWeight: 700,
}
const BottomNavbar = () => {
  return (
    <BottomNav>
      <ContainerBottomNav>
        <StyledBottomNavLink exact to='/' activeStyle={ACTIVE_STYLE}>
          <DonationSvg />
          <p>Donasi</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/galang-dana' activeStyle={ACTIVE_STYLE}>
          <CampaignSvg />
          <p>Galang Dana</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/my-donations' activeStyle={ACTIVE_STYLE}>
          <MyDonationsSvg />
          <p>Donasi Saya</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/account' activeStyle={ACTIVE_STYLE}>
          <UserSvg />
          <p>Akun</p>
        </StyledBottomNavLink>
      </ContainerBottomNav>
    </BottomNav>
  )
}

export default BottomNavbar
