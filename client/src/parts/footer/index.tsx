import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'
import { FooterContainer, FooterSection } from './style'
const Footer = () => {
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
