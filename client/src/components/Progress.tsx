import styled from 'styled-components'

export const Progress = styled.progress`
  display: block;
  width: 100%;
  height: 15px;
  -webkit-appearance: none;
  border: none;
  ::-webkit-progress-value {
    border-radius: 45px;
    background: var(--main);
  }

  ::-webkit-progress-bar {
    background: #e5e5e5;
    border-radius: 25px;
  }
`
