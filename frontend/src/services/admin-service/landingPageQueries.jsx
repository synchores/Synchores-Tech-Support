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
  query GetAllLandingServiceCards {
    getAllLandingServiceCards {
      cardId
      title
      description
      icon
      image
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
      order
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_DEPLOYMENTS_QUERY = gql`
  query GetAllDeployments {
    getAllDeployments {
      deploymentId
      title
      description
      image
      category
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
