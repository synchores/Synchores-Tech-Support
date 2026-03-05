import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      middleName
      lastName
      emailAddress
      role
      password
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      userId
      firstName
      middleName
      lastName
      emailAddress
      profPicture
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: Int!) {
    deleteUser(userId: $userId) {
      userId
    }
  }
`;

export const CREATE_SERVICE_MUTATION = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(input: $input) {
      serviceName
      description
      category
      image
    }
  }
`;

export const UPDATE_SERVICE_MUTATION = gql`
  mutation UpdateService($input: UpdateServiceInput!) {
    updateService(input: $input) {
      serviceId
      serviceName
      description
      category
      image
    }
  }
`;

export const DELETE_SERVICE_MUTATION = gql`
  mutation DeleteService($serviceId: Int!) {
    deleteService(serviceId: $serviceId) {
      serviceId
    }
  }
`;

export const TRANSITION_ORDER_STATUS_MUTATION = gql`
  mutation TransitionOrderStatus($input: TransitionOrderStatusDto!) {
    transitionOrderStatus(input: $input) {
      orderId
      status
      updatedAt
    }
  }
`;
