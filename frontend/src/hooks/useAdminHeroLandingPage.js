import { useState, useEffect, useCallback } from "react";
import { useHeroSection } from "./useLandingPageData";
import { useHeroLandingStats } from "./useHeroLandingStats";
import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../services/admin-service/adminToast";

const INITIAL_FORM_DATA = {
  headline: "",
  focusText: "",
  tagline: "",
  backgroundImage: "",
};

const INITIAL_SAVE_STATE = {
  status: "idle",
  field: "",
  message: "Changes auto-save when you leave a field.",
  lastSavedAt: null,
};

const fieldLabels = {
  headline: "headline",
  focusText: "focus text",
  tagline: "tagline",
  backgroundImage: "background image",
};

export function useAdminHeroLandingPage() {
  const { hero, loading, updateHero } = useHeroSection();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [savedSnapshot, setSavedSnapshot] = useState(INITIAL_FORM_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState(INITIAL_SAVE_STATE);

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
    if (hero) {
      const nextSnapshot = {
        headline: hero.headline || "",
        focusText: hero.focusText || "",
        tagline: hero.tagline || "",
        backgroundImage: hero.backgroundImage || "",
      };

      setFormData(nextSnapshot);
      setSavedSnapshot(nextSnapshot);
      setSaveState((prev) => ({
        ...prev,
        status: "idle",
        field: "",
        message: "Changes auto-save when you leave a field.",
        lastSavedAt: hero.updatedAt ? new Date(hero.updatedAt) : prev.lastSavedAt,
      }));
    }
  }, [hero]);

  const handleSaveOnBlur = useCallback(
    async (fieldName, value) => {
      if (!hero?.heroId) return;

      const nextValue = value || formData[fieldName] || "";
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

        await updateHero({
          heroId: hero.heroId,
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
        toastSuccess("Updated successfully", "Hero content updated.");
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
    [formData, hero?.heroId, savedSnapshot, updateHero]
  );

  const handleSaveAll = useCallback(async () => {
    if (!hero?.heroId) return;

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

      await updateHero({
        heroId: hero.heroId,
        ...dirtyPayload,
      });

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
      toastSuccess("Updated successfully", "Hero content updated.");
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
  }, [getDirtyPayload, hero?.heroId, savedSnapshot, updateHero]);

  const handleDiscardChanges = useCallback(() => {
    setFormData(savedSnapshot);
    setSaveState((prev) => ({
      ...prev,
      status: "idle",
      field: "",
      message: "Unsaved edits were discarded.",
    }));
    toastInfo("Changes discarded", "Unsaved hero edits were removed.");
  }, [savedSnapshot]);

  const handleImageUpload = useCallback(
    (imagePath) => {
      setFormData((prev) => ({
        ...prev,
        backgroundImage: imagePath,
      }));
      handleSaveOnBlur("backgroundImage", imagePath);
    },
    [handleSaveOnBlur]
  );

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

  const stats = useHeroLandingStats({ hero, formData });

  return {
    loading,
    formData,
    isSaving,
    saveState,
    isDirty,
    dirtyCount,
    stats,
    setFormData,
    handleSaveOnBlur,
    handleSaveAll,
    handleDiscardChanges,
    handleImageUpload,
  };
}
