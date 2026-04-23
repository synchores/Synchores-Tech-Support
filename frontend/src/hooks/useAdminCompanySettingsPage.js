import { useState, useEffect, useCallback } from "react";
import { useCompanyInfo } from "./useLandingPageData";
import { toastError, toastInfo, toastSuccess } from "../services/admin-service/adminToast";
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

export const COMPANY_SETTINGS_SECTIONS = [
  "contactInfo",
  "about",
  "aboutPresentation",
  "missionValues",
  "brandingMedia",
  "whatWeDo",
  "socialLinks",
];

const INITIAL_FORM_DATA = {
  address: "",
  phoneMain: "",
  phoneMobile: "",
  email: "",
  aboutText: "",
  whatWeDoTitle: "",
  whatWeDoParagraph1: "",
  whatWeDoParagraph2: "",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  aboutEyebrow: "",
  aboutHeading: "",
  aboutParagraph2: "",
  aboutImage1: "",
  aboutImage2: "",
  aboutImage1Alt: "",
  aboutImage2Alt: "",
  missionLabel: "",
  missionStatement: "",
  valuesLabel: "",
  valuesStatement: "",
  commitmentEyebrow: "",
  commitmentHeading: "",
  commitmentStatement: "",
  footerBrandText: "",
  companyLogo: "",
  companyLogoAlt: "",
  contactEyebrow: "",
  contactHeading: "",
  contactIntroText: "",
  contactBgImage: "",
  contactBgImageAlt: "",
};

const ALL_SECTIONS_COLLAPSED = COMPANY_SETTINGS_SECTIONS.reduce((acc, sectionId) => {
  acc[sectionId] = false;
  return acc;
}, {});

const fieldLabels = {
  address: "address",
  phoneMain: "main phone",
  phoneMobile: "mobile phone",
  email: "email",
  aboutText: "about text",
  whatWeDoTitle: "What We Do title",
  whatWeDoParagraph1: "first paragraph",
  whatWeDoParagraph2: "second paragraph",
  facebookUrl: "Facebook URL",
  instagramUrl: "Instagram URL",
  youtubeUrl: "YouTube URL",
  aboutEyebrow: "about section label",
  aboutHeading: "about section heading",
  aboutParagraph2: "about second paragraph",
  aboutImage1: "about main image",
  aboutImage2: "about alternate image",
  aboutImage1Alt: "about main image alt text",
  aboutImage2Alt: "about alternate image alt text",
  missionLabel: "mission label",
  missionStatement: "mission statement",
  valuesLabel: "values label",
  valuesStatement: "values statement",
  commitmentEyebrow: "commitment section label",
  commitmentHeading: "commitment section heading",
  commitmentStatement: "commitment statement",
  footerBrandText: "footer brand text",
  companyLogo: "company logo",
  companyLogoAlt: "company logo alt text",
  contactEyebrow: "contact section label",
  contactHeading: "contact section heading",
  contactIntroText: "contact intro text",
  contactBgImage: "contact background image",
  contactBgImageAlt: "contact background image alt text",
};

