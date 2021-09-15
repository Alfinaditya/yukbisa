import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Button = styled.button`
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  display: block;
  text-align: center;
  color: white;
  border: 1px solid white;
  padding: 15px 15px;
  background: #cb1552;
  cursor: pointer;
`
const ButtonForm = styled(Button)`
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
