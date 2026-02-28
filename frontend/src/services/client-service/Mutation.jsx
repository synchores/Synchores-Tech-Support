import { gql } from '@apollo/client';

export const SUBMIT_TICKET_MUTATION = gql`
    mutation SubmitTicket($userId: number!, $title: String!, $description: String!, $priority: String!, $deadline: Date!, $attachment: String) {
        submitTicket(userId: $userId, title: $title, description: $description, priority: $priority, deadline: $deadline, attachment: $attachment) {
    }
`;

