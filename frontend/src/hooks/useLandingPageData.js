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
  CREATE_DEPLOYMENT_MUTATION,
  UPDATE_DEPLOYMENT_MUTATION,
  DELETE_DEPLOYMENT_MUTATION,
  UPDATE_COMPANY_INFO_MUTATION,
} from "../services/admin-service/landingPageMutations";

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
export function useLandingServices() {
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_LANDING_SERVICES_QUERY,
    { errorPolicy: "all" }
  );

  const [createCardMutation] = useMutation(
    CREATE_LANDING_SERVICE_CARD_MUTATION
  );
  const [updateCardMutation] = useMutation(
    UPDATE_LANDING_SERVICE_CARD_MUTATION
  );
  const [deleteCardMutation] = useMutation(
    DELETE_LANDING_SERVICE_CARD_MUTATION
  );

  const createService = async (input) => {
    try {
      const res = await createCardMutation({
        variables: { input },
        refetchQueries: [{ query: GET_ALL_LANDING_SERVICES_QUERY }],
      });
      return res.data?.createLandingServiceCard || null;
    } catch (err) {
      console.error("Create service card failed:", err);
      throw err;
    }
  };

  const updateService = async (input) => {
    try {
      const currentServices = data?.getAllLandingServiceCards || [];
      const currentService = currentServices.find(
        (s) => s.cardId === input.cardId
      );

      const res = await updateCardMutation({
        variables: { input },
        optimisticResponse: {
          updateLandingServiceCard: {
            ...currentService,
            ...input,
            __typename: "LandingServiceCardTbl",
          },
        },
      });
      return res.data?.updateLandingServiceCard || null;
    } catch (err) {
      console.error("Update service card failed:", err);
      throw err;
    }
  };

  const deleteService = async (cardId) => {
    try {
      await deleteCardMutation({
        variables: { cardId },
        refetchQueries: [{ query: GET_ALL_LANDING_SERVICES_QUERY }],
      });
      return true;
    } catch (err) {
      console.error("Delete service card failed:", err);
      throw err;
    }
  };

  return {
    services: data?.getAllLandingServiceCards || [],
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch,
  };
}

// ─── DEPLOYMENT GALLERY HOOK ─────────────────────────────────────────────
export function useDeploymentGallery() {
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_DEPLOYMENTS_QUERY,
    { errorPolicy: "all" }
  );

  const [createDeploymentMutation] = useMutation(CREATE_DEPLOYMENT_MUTATION);
  const [updateDeploymentMutation] = useMutation(UPDATE_DEPLOYMENT_MUTATION);
  const [deleteDeploymentMutation] = useMutation(DELETE_DEPLOYMENT_MUTATION);

  const createDeployment = async (input) => {
    try {
      const res = await createDeploymentMutation({
        variables: { input },
        refetchQueries: [{ query: GET_ALL_DEPLOYMENTS_QUERY }],
      });
      return res.data?.createDeployment || null;
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

      const res = await updateDeploymentMutation({
        variables: { input },
        optimisticResponse: {
          updateDeployment: {
            ...currentDeployment,
            ...input,
            __typename: "DeploymentGalleryTbl",
          },
        },
      });
      return res.data?.updateDeployment || null;
    } catch (err) {
      console.error("Update deployment failed:", err);
      throw err;
    }
  };

  const deleteDeployment = async (deploymentId) => {
    try {
      await deleteDeploymentMutation({
        variables: { deploymentId },
        refetchQueries: [{ query: GET_ALL_DEPLOYMENTS_QUERY }],
      });
      return true;
    } catch (err) {
      console.error("Delete deployment failed:", err);
      throw err;
    }
  };

  return {
    deployments: data?.getAllDeployments || [],
    loading,
    error,
    createDeployment,
    updateDeployment,
    deleteDeployment,
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
