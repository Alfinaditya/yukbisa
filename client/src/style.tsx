import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

:root {
  --main: #00AEEF;
  --black: #161616;
  --shadow:rgba(0, 0, 0, 0.16) 0px 1px 4px;
  --error:#b92f2f;
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

export const MainApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
