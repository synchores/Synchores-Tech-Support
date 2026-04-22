import { ApolloClient, HttpLink, InMemoryCache, defaultDataIdFromObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const API_URL = import.meta.env.VITE_API_URL;

const httpLink = new HttpLink({
    uri: API_URL,
});

const ENTITY_ID_KEYS = [
    'id',
    '_id',
    'userId',
    'serviceId',
    'orderId',
    'invoiceId',
    'ticketId',
    'heroId',
    'infoId',
    'cardId',
    'deploymentId',
    'productId',
];

const cache = new InMemoryCache({
    dataIdFromObject(responseObject) {
        if (!responseObject || typeof responseObject !== 'object') {
            return null;
        }

        if (responseObject.__typename) {
            for (const key of ENTITY_ID_KEYS) {
                const value = responseObject[key];
                if (value !== undefined && value !== null) {
                    return `${responseObject.__typename}:${key}:${String(value)}`;
                }
            }
        }

        return defaultDataIdFromObject(responseObject);
    },
    typePolicies: {
        Query: {
            fields: {
                getAllLandingServiceCards: { merge: false },
                getAllDeployments: { merge: false },
                getAllTickets: { merge: false },
                allOrders: { merge: false },
                users: { merge: false },
                getAllServices: { merge: false },
            },
        },
    },
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
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
        query: {
            fetchPolicy: 'cache-first',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})

export default client;