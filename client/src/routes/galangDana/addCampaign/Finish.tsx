import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'

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
    <div>
      <p>
        Selamat halaman galang dana kamu siap digunakan. Yuk ajak teman temanmu
        untuk bantu menyebarkan
      </p>
      <button
        onClick={() => {
          history.push(`/campaign/${context?.isSuccessEndPoint}`)
        }}
      >
        Kembali ke halaman donasi
      </button>
    </div>
  )
}

export default Finish
