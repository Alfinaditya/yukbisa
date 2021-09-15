import styled from 'styled-components'
import { Input, Label } from '../../components/Form'

export const MeContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
`
export const MeImage = styled.img`
  width: 424px;
  height: 441px;
`
export const MeDetails = styled.div`
  margin-left: 20px;
`
export const MeLabel = styled(Label)`
  color: #a3a2a2;
  display: block;
  margin-top: 20px;
`
export const InputImage = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  p {
    font-size: 14px;
    margin-left: 20px;
    font-weight: 500;
  }
  img {
    cursor: pointer;
  }
  div {
    position: relative;
  }
  div:after {
    content: '';
    width: 20px;
    display: inline-block;
    height: 20px;
    border-radius: 50px;
    position: absolute;
    bottom: 0;
    right: 1%;
    background: black;
    padding: 7px;
    cursor: pointer;
    background-image: url('https://res.cloudinary.com/alfin-software/image/upload/v1631686016/camera_kgtwma.svg');
    background-repeat: no-repeat;
    background-position: center;
  }
  input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
  }
`
export const InputDate = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`
