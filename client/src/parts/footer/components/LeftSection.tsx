import { ReactComponent as WhiteBrand } from '../../../assets/whiteBrand.svg'
import { FooterDescription, Left } from '../style'
const LeftSection = () => {
  return (
    <Left>
      <WhiteBrand />
      <FooterDescription>
        YukBisa adalah aplikasi penggalangan dana bagi kaum milenial yang ingin
        cepat kaya tanpa bekerja.
      </FooterDescription>
      <p>Dibuat dengan ❤️ oleh YukBisa</p>
    </Left>
  )
}

export default LeftSection
