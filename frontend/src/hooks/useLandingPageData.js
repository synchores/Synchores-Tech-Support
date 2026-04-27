import { useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_HERO_SECTION_QUERY,
  GET_ALL_LANDING_SERVICES_QUERY,
  GET_ALL_DEPLOYMENTS_QUERY,
  GET_COMPANY_INFO_QUERY,
} from "../services/admin-service/landingPageQueries";
import {
  UPDATE_HERO_SECTION_MUTATION,
  CREATE_HERO_SECTION_MUTATION,
  CREATE_LANDING_SERVICE_CARD_MUTATION,
  UPDATE_LANDING_SERVICE_CARD_MUTATION,
  DELETE_LANDING_SERVICE_CARD_MUTATION,
  DUPLICATE_LANDING_SERVICE_CARD_MUTATION,
  BULK_DELETE_LANDING_SERVICE_CARD_MUTATION,
  BULK_UPDATE_LANDING_SERVICE_CARD_STATUS_MUTATION,
  CREATE_DEPLOYMENT_MUTATION,
  UPDATE_DEPLOYMENT_MUTATION,
  DELETE_DEPLOYMENT_MUTATION,
  DUPLICATE_DEPLOYMENT_MUTATION,
  BULK_DELETE_DEPLOYMENT_MUTATION,
  BULK_UPDATE_DEPLOYMENT_STATUS_MUTATION,
  UPDATE_COMPANY_INFO_MUTATION,
} from "../services/admin-service/landingPageMutations";

function toGraphQLStatus(status) {
  if (!status) return undefined;

  const normalized = String(status).trim().toUpperCase();
  if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(normalized)) {
    return normalized;
  }

  const map = {
    draft: "DRAFT",
    published: "PUBLISHED",
    archived: "ARCHIVED",
  };

  return map[String(status).trim().toLowerCase()] || undefined;
}

function fromGraphQLStatus(status) {
  if (!status) return undefined;

  const normalized = String(status).trim().toUpperCase();
  const map = {
    DRAFT: "draft",
    PUBLISHED: "published",
    ARCHIVED: "archived",
  };

  return map[normalized] || String(status).trim().toLowerCase();
}

function mapStatusInInput(input) {
  if (!input || typeof input !== "object") return input;
  if (!("status" in input) || !input.status) return input;

  return {
    ...input,
    status: toGraphQLStatus(input.status),
  };
}

function normalizeService(service) {
  if (!service) return service;

  return {
    ...service,
    status: fromGraphQLStatus(service.status),
  };
}

function normalizeDeployment(deployment) {
  if (!deployment) return deployment;

  return {
    ...deployment,
    status: fromGraphQLStatus(deployment.status),
  };
}

function sanitizeQueryVariables(variables) {
  return Object.fromEntries(
    Object.entries(variables).filter(([, value]) => value !== undefined)
  );
}

// ─── HERO SECTION HOOK ───────────────────────────────────────────────────
export function useHeroSection() {
  const { data, loading, error, refetch } = useQuery(GET_HERO_SECTION_QUERY, {
    errorPolicy: "all",
  });

  const [updateHeroMutation, { loading: updating }] = useMutation(
    UPDATE_HERO_SECTION_MUTATION
  );
  const [createHeroMutation] = useMutation(CREATE_HERO_SECTION_MUTATION);

  const updateHero = async (updates) => {
    try {
      const currentHero = data?.getHeroSection;
      if (!currentHero) {
        // Create if doesn't exist
        const res = await createHeroMutation({
          variables: { input: updates },
        });
        return res.data?.createHeroSection || null;
      }

      // Update existing
      const res = await updateHeroMutation({
        variables: {
          input: {
            heroId: currentHero.heroId,
            ...updates,
          },
        },
        optimisticResponse: {
          updateHeroSection: {
            ...currentHero,
            ...updates,
            __typename: "HeroSectionTbl",
          },
        },
      });
      return res.data?.updateHeroSection || null;
    } catch (err) {
      console.error("Update hero failed:", err);
      throw err;
    }
  };

  return {
    hero: data?.getHeroSection || null,
    loading,
    error,
    updating,
    updateHero,
    refetch,
  };
}

