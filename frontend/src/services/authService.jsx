import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($emailAddress: String!, $password: String!) {
    login(emailAddress: $emailAddress, password: $password) { accessToken }
    }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($emailAddress: String!, $password: String!) {
    signup(emailAddress: $emailAddress, password: $password) { accessToken }
    }
`;