export function useAdminCompanySettingsPage() {
  const { companyInfo, loading, updateCompanyInfo } = useCompanyInfo();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [savedSnapshot, setSavedSnapshot] = useState(INITIAL_FORM_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState({
    status: "idle",
    field: "",
    message: "Changes auto-save when you leave a field.",
    lastSavedAt: null,
  });
  const [sectionOpen, setSectionOpen] = useState(ALL_SECTIONS_COLLAPSED);

  const isDirty = Object.keys(formData).some(
    (key) => (formData[key] || "") !== (savedSnapshot[key] || "")
  );

  const dirtyCount = Object.keys(formData).filter(
    (key) => (formData[key] || "") !== (savedSnapshot[key] || "")
  ).length;

  const getDirtyPayload = useCallback(() => {
    return Object.keys(formData).reduce((acc, key) => {
      const nextValue = formData[key] || "";
      const previousValue = savedSnapshot[key] || "";

      if (nextValue !== previousValue) {
        acc[key] = nextValue;
      }

      return acc;
    }, {});
  }, [formData, savedSnapshot]);

  useEffect(() => {
    if (companyInfo) {
      const nextSnapshot = {
        address: companyInfo.address || "",
        phoneMain: companyInfo.phoneMain || "",
        phoneMobile: companyInfo.phoneMobile || "",
        email: companyInfo.email || "",
        aboutText: companyInfo.aboutText || "",
        whatWeDoTitle: companyInfo.whatWeDoTitle || "",
        whatWeDoParagraph1: companyInfo.whatWeDoParagraph1 || "",
        whatWeDoParagraph2: companyInfo.whatWeDoParagraph2 || "",
        facebookUrl: companyInfo.facebookUrl || "",
        instagramUrl: companyInfo.instagramUrl || "",
        youtubeUrl: companyInfo.youtubeUrl || "",
        aboutEyebrow: companyInfo.aboutEyebrow || "",
        aboutHeading: companyInfo.aboutHeading || "",
        aboutParagraph2: companyInfo.aboutParagraph2 || "",
        aboutImage1: companyInfo.aboutImage1 || "",
        aboutImage2: companyInfo.aboutImage2 || "",
        aboutImage1Alt: companyInfo.aboutImage1Alt || "",
        aboutImage2Alt: companyInfo.aboutImage2Alt || "",
        missionLabel: companyInfo.missionLabel || "",
        missionStatement: companyInfo.missionStatement || "",
        valuesLabel: companyInfo.valuesLabel || "",
        valuesStatement: companyInfo.valuesStatement || "",
        commitmentEyebrow: companyInfo.commitmentEyebrow || "",
        commitmentHeading: companyInfo.commitmentHeading || "",
        commitmentStatement: companyInfo.commitmentStatement || "",
        footerBrandText: companyInfo.footerBrandText || "",
        companyLogo: companyInfo.companyLogo || "",
        companyLogoAlt: companyInfo.companyLogoAlt || "",
        contactEyebrow: companyInfo.contactEyebrow || "",
        contactHeading: companyInfo.contactHeading || "",
        contactIntroText: companyInfo.contactIntroText || "",
        contactBgImage: companyInfo.contactBgImage || "",
        contactBgImageAlt: companyInfo.contactBgImageAlt || "",
      };

      setFormData(nextSnapshot);
      setSavedSnapshot(nextSnapshot);
      setSaveState((prev) => ({
        ...prev,
        status: "idle",
        field: "",
        message: "Changes auto-save when you leave a field.",
        lastSavedAt: companyInfo.updatedAt ? new Date(companyInfo.updatedAt) : prev.lastSavedAt,
      }));
    }
  }, [companyInfo]);

  const handleFieldChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  const handleSaveOnBlur = useCallback(
    async (fieldName, explicitValue) => {
      if (!companyInfo?.infoId) return;

      const nextValue = explicitValue ?? formData[fieldName] ?? "";
      const previousValue = savedSnapshot[fieldName] || "";

      if (nextValue === previousValue) return;

      try {
        setIsSaving(true);
        setSaveState((prev) => ({
          ...prev,
          status: "saving",
          field: fieldName,
          message: `Saving ${fieldLabels[fieldName] || "changes"}...`,
        }));

        await updateCompanyInfo({
          [fieldName]: nextValue,
        });

        const savedAt = new Date();
        setSavedSnapshot((prev) => ({
          ...prev,
          [fieldName]: nextValue,
        }));
        setSaveState((prev) => ({
          ...prev,
          status: "saved",
          field: fieldName,
          message: `${fieldLabels[fieldName] || "Field"} saved.`,
          lastSavedAt: savedAt,
        }));
        toastSuccess("Updated successfully", "Company settings updated.");
      } catch (error) {
        console.error("Save failed:", error);
        setFormData((prev) => ({
          ...prev,
          [fieldName]: savedSnapshot[fieldName] || "",
        }));
        setSaveState((prev) => ({
          ...prev,
          status: "error",
          field: fieldName,
          message: `Failed to save ${fieldLabels[fieldName] || "this field"}. Please try again.`,
        }));
        toastError(error, "Update failed");
      } finally {
        setIsSaving(false);
      }
    },
    [companyInfo?.infoId, formData, savedSnapshot, updateCompanyInfo]
  );

  const getPreviewUrl = useCallback((path) => {
    if (!path) return "";
    if (path.startsWith("/uploads/")) {
      return `${IMAGE_URL}${path}`;
    }
    return path;
  }, []);

  const handleImageUploadField = useCallback(
    (fieldName) => (uploadedPath) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: uploadedPath,
      }));
      handleSaveOnBlur(fieldName, uploadedPath);
    },
    [handleSaveOnBlur]
  );

  const setAllSections = useCallback((nextOpen) => {
    setSectionOpen(
      COMPANY_SETTINGS_SECTIONS.reduce((acc, sectionId) => {
        acc[sectionId] = nextOpen;
        return acc;
      }, {})
    );
  }, []);

  const handleSectionToggle = useCallback((sectionId, nextOpen) => {
    setSectionOpen((prev) => ({
      ...prev,
      [sectionId]: nextOpen,
    }));
  }, []);

  const openSectionCount = COMPANY_SETTINGS_SECTIONS.filter(
    (sectionId) => !!sectionOpen[sectionId]
  ).length;

  const handleSaveAll = useCallback(async () => {
    if (!companyInfo?.infoId) return;

    const dirtyPayload = getDirtyPayload();
    if (Object.keys(dirtyPayload).length === 0) return;

    try {
      setIsSaving(true);
      setSaveState((prev) => ({
        ...prev,
        status: "saving",
        field: "",
        message: "Saving all changes...",
      }));

      await updateCompanyInfo(dirtyPayload);

      const savedAt = new Date();
      setSavedSnapshot((prev) => ({
        ...prev,
        ...dirtyPayload,
      }));
      setSaveState((prev) => ({
        ...prev,
        status: "saved",
        field: "",
        message: "All changes saved.",
        lastSavedAt: savedAt,
      }));
      toastSuccess("Updated successfully", "Company settings updated.");
    } catch (error) {
      console.error("Save all failed:", error);
      setFormData((prev) => ({
        ...prev,
        ...savedSnapshot,
      }));
      setSaveState((prev) => ({
        ...prev,
        status: "error",
        field: "",
        message: "Failed to save all changes. Please try again.",
      }));
      toastError(error, "Update failed");
    } finally {
      setIsSaving(false);
    }
  }, [companyInfo?.infoId, getDirtyPayload, savedSnapshot, updateCompanyInfo]);

  const handleDiscardChanges = useCallback(() => {
    setFormData(savedSnapshot);
    setSaveState((prev) => ({
      ...prev,
      status: "idle",
      field: "",
      message: "Unsaved edits were discarded.",
    }));
    toastInfo("Changes discarded", "Unsaved company edits were removed.");
  }, [savedSnapshot]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (!isSaving && isDirty) {
          handleSaveAll();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSaveAll, isDirty, isSaving]);

  return {
    companyInfo,
    loading,
    formData,
    setFormData,
    savedSnapshot,
    isSaving,
    saveState,
    sectionOpen,
    isDirty,
    dirtyCount,
    openSectionCount,
    fieldLabels,
    handleFieldChange,
    handleSaveOnBlur,
    getPreviewUrl,
    handleImageUploadField,
    setAllSections,
    handleSectionToggle,
    handleSaveAll,
    handleDiscardChanges,
    getDirtyPayload,
  };
}
