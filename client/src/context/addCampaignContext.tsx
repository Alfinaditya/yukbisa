import { useState, createContext } from 'react'

interface ContextProps {
  currentReceiver: string
  showMenu: boolean
  receiver: string
  beneficiaryName: string
  title: string
  endPoint: string
  purposeDescription: string
  target: string
  phoneNumber: string
  image: any
  story: string
  isSuccessEndPoint: string
  setCurrentReceiver: React.Dispatch<React.SetStateAction<string>>
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  setReceiver: React.Dispatch<React.SetStateAction<string>>
  setBeneficiaryName: React.Dispatch<React.SetStateAction<string>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setEndPoint: React.Dispatch<React.SetStateAction<string>>
  setTarget: React.Dispatch<React.SetStateAction<string>>
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
  setPurposeDescription: React.Dispatch<React.SetStateAction<string>>
  setImage: React.Dispatch<any>
  setStory: React.Dispatch<React.SetStateAction<string>>
  setIsSuccessEndPoint: React.Dispatch<React.SetStateAction<string>>
}
export const AddCampaignContext = createContext<ContextProps | null>(null)

export const AddCampaignProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  // Dropdown Menu
  const [currentReceiver, setCurrentReceiver] = useState('Saya Sendiri')
  const [showMenu, setShowMenu] = useState(false)
  const [receiver, setReceiver] = useState('me')

  const [beneficiaryName, setBeneficiaryName] = useState('')
  const [title, setTitle] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [purposeDescription, setPurposeDescription] = useState('')
  const [target, setTarget] = useState('')
  const [image, setImage] = useState<any>('')
  const [story, setStory] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSuccessEndPoint, setIsSuccessEndPoint] = useState('')
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
        currentReceiver,
        setCurrentReceiver,
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
