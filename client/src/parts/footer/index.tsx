import { useLocation, useParams } from 'react-router'
import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'
import { FooterContainer, FooterSection } from './style'
const Footer = () => {
  const location = useLocation()
  // if (
  //   location.pathname != '/galang-dana' &&
  //   location.pathname != '/my-donations' &&
  //   location.pathname != '/' &&
  //   location.pathname != '/account'
  // ) {
  //   return <></>
  // }
  return (
    <FooterSection>
      <FooterContainer>
        <LeftSection />
        <RightSection />
      </FooterContainer>
    </FooterSection>
  )
}

export default Footer
