import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Button } from '../../../components/Button'
import { Container } from '../../../components/Container'
import CurrencyInput from 'react-currency-input-field'

// todo refactor this code,use params for color
export const ContainerForm = styled(Container)`
  margin-top: 80px;
`
export const ErrorText = styled.p`
  color: var(--error);
  margin-top: 10px;
`
export const TextArea = styled.textarea`
  outline: none;
  padding: 10px;
  resize: none;
  height: 239px;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
  transition: 1s;
  font-size: 16px;
  &:focus {
    border: 1px solid var(--main);
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 20px;
`
export const Input = styled.input`
  height: 59px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #cdcfd3;
  transition: 1s;
  &:focus {
    border: 1px solid var(--main);
  }
`
export const InputEndPoint = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  div {
    height: 59px;
    border: 1px solid #cdcfd3;
    font-size: 14px;
    line-height: 59px;
    padding: 0 10px;
  }
  input {
    width: 100%;
    border-left: 0px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
  }
`

export const HeaderForm = styled.h1`
  font-size: 25px;
  margin-bottom: 16px;
`

export const LabelForm = styled.label<any | undefined>`
  font-size: 14px;
  font-weight: 500;
  span {
    color: var(--error);
  }
  margin-top: 40px;
  margin-bottom: 10px;
  ${props =>
    props.endPoint &&
    css`
      margin-top: 40px;
    `}
  ${props =>
    props.sub &&
    css`
      margin-top: 0px;
      margin-bottom: 16px;
    `}
    ${props =>
    props.phone &&
    css`
      margin-bottom: 25px;
    `}
    ${props =>
    props.image &&
    css`
      margin-top: 25px;
      margin-bottom: 20px;
    `}
`

export const PurposeDescriptionLabel = styled(LabelForm)`
  margin: 20px 0;
`
export const ButtonForm = styled(Button)`
  font-size: 16px;
  background: var(--main);
`
export const NextButton = styled(ButtonForm)`
  margin-top: 38px;
  &:disabled {
    background: #c4c4c4;
    cursor: not-allowed;
  }
`
export const PreviousButton = styled(ButtonForm)`
  background: #cdcfd3;
  color: #3e3e3e;
  margin-top: 20px;
  margin-bottom: 30px;
`
export const CancelLink = styled(Link)`
  text-decoration: none;
  color: var(--error);
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`
export const BeneficiaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const ListBox = styled.div`
  /* border: 1px solid #cdcfd3; */
`
export const ListBoxButton = styled.div`
  padding: 20px;
  border: 1px solid #cdcfd3;
  cursor: pointer;
  border-radius: 5px;
`
export const ListBoxOptions = styled.div`
  margin: 10px 0;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
`
export const ListBoxOption = styled.div`
  padding: 10px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
    background: #f8f8f8;
  }
`
export const Currency = styled(CurrencyInput)`
  border: 1px solid #cdcfd3;
  height: 59px;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
`
export const ContainerImage = styled.div`
  border: 1px solid #cdcfd3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 247px;
  border-radius: 6px;
  label:nth-child(1) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`
export const PreviewImage = styled.div`
  width: 100%;
  height: 500px;
`
export const InputImage = styled.div`
  border: 1px solid white;
  background: var(--main);
  color: white;
  margin-top: 10px;
  padding: 10px;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
  width: 422px;
  text-align: center;
  position: relative;
  transition: 0.5s;
  &:hover {
    border: 1px solid var(--main);
    background: white;
    color: var(--main);
  }
  input {
    opacity: 0;
    width: 100%;
    left: 0;
    cursor: pointer;
    position: absolute;
  }
`
export const Checkbox = styled.div`
  display: flex;
  background: #f8f8f8;
  padding: 20px;
  align-items: center;
  margin-top: 20px;
  input {
    cursor: pointer;
  }
  p {
    margin-left: 20px;
  }
`
export const FinishContainer = styled.div`
  font-size: 14px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  p {
    width: 324px;
  }
`
export const FinishButton = styled(Button)`
  background: var(--main);
  font-size: 14px;
  margin-top: 20px;
  width: 324px;
`
