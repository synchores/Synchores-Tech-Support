import { gql } from '@apollo/client';

export const SUBMIT_TICKET_MUTATION = gql`
    mutation SubmitTicket($input: CreateTicketDto!) {
        createTicket(input: $input) {
            ticketId
            userId
            serviceId
            title
            description
            priority
            deadline
            attachments
            status
        }
    }
`;

