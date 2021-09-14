import { useState, createContext } from 'react'

interface ContextProps {
  title: string
  beneficiaryName: string
  purposeDescription: string
  target: string
  endPoint: string
  phoneNumber: string
  image: any
  story: string
  isSuccessEndPoint: string
  endPointDuplicateErrorMessage: string
  showMenu: boolean
  receiver: string
  currentReceiver: string
  setCurrentReceiver: React.Dispatch<React.SetStateAction<string>>
  setReceiver: React.Dispatch<React.SetStateAction<string>>
  setBeneficiaryName: React.Dispatch<React.SetStateAction<string>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  setEndPoint: React.Dispatch<React.SetStateAction<string>>
  setTarget: React.Dispatch<React.SetStateAction<string>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setPurposeDescription: React.Dispatch<React.SetStateAction<string>>
  setImage: React.Dispatch<any>
  setStory: React.Dispatch<React.SetStateAction<string>>
  setIsSuccessEndPoint: React.Dispatch<React.SetStateAction<string>>
  setEndPointDuplicateErrorMessage: React.Dispatch<React.SetStateAction<string>>
}
export const AddCampaignContext = createContext<ContextProps | null>(null)

export const AddCampaignProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [endPoint, setEndPoint] = useState('')
  const [receiver, setReceiver] = useState('me')
  const [currentReceiver, setCurrentReceiver] = useState('Saya Sendiri')
  const [purposeDescription, setPurposeDescription] = useState('')
  const [target, setTarget] = useState('')
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<any>('')
  const [story, setStory] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [beneficiaryName, setBeneficiaryName] = useState('')
  const [isSuccessEndPoint, setIsSuccessEndPoint] = useState('')
  const [endPointDuplicateErrorMessage, setEndPointDuplicateErrorMessage] =
    useState('')
  return (
    <AddCampaignContext.Provider
      value={{
        title,
        endPoint,
        purposeDescription,
        target,
        phoneNumber,
        beneficiaryName,
        receiver,
        showMenu,
        isSuccessEndPoint,
        endPointDuplicateErrorMessage,
        currentReceiver,
        setCurrentReceiver,
        setEndPointDuplicateErrorMessage,
        setReceiver,
        setShowMenu,
        setIsSuccessEndPoint,
        setPurposeDescription,
        setBeneficiaryName,
        setEndPoint,
        setTitle,
        setPhoneNumber,
        setTarget,
        setImage,
        image,
        story,
        setStory,
      }}
    >
      {children}
    </AddCampaignContext.Provider>
  )
}
