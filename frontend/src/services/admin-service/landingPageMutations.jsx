import { gql } from "@apollo/client";

// ─── HERO SECTION ───────────────────────────────────────────────────────
export const UPDATE_HERO_SECTION_MUTATION = gql`
  mutation UpdateHeroSection($input: UpdateHeroSectionDto!) {
    updateHeroSection(input: $input) {
      heroId
      headline
      tagline
      backgroundImage
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_HERO_SECTION_MUTATION = gql`
  mutation CreateHeroSection($input: CreateHeroSectionDto!) {
    createHeroSection(input: $input) {
      heroId
      headline
      tagline
      backgroundImage
      createdAt
      updatedAt
    }
  }
`;

// ─── LANDING SERVICE CARDS ───────────────────────────────────────────────
export const CREATE_LANDING_SERVICE_CARD_MUTATION = gql`
  mutation CreateLandingServiceCard($input: CreateLandingServiceCardDto!) {
    createLandingServiceCard(input: $input) {
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

export const UPDATE_LANDING_SERVICE_CARD_MUTATION = gql`
  mutation UpdateLandingServiceCard($input: UpdateLandingServiceCardDto!) {
    updateLandingServiceCard(input: $input) {
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

export const DELETE_LANDING_SERVICE_CARD_MUTATION = gql`
  mutation DeleteLandingServiceCard($cardId: Int!) {
    deleteLandingServiceCard(cardId: $cardId)
  }
`;

// ─── DEPLOYMENT GALLERY ─────────────────────────────────────────────────
export const CREATE_DEPLOYMENT_MUTATION = gql`
  mutation CreateDeployment($input: CreateDeploymentGalleryDto!) {
    createDeployment(input: $input) {
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

export const UPDATE_DEPLOYMENT_MUTATION = gql`
  mutation UpdateDeployment($input: UpdateDeploymentGalleryDto!) {
    updateDeployment(input: $input) {
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

export const DELETE_DEPLOYMENT_MUTATION = gql`
  mutation DeleteDeployment($deploymentId: Int!) {
    deleteDeployment(deploymentId: $deploymentId)
  }
`;

// ─── COMPANY INFO ───────────────────────────────────────────────────────
export const UPDATE_COMPANY_INFO_MUTATION = gql`
  mutation UpdateCompanyInfo($input: UpdateCompanyInfoDto!) {
    updateCompanyInfo(input: $input) {
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
