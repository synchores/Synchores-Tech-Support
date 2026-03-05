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


export const CREATE_INQUIRY_FORM_MUTATION = gql`
  mutation CreateInquiryForm($input: CreateInquiryFormDto!) {
    createInquiryForm(input: $input) {
      inquiryId
      fullName
      email
      contactNumber
      serviceType
      message
      createdAt
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderDto!) {
    createOrder(input: $input) {
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

export const PAY_INVOICE_BY_ORDER_MUTATION = gql`
  mutation PayInvoiceByOrderId($orderId: Int!) {
    payInvoiceByOrderId(orderId: $orderId) {
      invoiceId
      orderId
      invoiceNumber
      totalAmount
      dueDate
      paymentStatus
      updatedAt
    }
  }
`;
