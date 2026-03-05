import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000/graphql';

const httpLink = new HttpLink({
    uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');

    return {
        headers: {
            ...headers,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default client;