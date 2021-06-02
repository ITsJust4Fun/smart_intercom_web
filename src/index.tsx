import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { AuthProvider } from './auth/AuthContext'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
    uri: '/api',
});

const authMiddleware = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    }
});

const logoutMiddleware = onError(({ networkError, graphQLErrors }) => {
    console.log(networkError)
    console.log(graphQLErrors)
})

export const client = new ApolloClient({
    link: from([
        authMiddleware,
        logoutMiddleware,
        httpLink
    ]),
    cache: new InMemoryCache(),
    credentials: 'same-origin',
});

ReactDOM.render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </AuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
