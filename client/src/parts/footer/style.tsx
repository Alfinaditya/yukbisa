import styled from 'styled-components'

export const FooterContainer = styled.footer`
  display: flex;
  color: white;
  justify-content: space-between;
  width: 80%;
  margin: auto;
  padding-top: 40px;
  padding-bottom: 55px;
`
export const FooterSection = styled.footer`
  background: var(--main);
`
export const FooterDescription = styled.p`
  font-size: 13px;
  font-weight: 300;
  width: 249px;
  margin: 20px 0;
`
export const Left = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
`
export const Right = styled.div`
  display: flex;
  ul {
    list-style: none;
    margin: 0 30px;
    li {
      margin-top: 20px;
      h1 {
        font-size: 15px;
        font-weight: bold;
      }
      a {
        font-weight: 300;
        font-size: 14px;
        color: white;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`
