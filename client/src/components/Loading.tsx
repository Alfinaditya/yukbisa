import styled, { keyframes } from 'styled-components'

const loading = keyframes`
    60% {
        text-shadow: 0.35em 0 0 black;
    }
    100% {
        text-shadow: 0.35em 0 0 black, 0.75em 0 0 black;
    }

`
const LoadingAnimate = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 120px;
    height: 120px;
  }
  div:after {
    content: ' .';
    animation: ${loading} 1s ease alternate infinite;
  }
`
interface Props {
  message?: string
}
const Loading: React.FC<Props> = ({ message }) => {
  return (
    <LoadingAnimate>
      <img
        src='https://res.cloudinary.com/alfin-software/image/upload/v1631800375/assets/827_1_udcjjs.svg'
        alt='loading'
      />
      {message ? <div>{message}</div> : <></>}
    </LoadingAnimate>
  )
}

export default Loading