// ─── LANDING SERVICES HOOK ───────────────────────────────────────────────
export function useLandingServices(filters = {}) {
  const queryVariables = useMemo(
    () =>
      sanitizeQueryVariables({
        search: filters.search || undefined,
        status: toGraphQLStatus(filters.status) || undefined,
        category: filters.category || undefined,
      }),
    [filters.search, filters.status, filters.category]
  );

  const landingServiceRefetchQueries = useMemo(
    () => [
      { query: GET_ALL_LANDING_SERVICES_QUERY, variables: queryVariables },
      { query: GET_ALL_LANDING_SERVICES_QUERY },
    ],
    [queryVariables]
  );

  const { data, previousData, loading, error, refetch } = useQuery(
    GET_ALL_LANDING_SERVICES_QUERY,
    {
      errorPolicy: "all",
      variables: queryVariables,
      returnPartialData: true,
    }
  );

  const serviceSource =
    data?.getAllLandingServiceCards || previousData?.getAllLandingServiceCards || [];

  const [createCardMutation] = useMutation(
    CREATE_LANDING_SERVICE_CARD_MUTATION
  );
  const [updateCardMutation] = useMutation(
    UPDATE_LANDING_SERVICE_CARD_MUTATION
  );
  const [deleteCardMutation] = useMutation(
    DELETE_LANDING_SERVICE_CARD_MUTATION
  );
  const [duplicateCardMutation] = useMutation(
    DUPLICATE_LANDING_SERVICE_CARD_MUTATION
  );
  const [bulkDeleteCardsMutation] = useMutation(
    BULK_DELETE_LANDING_SERVICE_CARD_MUTATION
  );
  const [bulkUpdateCardStatusMutation] = useMutation(
    BULK_UPDATE_LANDING_SERVICE_CARD_STATUS_MUTATION
  );

  const createService = async (input) => {
    try {
      const mappedInput = mapStatusInInput(input);
      const res = await createCardMutation({
        variables: { input: mappedInput },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeService(res.data?.createLandingServiceCard) || null;
    } catch (err) {
      console.error("Create service card failed:", err);
      throw err;
    }
  };

  const updateService = async (input) => {
    try {
      const currentServices = serviceSource;
      const currentService = currentServices.find(
        (s) => s.cardId === input.cardId
      );
      const mappedInput = mapStatusInInput(input);

      const res = await updateCardMutation({
        variables: { input: mappedInput },
        optimisticResponse: {
          updateLandingServiceCard: {
            ...currentService,
            ...input,
            status: input.status
              ? fromGraphQLStatus(mappedInput.status)
              : currentService?.status,
            __typename: "LandingServiceCardTbl",
          },
        },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeService(res.data?.updateLandingServiceCard) || null;
    } catch (err) {
      console.error("Update service card failed:", err);
      throw err;
    }
  };

  const deleteService = async (cardId) => {
    try {
      await deleteCardMutation({
        variables: { cardId },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return true;
    } catch (err) {
      console.error("Delete service card failed:", err);
      throw err;
    }
  };

  const duplicateService = async (cardId) => {
    try {
      const res = await duplicateCardMutation({
        variables: { cardId },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeService(res.data?.duplicateLandingServiceCard) || null;
    } catch (err) {
      console.error("Duplicate service card failed:", err);
      throw err;
    }
  };

  const bulkDeleteServices = async (cardIds) => {
    try {
      await bulkDeleteCardsMutation({
        variables: { cardIds },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return true;
    } catch (err) {
      console.error("Bulk delete service cards failed:", err);
      throw err;
    }
  };

  const bulkUpdateServiceStatus = async (cardIds, status) => {
    try {
      const res = await bulkUpdateCardStatusMutation({
        variables: { cardIds, status: toGraphQLStatus(status) },
        refetchQueries: landingServiceRefetchQueries,
        awaitRefetchQueries: true,
      });
      return (res.data?.bulkUpdateLandingServiceCardStatus || []).map(
        normalizeService
      );
    } catch (err) {
      console.error("Bulk status update failed:", err);
      throw err;
    }
  };

  return {
    services: serviceSource.map(normalizeService),
    loading,
    error,
    createService,
    updateService,
    deleteService,
    duplicateService,
    bulkDeleteServices,
    bulkUpdateServiceStatus,
    refetch,
  };
}

// ─── DEPLOYMENT GALLERY HOOK ─────────────────────────────────────────────
export function useDeploymentGallery(filters = {}) {
  const queryVariables = {
    search: filters.search || undefined,
    status: toGraphQLStatus(filters.status) || undefined,
    category: filters.category || undefined,
  };

  const deploymentRefetchQueries = [
    { query: GET_ALL_DEPLOYMENTS_QUERY, variables: queryVariables },
    { query: GET_ALL_DEPLOYMENTS_QUERY, variables: {} },
  ];

  const { data, loading, error, refetch } = useQuery(
    GET_ALL_DEPLOYMENTS_QUERY,
    { errorPolicy: "all", variables: queryVariables }
  );

  const [createDeploymentMutation] = useMutation(CREATE_DEPLOYMENT_MUTATION);
  const [updateDeploymentMutation] = useMutation(UPDATE_DEPLOYMENT_MUTATION);
  const [deleteDeploymentMutation] = useMutation(DELETE_DEPLOYMENT_MUTATION);
  const [duplicateDeploymentMutation] = useMutation(DUPLICATE_DEPLOYMENT_MUTATION);
  const [bulkDeleteDeploymentsMutation] = useMutation(BULK_DELETE_DEPLOYMENT_MUTATION);
  const [bulkUpdateDeploymentStatusMutation] = useMutation(
    BULK_UPDATE_DEPLOYMENT_STATUS_MUTATION
  );

  const createDeployment = async (input) => {
    try {
      const mappedInput = mapStatusInInput(input);
      const res = await createDeploymentMutation({
        variables: { input: mappedInput },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeDeployment(res.data?.createDeployment) || null;
    } catch (err) {
      console.error("Create deployment failed:", err);
      throw err;
    }
  };

  const updateDeployment = async (input) => {
    try {
      const currentDeployments = data?.getAllDeployments || [];
      const currentDeployment = currentDeployments.find(
        (d) => d.deploymentId === input.deploymentId
      );
      const mappedInput = mapStatusInInput(input);

      const res = await updateDeploymentMutation({
        variables: { input: mappedInput },
        optimisticResponse: {
          updateDeployment: {
            ...currentDeployment,
            ...input,
            status: input.status
              ? fromGraphQLStatus(mappedInput.status)
              : currentDeployment?.status,
            __typename: "DeploymentGalleryTbl",
          },
        },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeDeployment(res.data?.updateDeployment) || null;
    } catch (err) {
      console.error("Update deployment failed:", err);
      throw err;
    }
  };

  const deleteDeployment = async (deploymentId) => {
    try {
      await deleteDeploymentMutation({
        variables: { deploymentId },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return true;
    } catch (err) {
      console.error("Delete deployment failed:", err);
      throw err;
    }
  };

  const duplicateDeployment = async (deploymentId) => {
    try {
      const res = await duplicateDeploymentMutation({
        variables: { deploymentId },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return normalizeDeployment(res.data?.duplicateDeployment) || null;
    } catch (err) {
      console.error("Duplicate deployment failed:", err);
      throw err;
    }
  };

  const bulkDeleteDeployments = async (deploymentIds) => {
    try {
      await bulkDeleteDeploymentsMutation({
        variables: { deploymentIds },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return true;
    } catch (err) {
      console.error("Bulk delete deployments failed:", err);
      throw err;
    }
  };

  const bulkUpdateDeploymentStatus = async (deploymentIds, status) => {
    try {
      const res = await bulkUpdateDeploymentStatusMutation({
        variables: { deploymentIds, status: toGraphQLStatus(status) },
        refetchQueries: deploymentRefetchQueries,
        awaitRefetchQueries: true,
      });
      return (res.data?.bulkUpdateDeploymentStatus || []).map(
        normalizeDeployment
      );
    } catch (err) {
      console.error("Bulk update deployment status failed:", err);
      throw err;
    }
  };

  return {
    deployments: (data?.getAllDeployments || []).map(normalizeDeployment),
    loading,
    error,
    createDeployment,
    updateDeployment,
    deleteDeployment,
    duplicateDeployment,
    bulkDeleteDeployments,
    bulkUpdateDeploymentStatus,
    refetch,
  };
}

// ─── COMPANY INFO HOOK ───────────────────────────────────────────────────
export function useCompanyInfo() {
  const { data, loading, error, refetch } = useQuery(GET_COMPANY_INFO_QUERY, {
    errorPolicy: "all",
  });

  const [updateCompanyInfoMutation] = useMutation(UPDATE_COMPANY_INFO_MUTATION);

  const updateCompanyInfo = async (updates) => {
    try {
      const currentInfo = data?.getCompanyInfo;

      if (!currentInfo) {
        console.error("Company info not found");
        throw new Error("Company info not found. Please create it first.");
      }

      const res = await updateCompanyInfoMutation({
        variables: { input: updates },
        optimisticResponse: {
          updateCompanyInfo: {
            ...currentInfo,
            ...updates,
            __typename: "CompanyInfoTbl",
          },
        },
      });
      return res.data?.updateCompanyInfo || null;
    } catch (err) {
      console.error("Update company info failed:", err);
      throw err;
    }
  };

  return {
    companyInfo: data?.getCompanyInfo || null,
    loading,
    error,
    updateCompanyInfo,
    refetch,
  };
}
