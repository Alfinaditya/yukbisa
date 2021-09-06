import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 24px;
  color: var(--black);
`
export const UserDonationName = styled.p`
  font-size: 17px;
  color: var(--main);
`
const Container = styled.div`
  width: 90%;
  margin-top: 20px;
  border: 1px solid #c4c4c4;
  /* box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px; */
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
`
export const FundraiserContainer = styled(Container)`
  padding: 10px;
`
export const BeneficiaryContainer = styled(Container)`
  padding: 10px;
`
export const StoryContainer = styled(Container)`
  padding: 5px;
  margin-bottom: 20px;
`
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
export const BeneficiaryTitle = styled.h1`
  color: red;
`
