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

export const ALL_ORDERS_QUERY = gql`
    query AllOrders {
        allOrders {
            orderId
            productId
            userId
            quantity
            unitPrice
            totalPrice
            status
            createdAt
            updatedAt
        }
    }
`;

export const ORDER_DETAILS_QUERY = gql`
    query OrderDetails($orderId: Int!) {
        orderDetails(orderId: $orderId) {
            orderId
            productId
            userId
            quantity
            unitPrice
            totalPrice
            status
            createdAt
            updatedAt
        }
    }
`;

export const INVOICE_BY_ORDER_ID_QUERY = gql`
    query InvoiceByOrderId($orderId: Int!) {
        invoiceByOrderId(orderId: $orderId) {
            invoiceId
            orderId
            userId
            invoiceNumber
            totalAmount
            dueDate
            paymentStatus
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_TICKETS_QUERY = gql`
    query getAllTickets {
        getAllTickets {
            ticketId
            userId
            serviceId
            title
            description
            priority
            status
            deadline
            attachments
            createdAt
            updatedAt
        }
    }
`;