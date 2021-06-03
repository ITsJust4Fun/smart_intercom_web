import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
    uri: '/api',
});

const REFRESH_TOKEN = gql`
  query refresh {
    refreshToken
  }
`

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'same-origin',
});

export default function refreshTokenHandler() {
    let result = false
    localStorage.setItem('token', '')

    client.query({
        query: REFRESH_TOKEN
    })
        .then((response) => {
            const data = response.data

            if (!data || !data['refreshToken']) {
                return
            }

            let token = data['refreshToken'].replace('Bearer ', '')
            localStorage.setItem('token', token)
            result = true
        })
        .catch((err) => {
            if (err.message.includes('Unexpected token')) {
                localStorage.setItem('token', '')
            }
        })

    return result
}
