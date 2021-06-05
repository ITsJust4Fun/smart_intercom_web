import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import refreshTokenHandler from './auth/RefreshToken'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
    uri: '/api',
})

const authMiddleware = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const errorMiddleware = onError(({ networkError, graphQLErrors, forward, operation}) => {
    if (networkError) {
        console.log(networkError)
    }

    if (graphQLErrors) {
        console.log(graphQLErrors)

        for (let error of graphQLErrors) {
            if (error.message.includes('access denied') && refreshTokenHandler()) {
                return forward(operation)
            }
        }
    }

})

export const client = new ApolloClient({
    link: from([
        authMiddleware,
        errorMiddleware,
        httpLink,
    ]),
    cache: new InMemoryCache(),
    credentials: 'same-origin',
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
