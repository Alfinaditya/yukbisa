import styled, { css } from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 50px;
  @media only screen and (max-width: 471px) {
    width: 90%;
  }
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
export const Label = styled.label<any | undefined>`
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
