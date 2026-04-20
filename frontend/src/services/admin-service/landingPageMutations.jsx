import { gql } from "@apollo/client";

// ─── HERO SECTION ───────────────────────────────────────────────────────
export const UPDATE_HERO_SECTION_MUTATION = gql`
  mutation UpdateHeroSection($input: UpdateHeroSectionDto!) {
    updateHeroSection(input: $input) {
      heroId
      headline
      tagline
      backgroundImage
      focusText
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
      focusText
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
      subtitle
      longDescription
      points
      stats
      features
      process
      ctaTitle
      ctaDescription
      ctaButtonLabel
      category
      status
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
      subtitle
      longDescription
      points
      stats
      features
      process
      ctaTitle
      ctaDescription
      ctaButtonLabel
      category
      status
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

export const DUPLICATE_LANDING_SERVICE_CARD_MUTATION = gql`
  mutation DuplicateLandingServiceCard($cardId: Int!) {
    duplicateLandingServiceCard(cardId: $cardId) {
      cardId
      title
      description
      icon
      image
      subtitle
      longDescription
      points
      stats
      features
      process
      ctaTitle
      ctaDescription
      ctaButtonLabel
      category
      status
      order
      createdAt
      updatedAt
    }
  }
`;

export const BULK_DELETE_LANDING_SERVICE_CARD_MUTATION = gql`
  mutation BulkDeleteLandingServiceCards($cardIds: [Int!]!) {
    bulkDeleteLandingServiceCards(cardIds: $cardIds)
  }
`;

export const BULK_UPDATE_LANDING_SERVICE_CARD_STATUS_MUTATION = gql`
  mutation BulkUpdateLandingServiceCardStatus($cardIds: [Int!]!, $status: ContentStatus!) {
    bulkUpdateLandingServiceCardStatus(cardIds: $cardIds, status: $status) {
      cardId
      status
      updatedAt
    }
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
      status
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
      status
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

export const DUPLICATE_DEPLOYMENT_MUTATION = gql`
  mutation DuplicateDeployment($deploymentId: Int!) {
    duplicateDeployment(deploymentId: $deploymentId) {
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

export const BULK_DELETE_DEPLOYMENT_MUTATION = gql`
  mutation BulkDeleteDeployments($deploymentIds: [Int!]!) {
    bulkDeleteDeployments(deploymentIds: $deploymentIds)
  }
`;

export const BULK_UPDATE_DEPLOYMENT_STATUS_MUTATION = gql`
  mutation BulkUpdateDeploymentStatus($deploymentIds: [Int!]!, $status: ContentStatus!) {
    bulkUpdateDeploymentStatus(deploymentIds: $deploymentIds, status: $status) {
      deploymentId
      status
      updatedAt
    }
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
      aboutEyebrow
      aboutHeading
      aboutParagraph2
      aboutImage1
      aboutImage2
      aboutImage1Alt
      aboutImage2Alt
      missionLabel
      missionStatement
      valuesLabel
      valuesStatement
      commitmentEyebrow
      commitmentHeading
      commitmentStatement
      footerBrandText
      companyLogo
      companyLogoAlt
      contactEyebrow
      contactHeading
      contactIntroText
      contactBgImage
      contactBgImageAlt
      createdAt
      updatedAt
    }
  }
`;
