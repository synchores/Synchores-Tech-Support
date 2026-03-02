import { gql } from "@apollo/client";

export const CLIENTS_SERVICE = gql`
    query GetMyServices {
        getMyServices {
            serviceId
            serviceName
            description
            category
            image
        }
    }
`;

export const CLIENTS_TICKETS = gql`
    query GetMyTickets{
        getMyTickets{
            ticketId
            userId
            serviceId
            title
            description
            priority
            status
            deadline
        }
    }
`;