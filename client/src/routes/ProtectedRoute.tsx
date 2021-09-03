import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getAccessToken } from '../auth/accessToken'

interface Props {
  component: any
  path: string
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (getAccessToken()) {
          return <Component />
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      }}
    />
  )
}

export default ProtectedRoute
