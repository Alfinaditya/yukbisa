import styled, { css } from 'styled-components'

export const Container = styled.div<any | undefined>`
  width: 80%;
  margin: auto;
  /* background: green; */
  @media only screen and (max-width: 537px) {
    width: 95%;
  }
  ${props =>
    props.me &&
    css`
      margin-top: 50px;
      @media only screen and (max-width: 537px) {
        padding: 0px;
      }
    `}
`
