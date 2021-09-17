import { useRouteMatch } from 'react-router'
import Loading from '../../components/Loading'

const NoMatch = () => {
  // const match = useRouteMatch('/campaign/:slug')
  // if (match?.path) {
  //   return <></>
  // }
  return <h1>Error 404</h1>
}

export default NoMatch
