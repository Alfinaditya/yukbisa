import styled, { css } from 'styled-components'

export const Container = styled.div<any | undefined>`
  width: 80%;
  margin: auto;
  ${props =>
    props.me &&
    css`
      margin-top: 50px;
    `}
`
