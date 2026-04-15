import { gql } from "@apollo/client";

export const GET_HERO_SECTION_QUERY = gql`
  query GetHeroSection {
    getHeroSection {
      heroId
      headline
      tagline
      backgroundImage
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_LANDING_SERVICES_QUERY = gql`
  query GetAllLandingServiceCards($search: String, $status: ContentStatus, $category: String) {
    getAllLandingServiceCards(search: $search, status: $status, category: $category) {
      cardId
      title
      description
      icon
      image
      category
      status
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_LANDING_SERVICE_CARD_QUERY = gql`
  query GetLandingServiceCard($cardId: Int!) {
    getLandingServiceCard(cardId: $cardId) {
      cardId
      title
      description
      icon
      image
      category
      status
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_DEPLOYMENTS_QUERY = gql`
  query GetAllDeployments($search: String, $status: ContentStatus, $category: String) {
    getAllDeployments(search: $search, status: $status, category: $category) {
      deploymentId
      title
      description
      image
      category
      status
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_DEPLOYMENT_QUERY = gql`
  query GetDeployment($deploymentId: Int!) {
    getDeployment(deploymentId: $deploymentId) {
      deploymentId
      title
      description
      image
      category
      status
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_COMPANY_INFO_QUERY = gql`
  query GetCompanyInfo {
    getCompanyInfo {
      infoId
      address
      phoneMain
      phoneMobile
      email
      aboutText
      whatWeDoTitle
      whatWeDoParagraph1
      whatWeDoParagraph2
      facebookUrl
      instagramUrl
      youtubeUrl
      createdAt
      updatedAt
    }
  }
`;
