import { useState, useEffect, useCallback } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useCompanyInfo } from "../../hooks/useLandingPageData";
import { SectionCard } from "../../components/admin-ui/section-card";
import { Field, TextInput, TextArea } from "../../components/admin-ui/field";
import { ImageUpload } from "../../components/landing-page/image-upload";
import { toastError, toastInfo, toastSuccess } from "../../services/admin-service/adminToast";

const COMPANY_SETTINGS_SECTIONS = [
  "contactInfo",
  "about",
  "aboutPresentation",
  "missionValues",
  "brandingMedia",
  "whatWeDo",
  "socialLinks",
];

const ALL_SECTIONS_COLLAPSED = COMPANY_SETTINGS_SECTIONS.reduce((acc, sectionId) => {
  acc[sectionId] = false;
  return acc;
}, {});

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
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState({
    status: "idle",
    field: "",
    message: "Changes auto-save when you leave a field.",
    lastSavedAt: null,
  });
  const [sectionOpen, setSectionOpen] = useState(ALL_SECTIONS_COLLAPSED);

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

  const handleSaveOnBlur = async (fieldName, explicitValue) => {
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
      toastError(error, "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  const getPreviewUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("/uploads/")) {
      return `http://localhost:3000${path}`;
    }
    return path;
  };

  const handleImageUploadField = (fieldName) => (uploadedPath) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: uploadedPath,
    }));
    handleSaveOnBlur(fieldName, uploadedPath);
  };

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

          <div className="settings-guidance-card mt-4">
            <p className="settings-guidance-title">How to edit</p>
            <p className="settings-guidance-text">
              All sections are collapsed by default. Click any section header to open only what you want to edit.
            </p>
            <p className="settings-guidance-text">
              Changes auto-save when you leave a field, and you can also use Save Unsaved for batch updates.
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="h-8 px-3 rounded-lg border text-xs font-semibold"
              style={{
                borderColor: "var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
              onClick={() => setAllSections(true)}
            >
              Expand all
            </button>
            <button
              type="button"
              className="h-8 px-3 rounded-lg border text-xs font-semibold"
              style={{
                borderColor: "var(--border)",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
              onClick={() => setAllSections(false)}
            >
              Collapse all
            </button>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {openSectionCount} of {COMPANY_SETTINGS_SECTIONS.length} sections open
            </span>
          </div>
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
        defaultOpen={false}
        open={sectionOpen.contactInfo}
        onOpenChange={(nextOpen) => handleSectionToggle("contactInfo", nextOpen)}
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
        defaultOpen={false}
        open={sectionOpen.about}
        onOpenChange={(nextOpen) => handleSectionToggle("about", nextOpen)}
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

        {/* About Section Presentation */}
          <div className="admin-section-panel">
        <SectionCard
        title="About Section Presentation"
        subtitle="Section labels, headings, and supporting copy"
        collapsible={true}
        defaultOpen={false}
        open={sectionOpen.aboutPresentation}
        onOpenChange={(nextOpen) => handleSectionToggle("aboutPresentation", nextOpen)}
      >
        <div className="space-y-5">
          <Field label="About Eyebrow" hint="Small label above the heading">
            <TextInput
              value={formData.aboutEyebrow}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, aboutEyebrow: val }))
              }
              onBlur={() => handleSaveOnBlur("aboutEyebrow")}
              placeholder="Who We Are"
              disabled={isSaving}
            />
          </Field>

          <Field label="About Heading" hint="Main section heading">
            <TextInput
              value={formData.aboutHeading}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, aboutHeading: val }))
              }
              onBlur={() => handleSaveOnBlur("aboutHeading")}
              placeholder="ABOUT SYNCHORES"
              disabled={isSaving}
            />
          </Field>

          <Field label="About Paragraph 2" hint="Secondary paragraph under the main about text">
            <TextArea
              value={formData.aboutParagraph2}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, aboutParagraph2: val }))
              }
              onBlur={() => handleSaveOnBlur("aboutParagraph2")}
              placeholder="Supporting paragraph for the About section"
              rows={4}
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

        {/* Mission, Values, and Commitment */}
          <div className="admin-section-panel">
        <SectionCard
        title="Mission, Values, and Commitment"
        subtitle="Content for mission card and commitment block"
        collapsible={true}
        defaultOpen={false}
        open={sectionOpen.missionValues}
        onOpenChange={(nextOpen) => handleSectionToggle("missionValues", nextOpen)}
      >
        <div className="space-y-5">
          <Field label="Mission Label" hint="Label above mission statement">
            <TextInput
              value={formData.missionLabel}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, missionLabel: val }))
              }
              onBlur={() => handleSaveOnBlur("missionLabel")}
              placeholder="Our Mission"
              disabled={isSaving}
            />
          </Field>

          <Field label="Mission Statement" hint="Mission quote text">
            <TextArea
              value={formData.missionStatement}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, missionStatement: val }))
              }
              onBlur={() => handleSaveOnBlur("missionStatement")}
              placeholder="Empower organizations through technology..."
              rows={3}
              disabled={isSaving}
            />
          </Field>

          <Field label="Values Label" hint="Label above values statement">
            <TextInput
              value={formData.valuesLabel}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, valuesLabel: val }))
              }
              onBlur={() => handleSaveOnBlur("valuesLabel")}
              placeholder="Our Values"
              disabled={isSaving}
            />
          </Field>

          <Field label="Values Statement" hint="Values quote text">
            <TextArea
              value={formData.valuesStatement}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, valuesStatement: val }))
              }
              onBlur={() => handleSaveOnBlur("valuesStatement")}
              placeholder="Quality, innovation, and reliability..."
              rows={3}
              disabled={isSaving}
            />
          </Field>

          <Field label="Commitment Eyebrow" hint="Small label for commitment panel">
            <TextInput
              value={formData.commitmentEyebrow}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, commitmentEyebrow: val }))
              }
              onBlur={() => handleSaveOnBlur("commitmentEyebrow")}
              placeholder="Why Choose Us"
              disabled={isSaving}
            />
          </Field>

          <Field label="Commitment Heading" hint="Main heading for commitment panel">
            <TextInput
              value={formData.commitmentHeading}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, commitmentHeading: val }))
              }
              onBlur={() => handleSaveOnBlur("commitmentHeading")}
              placeholder="OUR COMMITMENT"
              disabled={isSaving}
            />
          </Field>

          <Field label="Commitment Statement" hint="Body text for commitment panel">
            <TextArea
              value={formData.commitmentStatement}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, commitmentStatement: val }))
              }
              onBlur={() => handleSaveOnBlur("commitmentStatement")}
              placeholder="We implement secure, scalable technologies..."
              rows={4}
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

        {/* Branding and Section Media */}
          <div className="admin-section-panel">
        <SectionCard
        title="Branding and Media"
        subtitle="Images, logo, and contact section copy"
        collapsible={true}
        defaultOpen={false}
        open={sectionOpen.brandingMedia}
        onOpenChange={(nextOpen) => handleSectionToggle("brandingMedia", nextOpen)}
      >
        <div className="space-y-6">
          <Field label="Footer Brand Text" hint="Short company description shown in footer">
            <TextArea
              value={formData.footerBrandText}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, footerBrandText: val }))
              }
              onBlur={() => handleSaveOnBlur("footerBrandText")}
              placeholder="We specialize in delivering customized digital solutions..."
              rows={3}
              disabled={isSaving}
            />
          </Field>

          <Field label="About Main Image" hint="Image for the first About split section">
            <ImageUpload
              onUpload={handleImageUploadField("aboutImage1")}
              disabled={isSaving}
              accept="image/*"
              buttonLabel="Upload About Main Image"
              busyLabel="Uploading image..."
              ariaLabel="Upload about main image"
            />
            {formData.aboutImage1 && (
              <img
                src={getPreviewUrl(formData.aboutImage1)}
                alt={formData.aboutImage1Alt || "About main preview"}
                className="mt-3 w-full h-32 object-cover rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              />
            )}
          </Field>

          <Field label="About Main Image Alt" hint="Accessible alt text for the first About image">
            <TextInput
              value={formData.aboutImage1Alt}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, aboutImage1Alt: val }))
              }
              onBlur={() => handleSaveOnBlur("aboutImage1Alt")}
              placeholder="Synchores team collaborating"
              disabled={isSaving}
            />
          </Field>

          <Field label="About Alternate Image" hint="Image for the second About split section">
            <ImageUpload
              onUpload={handleImageUploadField("aboutImage2")}
              disabled={isSaving}
              accept="image/*"
              buttonLabel="Upload About Alternate Image"
              busyLabel="Uploading image..."
              ariaLabel="Upload about alternate image"
            />
            {formData.aboutImage2 && (
              <img
                src={getPreviewUrl(formData.aboutImage2)}
                alt={formData.aboutImage2Alt || "About alternate preview"}
                className="mt-3 w-full h-32 object-cover rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              />
            )}
          </Field>

          <Field label="About Alternate Image Alt" hint="Accessible alt text for the second About image">
            <TextInput
              value={formData.aboutImage2Alt}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, aboutImage2Alt: val }))
              }
              onBlur={() => handleSaveOnBlur("aboutImage2Alt")}
              placeholder="Synchores consulting session"
              disabled={isSaving}
            />
          </Field>

          <Field label="Company Logo" hint="Logo used in footer brand and copyright bar">
            <ImageUpload
              onUpload={handleImageUploadField("companyLogo")}
              disabled={isSaving}
              accept="image/*"
              buttonLabel="Upload Company Logo"
              busyLabel="Uploading logo..."
              ariaLabel="Upload company logo"
            />
            {formData.companyLogo && (
              <img
                src={getPreviewUrl(formData.companyLogo)}
                alt={formData.companyLogoAlt || "Company logo preview"}
                className="mt-3 w-20 h-20 object-contain rounded-lg border bg-white"
                style={{ borderColor: "var(--border)" }}
              />
            )}
          </Field>

          <Field label="Company Logo Alt" hint="Accessible alt text for footer logo">
            <TextInput
              value={formData.companyLogoAlt}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, companyLogoAlt: val }))
              }
              onBlur={() => handleSaveOnBlur("companyLogoAlt")}
              placeholder="Synchores logo"
              disabled={isSaving}
            />
          </Field>

          <Field label="Contact Eyebrow" hint="Label above contact heading">
            <TextInput
              value={formData.contactEyebrow}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, contactEyebrow: val }))
              }
              onBlur={() => handleSaveOnBlur("contactEyebrow")}
              placeholder="LET'S WORK TOGETHER"
              disabled={isSaving}
            />
          </Field>

          <Field label="Contact Heading" hint="Main heading in contact section">
            <TextInput
              value={formData.contactHeading}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, contactHeading: val }))
              }
              onBlur={() => handleSaveOnBlur("contactHeading")}
              placeholder="HOW CAN WE HELP?"
              disabled={isSaving}
            />
          </Field>

          <Field label="Contact Intro Text" hint="Supporting text in the contact section">
            <TextArea
              value={formData.contactIntroText}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, contactIntroText: val }))
              }
              onBlur={() => handleSaveOnBlur("contactIntroText")}
              placeholder="Ready to transform your IT infrastructure?..."
              rows={4}
              disabled={isSaving}
            />
          </Field>

          <Field label="Contact Background Image" hint="Top banner image for the contact section">
            <ImageUpload
              onUpload={handleImageUploadField("contactBgImage")}
              disabled={isSaving}
              accept="image/*"
              buttonLabel="Upload Contact Background"
              busyLabel="Uploading image..."
              ariaLabel="Upload contact background"
            />
            {formData.contactBgImage && (
              <img
                src={getPreviewUrl(formData.contactBgImage)}
                alt={formData.contactBgImageAlt || "Contact background preview"}
                className="mt-3 w-full h-32 object-cover rounded-lg border"
                style={{ borderColor: "var(--border)" }}
              />
            )}
          </Field>

          <Field label="Contact Background Alt" hint="Accessible alt text for contact section image">
            <TextInput
              value={formData.contactBgImageAlt}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, contactBgImageAlt: val }))
              }
              onBlur={() => handleSaveOnBlur("contactBgImageAlt")}
              placeholder="Team discussing digital strategy"
              disabled={isSaving}
            />
          </Field>
        </div>
      </SectionCard>
          </div>

        {/* "What We Do" Section */}
          <div className="admin-section-panel">
        <SectionCard
        title="What We Do"
        subtitle="Homepage overview copy"
        collapsible={true}
        defaultOpen={false}
        open={sectionOpen.whatWeDo}
        onOpenChange={(nextOpen) => handleSectionToggle("whatWeDo", nextOpen)}
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
        defaultOpen={false}
        open={sectionOpen.socialLinks}
        onOpenChange={(nextOpen) => handleSectionToggle("socialLinks", nextOpen)}
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
