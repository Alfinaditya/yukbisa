import { useContext, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { FinishButton, FinishContainer } from './style'

const Finish = () => {
  const history = useHistory()
  const ctx = useContext(AddCampaignContext)
  useEffect(() => {
    resetState()
  }, [])
  function resetState() {
    ctx?.setCurrentReceiver('Saya Sendiri')
    ctx?.setShowMenu(false)
    ctx?.setReceiver('me')
    ctx?.setBeneficiaryName('')
    ctx?.setEndPoint('')
    ctx?.setTitle('')
    ctx?.setEndPoint('')
    ctx?.setPurposeDescription('')
    ctx?.setTarget('')
    ctx?.setStory('')
    ctx?.setPhoneNumber('')
  }
  return (
    <FinishContainer>
      {ctx?.beneficiaryName === '' &&
        ctx.title === '' &&
        ctx?.endPoint === '' &&
        ctx.target === '' &&
        ctx.phoneNumber === '' &&
        ctx.purposeDescription === '' &&
        ctx.image === '' && (
          <Redirect to='/galang-dana/add-campaign/beneficiary' />
        )}
      <p>
        Selamat halaman galang dana kamu siap digunakan. Yuk ajak teman temanmu
        untuk bantu menyebarkan
      </p>
      <FinishButton
        onClick={() => {
          history.push(`/campaign/${ctx?.isSuccessEndPoint}`)
        }}
      >
        Kembali ke halaman donasi
      </FinishButton>
    </FinishContainer>
  )
}

export default Finish
