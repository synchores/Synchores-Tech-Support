import { useState, useEffect, useCallback } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useCompanyInfo } from "../../hooks/useLandingPageData";
import { SectionCard } from "../../components/admin-ui/section-card";
import { Field, TextInput, TextArea } from "../../components/admin-ui/field";

export function AdminCompanySettings() {
  const { companyInfo, loading, updateCompanyInfo } = useCompanyInfo();
  const [formData, setFormData] = useState({
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
  });
  const [savedSnapshot, setSavedSnapshot] = useState({
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
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState({
    status: "idle",
    field: "",
    message: "Changes auto-save when you leave a field.",
    lastSavedAt: null,
  });

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

  const handleSaveOnBlur = async (fieldName) => {
    if (!companyInfo?.infoId) return;

    const nextValue = formData[fieldName] || "";
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
    } catch (error) {
      console.error("Save failed:", error);
      // Revert on error
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
    } finally {
      setIsSaving(false);
    }
  };

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
    return <div className="p-6" style={{ color: "var(--muted-foreground)" }}>Loading company settings...</div>;
  }

  if (!companyInfo) {
    return <div className="p-6" style={{ color: "var(--destructive)" }}>Company info not found</div>;
  }

  return (
    <div className="admin-page-shell">
      <div className="p-6 flex flex-col gap-5 max-w-6xl mx-auto">
      <div className="admin-surface-card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Company Settings</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Manage your company information and contact details
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

        {/* Contact Information Section */}
        <div className="admin-section-panel">
				<SectionCard
        title="Contact Information"
        subtitle="Phone numbers, email, and address"
        collapsible={true}
        defaultOpen={true}
      >
        <div className="space-y-5">
          <Field label="Main Phone Number" hint="Primary business phone">
            <TextInput
              value={formData.phoneMain}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, phoneMain: val }))
              }
              onBlur={() => handleSaveOnBlur("phoneMain")}
              placeholder="e.g., (046) 884 6572"
              disabled={isSaving}
            />
          </Field>

          <Field label="Mobile Phone" hint="Mobile contact number">
            <TextInput
              value={formData.phoneMobile}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, phoneMobile: val }))
              }
              onBlur={() => handleSaveOnBlur("phoneMobile")}
              placeholder="e.g., +63 977 322 3796"
              disabled={isSaving}
            />
          </Field>

          <Field label="Email Address" hint="Main company email">
            <TextInput
              type="email"
              value={formData.email}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, email: val }))
              }
              onBlur={() => handleSaveOnBlur("email")}
              placeholder="e.g., info@synchores.com"
              disabled={isSaving}
            />
          </Field>

          <Field label="Address" hint="Full company address">
            <TextArea
              value={formData.address}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, address: val }))
              }
              onBlur={() => handleSaveOnBlur("address")}
              placeholder="Enter your full company address"
              rows={3}
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

        {/* About Section */}
          <div className="admin-section-panel">
        <SectionCard
        title="About Us"
        subtitle="Company description and mission"
        collapsible={true}
        defaultOpen={true}
      >
        <Field label="About Text" hint="Tell visitors about your company">
          <TextArea
            value={formData.aboutText}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, aboutText: val }))
            }
            onBlur={() => handleSaveOnBlur("aboutText")}
            placeholder="Share your company's story, mission, and values here..."
            rows={5}
            disabled={isSaving}
          />
        </Field>
      </SectionCard>
          </div>

        {/* "What We Do" Section */}
          <div className="admin-section-panel">
        <SectionCard
        title="What We Do"
        subtitle="Homepage overview copy"
        collapsible={true}
        defaultOpen={true}
      >
        <div className="space-y-5">
          <Field label="Section Title" hint="Heading shown above this section">
            <TextInput
              value={formData.whatWeDoTitle}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, whatWeDoTitle: val }))
              }
              onBlur={() => handleSaveOnBlur("whatWeDoTitle")}
              placeholder="What We Do"
              disabled={isSaving}
            />
          </Field>

          <Field
            label="First Paragraph"
            hint="Introductory text explaining what your company does"
          >
            <TextArea
              value={formData.whatWeDoParagraph1}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  whatWeDoParagraph1: val,
                }))
              }
              onBlur={() => handleSaveOnBlur("whatWeDoParagraph1")}
              placeholder="We deliver tailored digital solutions that help small and medium enterprises thrive..."
              rows={4}
              disabled={isSaving}
            />
          </Field>

          <Field
            label="Second Paragraph"
            hint="Optional supporting paragraph"
          >
            <TextArea
              value={formData.whatWeDoParagraph2}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  whatWeDoParagraph2: val,
                }))
              }
              onBlur={() => handleSaveOnBlur("whatWeDoParagraph2")}
              placeholder="We implement secure, scalable technologies—from networking and cloud systems to AI-powered workflows..."
              rows={4}
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

        {/* Social Media Section */}
          <div className="admin-section-panel">
        <SectionCard
        title="Social Media Links"
        subtitle="Connect with your audience"
        collapsible={true}
        defaultOpen={true}
      >
        <div className="space-y-5">
          <Field label="Facebook URL" hint="Your Facebook business page">
            <TextInput
              type="url"
              value={formData.facebookUrl}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, facebookUrl: val }))
              }
              onBlur={() => handleSaveOnBlur("facebookUrl")}
              placeholder="https://facebook.com/synchores"
              disabled={isSaving}
            />
          </Field>

          <Field label="Instagram URL" hint="Your Instagram business profile">
            <TextInput
              type="url"
              value={formData.instagramUrl}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, instagramUrl: val }))
              }
              onBlur={() => handleSaveOnBlur("instagramUrl")}
              placeholder="https://instagram.com/synchores"
              disabled={isSaving}
            />
          </Field>

          <Field label="YouTube URL" hint="Your YouTube channel">
            <TextInput
              type="url"
              value={formData.youtubeUrl}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, youtubeUrl: val }))
              }
              onBlur={() => handleSaveOnBlur("youtubeUrl")}
              placeholder="https://youtube.com/synchores"
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

      </div>
      </div>
    </div>
  );
}

export default AdminCompanySettings;
