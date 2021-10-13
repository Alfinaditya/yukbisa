import styled, { createGlobalStyle } from 'styled-components'
import './fonts/font.css'
export const GlobalStyle = createGlobalStyle`

:root {
  --main: #00AEEF;
  --black: #161616;
  --shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
  --error:#b92f2f;
  --icon--size--lg:34px;
  --icon--size--sm:25px;
  --icon--color:#B8B8B8;
}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body{
    font-family: 'Roboto', sans-serif;
  }
`
export const Wrapper = styled.div`
  min-height: 100vh;
  margin-bottom: 20px;
`
