import { gql } from "@apollo/client";

export const CLIENT_PROFILE = gql`
    query ReadProfile($userId: Int!) {
        readProfile(userId: $userId) {
            userId
            fullName
            emailAddress
            companyName
            address
            phoneNumber
            createdAt
        }   
    }
`;

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

export const CLIENT_ORDERS_QUERY = gql`
    query ClientOrders($userId: Int!) {
        clientOrders(userId: $userId) {
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

export const CLIENT_INVOICE_BY_ORDER_QUERY = gql`
    query ClientInvoiceByOrder($orderId: Int!) {
        invoiceByOrderId(orderId: $orderId) {
            invoiceId
            orderId
            invoiceNumber
            totalAmount
            dueDate
            paymentStatus
        }
    }
`;

export const SHOP_PRODUCTS_QUERY = gql`
    query ShopProducts {
        getProducts {
            productId
            productName
            productDescription
            productPrice
            createdAt
            updatedAt
        }
    }
`;