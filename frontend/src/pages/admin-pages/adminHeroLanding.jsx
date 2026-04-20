import { useState, useEffect, useCallback } from "react";
import { useHeroSection } from "../../hooks/useLandingPageData";
import { ImageUpload } from "../../components/landing-page/image-upload";
import { TextInput, TextArea } from "../../components/admin-ui/field";
import {
  Type,
  FileText,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ImageOff,
  Info,
  Loader2,
  Video,
} from "lucide-react";
import { toastError, toastInfo, toastSuccess } from "../../services/admin-service/adminToast";

function isVideoSource(src = "") {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

export function AdminHeroLanding() {
  const { hero, loading, updateHero } = useHeroSection();
  const [formData, setFormData] = useState({
    headline: "",
    focusText: "",
    tagline: "",
    backgroundImage: "",
  });
  const [savedSnapshot, setSavedSnapshot] = useState({
    headline: "",
    focusText: "",
    tagline: "",
    backgroundImage: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState({
    status: "idle",
    field: "",
    message: "Changes auto-save when you leave a field.",
    lastSavedAt: null,
  });

  const fieldLabels = {
    headline: "headline",
    focusText: "focus text",
    tagline: "tagline",
    backgroundImage: "background image",
  };

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

	const isActive = !!hero?.headline;
	const hasImage = !!formData.backgroundImage;
  const isVideo = isVideoSource(formData.backgroundImage);
	const headlineLength = (formData.headline || "").length;
  const focusLength = (formData.focusText || "").length;
	const lastUpdated = hero?.updatedAt
		? new Date(hero.updatedAt).toLocaleDateString()
		: "N/A";

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

  const handleImageUpload = (imagePath) => {
    setFormData((prev) => ({
      ...prev,
      backgroundImage: imagePath,
    }));
    // Auto-save on image upload
    handleSaveOnBlur("backgroundImage", imagePath);
  };

  const handleSaveOnBlur = async (fieldName, value) => {
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
  };

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

  if (loading) {
    return (
      <div className="p-6" style={{ color: "var(--muted-foreground)" }}>Loading hero section...</div>
    );
  }

  return (
    <div className="admin-page-shell admin-hero-page">
      <div className="p-6 flex flex-col gap-5 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Hero Section</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Edit your landing page hero content
        </p>
      </div>

      <div
        className="flex items-center justify-between gap-3 text-sm rounded-lg p-3"
        style={{
          background:
            saveState.status === "saving"
              ? "#eff6ff"
              : saveState.status === "saved"
              ? "#ecfdf5"
              : saveState.status === "error"
              ? "#fef2f2"
              : "var(--accent)",
          color:
            saveState.status === "saving"
              ? "#1d4ed8"
              : saveState.status === "saved"
              ? "#166534"
              : saveState.status === "error"
              ? "#b91c1c"
              : "var(--foreground)",
          border: "1px solid var(--border)",
        }}
      >
        {saveState.status === "saving" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {saveState.status === "saved" && <CheckCircle2 size={16} />}
        {saveState.status === "error" && <AlertCircle size={16} />}
        {saveState.status === "idle" && <Info size={16} />}
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex flex-col">
            <span>{saveState.message}</span>
            {saveState.lastSavedAt && (
              <span style={{ fontSize: "12px", opacity: 0.85 }}>
                Last saved at {new Date(saveState.lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isDirty ? (
              <>
                <button
                  type="button"
                  onClick={handleDiscardChanges}
                  disabled={isSaving}
                  title="Discard all unsaved edits"
                  className="h-9 px-3 rounded-lg border text-sm font-medium transition"
                  style={{
                    borderColor: "var(--border, #cbd5e1)",
                    background: "var(--background, #ffffff)",
                    color: "var(--foreground, #0f172a)",
                    opacity: isSaving ? 0.55 : 1,
                    cursor: isSaving ? "not-allowed" : "pointer",
                  }}
                >
                  Discard Unsaved
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  title="Save all unsaved edits"
                  className="h-9 px-3 rounded-lg text-sm font-semibold transition"
                  style={{
                    background: "var(--primary, #0f172a)",
                    color: "var(--primary-foreground, #ffffff)",
                    border: "1px solid var(--primary, #0f172a)",
                    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.14)",
                    opacity: isSaving ? 0.55 : 1,
                    cursor: isSaving ? "not-allowed" : "pointer",
                  }}
                >
                  {isSaving
                    ? "Saving..."
                    : `Save ${dirtyCount} Unsaved`}
                </button>
              </>
            ) : (
              <div
                className="h-9 px-3 rounded-lg border flex items-center gap-2 text-sm font-medium"
                style={{
                  borderColor: "var(--border, #cbd5e1)",
                  background: "var(--background, #ffffff)",
                  color: "var(--muted-foreground, #64748b)",
                }}
              >
                <CheckCircle2 size={14} />
                All changes saved
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Status</p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {isActive ? "Active" : "Inactive"}
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "#f8fafc", color: "var(--foreground)" }}
          >
            {isActive ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Last Updated</p>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--foreground)",
                lineHeight: 1.2,
              }}
            >
              {lastUpdated}
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "#f8fafc", color: "var(--foreground)" }}
          >
            <Clock size={18} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Headline length</p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {headlineLength} chars
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "#f8fafc", color: "var(--foreground)" }}
          >
            <Type size={18} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Focus text length</p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {focusLength} chars
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "#f8fafc", color: "var(--foreground)" }}
          >
            <FileText size={18} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Background media</p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {hasImage ? (isVideo ? "Video" : "Image") : "Not set"}
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "#f8fafc", color: "var(--foreground)" }}
          >
            {hasImage ? (isVideo ? <Video size={18} /> : <ImageIcon size={18} />) : <ImageOff size={18} />}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="admin-surface-card overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          {/* Left: Hero form fields inside a slightly darker card so white inputs stand out */}
          <div className="flex-1">
            <div
              className="rounded-lg border shadow-sm p-6 space-y-6"
              style={{ backgroundColor: "#f8fafc", borderColor: "var(--border)" }}
            >
            <div className="admin-section-panel space-y-6">
              {/* Headline Card */}
              <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                  <Type size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Headline</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Main hero lines (use Enter to split into two lines)</p>
                </div>
              </div>
              <TextArea
                value={formData.headline}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, headline: val }))
                }
                onBlur={() => handleSaveOnBlur("headline")}
                placeholder={"Scalable Tech Solutions\nBuilt for your"}
                rows={2}
                disabled={isSaving}
              />
              </div>

              {/* Tagline Card */}
              <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Tagline</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Supporting text for the hero</p>
                </div>
              </div>
              <TextArea
                value={formData.tagline}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, tagline: val }))
                }
                onBlur={() => handleSaveOnBlur("tagline")}
                placeholder="Enter your hero tagline or subtitle..."
                rows={4}
                disabled={isSaving}
              />
              </div>

              {/* Focus Text Card */}
              <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                  <FileText size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Focus Text</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Animated words in hero headline</p>
                </div>
              </div>
              <TextInput
                value={formData.focusText}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, focusText: val }))
                }
                onBlur={() => handleSaveOnBlur("focusText")}
                placeholder="BUSINESS SUCCESS"
                disabled={isSaving}
              />
              </div>
            </div>

            <div className="admin-section-panel space-y-6">
              {/* Background Image Card */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Background Media</h3>
                    <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Hero section background image or video</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {formData.backgroundImage && (
                    <div
                      className="relative w-full h-40 rounded-xl overflow-hidden"
                      style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
                    >
                      {isVideo ? (
                        <video
                          src={`http://localhost:3000${formData.backgroundImage}`}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={`http://localhost:3000${formData.backgroundImage}`}
                          alt="Hero background"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  <ImageUpload
                    onUpload={handleImageUpload}
                    disabled={isSaving}
                    accept="image/*,video/*"
                    buttonLabel="Click to upload image or video"
                    busyLabel="Uploading media..."
                    ariaLabel="Upload background media"
                    fileTypeLabel="image or video"
                  />
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="w-full lg:w-5/12">
            {/* Outer card shell to match Settings/Services cards */}
            <div
              className="h-full rounded-lg border shadow-sm overflow-hidden"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "var(--border)",
              }}
            >
              {/* Inner actual hero preview with dark gradient */}
              <div
                className="h-full"
                style={{
                  background: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
              <div className="relative h-64 flex items-center">
                {formData.backgroundImage && (
                  isVideo ? (
                    <video
                      src={`http://localhost:3000${formData.backgroundImage}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={`http://localhost:3000${formData.backgroundImage}`}
                      alt="Hero background preview"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: formData.backgroundImage
                      ? "linear-gradient(to bottom, rgba(3,2,19,0.15), rgba(3,2,19,0.85))"
                      : "var(--primary)",
                    opacity: 1,
                  }}
                />
                <div className="relative w-full px-6 py-5 space-y-3">
                  <p
                    style={{
                      fontSize: "12px",
                      letterSpacing: 0.05,
                      textTransform: "uppercase",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Hero preview
                  </p>
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      color: "var(--primary-foreground)",
                    }}
                  >
                    {formData.headline || "Your headline will appear here"}
                    <br />
                    {formData.focusText || "BUSINESS SUCCESS"}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--primary-foreground)",
                      opacity: 0.9,
                    }}
                  >
                    {formData.tagline ||
                      "Use this area to preview how your landing page hero copy will look to visitors."}
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}

export default AdminHeroLanding;
