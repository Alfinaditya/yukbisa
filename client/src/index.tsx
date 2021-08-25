import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { getAccessToken, setAccessToken } from './auth/accessToken'
import jwtDecode from 'jwt-decode'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const accessToken = getAccessToken()
  if (accessToken) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `bearer ${accessToken}`,
      },
    }))
  }

  return forward(operation)
})

const tokenRefresh = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) return true
    try {
      const { exp }: any = jwtDecode(token)
      if (Date.now() >= exp * 1000) {
        return false
      } else {
        return true
      }
    } catch {
      return false
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:3001/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken)
  },
  handleError: err => {
    // full control over handling token fetch Error
    console.warn('Your refresh token is invalid. Try to relogin')
    console.error(err)

    // // your custom action here
    // user.logout();
  },
})
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions!.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'UNAUTHENTICATED':
            // Modify the operation context with a new token
            const oldHeaders = operation.getContext().headers
            const accessToken = getAccessToken()
            console.log('iki token e ' + accessToken)
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `bearer ${accessToken}`,
              },
            })
            // Retry the request, returning the new observable
            return forward(operation)
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
)

const client = new ApolloClient({
  link: from([tokenRefresh as any, authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)
