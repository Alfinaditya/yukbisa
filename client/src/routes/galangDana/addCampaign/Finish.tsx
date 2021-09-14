import { useContext } from 'react'
import { useHistory } from 'react-router'
import { AddCampaignContext } from '../../../context/addCampaignContext'

const Finish = () => {
  const history = useHistory()
  const context = useContext(AddCampaignContext)
  const body = {
    beneficiary: context?.beneficiaryName,
    title: context?.title,
    target: context?.target,
    endPoint: context?.endPoint,
    phoneNumber: context?.phoneNumber,
    image: context?.image,
    story: context?.story,
  }
  console.log(body)
  return (
    <div>
      Finish
      <pre>{JSON.stringify(body)}</pre>
    </div>
  )
}

export default Finish
