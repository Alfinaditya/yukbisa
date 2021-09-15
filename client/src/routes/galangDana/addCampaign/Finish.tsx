import { useContext, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'
import { FinishButton, FinishContainer } from './style'

const Finish = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  useEffect(() => {
    resetState()
  }, [])
  function resetState() {
    context?.setCurrentReceiver('Saya Sendiri')
    context?.setShowMenu(false)
    context?.setReceiver('me')
    context?.setBeneficiaryName('')
    context?.setEndPoint('')
    context?.setTitle('')
    context?.setEndPoint('')
    context?.setPurposeDescription('')
    context?.setTarget('')
    context?.setStory('')
    context?.setPhoneNumber('')
  }
  return (
    <FinishContainer>
      {context?.beneficiaryName === '' &&
        context.title === '' &&
        context?.endPoint === '' &&
        context.target === '' &&
        context.phoneNumber === '' &&
        context.purposeDescription === '' &&
        context.image === '' && (
          <Redirect to='/galang-dana/add-campaign/beneficiary' />
        )}
      <p>
        Selamat halaman galang dana kamu siap digunakan. Yuk ajak teman temanmu
        untuk bantu menyebarkan
      </p>
      <FinishButton
        onClick={() => {
          history.push(`/campaign/${context?.isSuccessEndPoint}`)
        }}
      >
        Kembali ke halaman donasi
      </FinishButton>
    </FinishContainer>
  )
}

export default Finish
