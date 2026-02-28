import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const API_URL = import.meta.env.VITE_API_URL;

const client = new ApolloClient({
    link: new HttpLink({
        uri: API_URL,
    }),
    cache: new InMemoryCache(),
})

export default client;