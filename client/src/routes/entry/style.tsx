import styled from 'styled-components'
import { Button } from '../../components/Button'
import { Input, Label } from '../../components/Form'
import { HeaderForm } from '../galangDana/addCampaign/style'

export const StayAtHome = styled.h1`
  color: var(--main);
  text-align: center;
`
export const HeaderEntry = styled(HeaderForm)`
  color: var(--main);
  margin-bottom: 40px;
  text-align: center;
  @media only screen and (max-width: 337px) {
    font-size: 24px;
  }
  @media only screen and (max-width: 324px) {
    font-size: 22px;
  }
`
export const Entry = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const EntryInput = styled(Input)`
  margin-bottom: 10px;
`
export const FormEntry = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  border: 1px solid var(--shadow);
  box-shadow: var(--shadow);
  @media only screen and (max-width: 425px) {
    font-size: 22px;
    width: 100%;
  }
`
export const EntryLink = styled.span`
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 40px;
  a {
    color: var(--main);
  }
`
export const EntryLabel = styled(Label)`
  margin-top: 15px;
`
export const EntryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background: #f9f9f9;
  padding: 0 40px;
  width: 100%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
  @media only screen and (max-width: 357px) {
    padding: 0 10px;
  }
`
export const EntryImageContainer = styled.div`
  margin-left: 40px;
  @media only screen and (max-width: 843px) {
    display: none;
  }
`
export const SubmitEntryButton = styled(Button)`
  background: var(--main);
  height: 39px;
  font-size: 13px;
  font-weight: 700;
  border: 0;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: white;
    border: 1px solid var(--main);
    color: var(--main);
  }
`
export const GoogleLoginButton = styled(Button)`
  border: 0;
  height: 39px;
  background: white;
  color: black;
  border: 1px solid #d0d0d0;
  text-align: center;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  span {
    margin-left: 20px;
  }
`
