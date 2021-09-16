import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Button } from '../../../components/Button'
import { Container } from '../../../components/Container'
import CurrencyInput from 'react-currency-input-field'
import { Label } from '../../../components/Form'

// todo refactor this code,use params for color
export const ContainerForm = styled(Container)`
  margin-top: 80px;
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
export const PurposeDescriptionLabel = styled(Label)`
  margin: 20px 0;
`
export const ListBox = styled.div``
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
