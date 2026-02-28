import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query getAllUsers {
        users {
        userId
        firstName
        middleName
        lastName
        emailAddress
        role
        profPicture
        }
    }
`;

export const SERVICES_QUERY = gql`
    query getAllServices {
        getAllServices {
        serviceId
        serviceName
        description
        category
        image
        }
    }
`;