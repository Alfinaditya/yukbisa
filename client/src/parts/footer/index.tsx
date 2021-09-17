import { useLocation, useParams, useRouteMatch } from 'react-router'
import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'
import { FooterContainer, FooterSection } from './style'
const Footer = () => {
  const match = useRouteMatch('/campaign/:slug')
  if (match?.path) {
    return <></>
  }
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
