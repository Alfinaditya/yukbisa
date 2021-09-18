import {
  UserSvg,
  DonationSvg,
  MyDonationsSvg,
  CampaignSvg,
  BottomNav,
  StyledBottomNavLink,
  ContainerBottomNav,
} from '../style'

const BottomNavbar = () => {
  return (
    <BottomNav>
      <ContainerBottomNav>
        <StyledBottomNavLink to='/'>
          <DonationSvg />
          <p>Donasi</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/galang-dana'>
          <CampaignSvg />
          <p>Galang Dana</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/my-donations'>
          <MyDonationsSvg />
          <p>Donasi Saya</p>
        </StyledBottomNavLink>
        <StyledBottomNavLink to='/account'>
          <UserSvg />
          <p>Akun</p>
        </StyledBottomNavLink>
      </ContainerBottomNav>
    </BottomNav>
  )
}

export default BottomNavbar
