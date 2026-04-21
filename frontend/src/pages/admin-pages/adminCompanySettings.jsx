import { useAdminCompanySettingsPage } from "../../hooks/useAdminCompanySettingsPage";
import { CompanySettingsHeaderPanel } from "../../components/admin-ui/settings-section/CompanySettingsHeaderPanel";
import { CompanySettingsSaveStatusBar } from "../../components/admin-ui/settings-section/CompanySettingsSaveStatusBar";
import { ContactInfoSection } from "../../components/admin-ui/settings-section/ContactInfoSection";
import { AboutSection } from "../../components/admin-ui/settings-section/AboutSection";
import { AboutPresentationSection } from "../../components/admin-ui/settings-section/AboutPresentationSection";
import { MissionValuesCommitmentSection } from "../../components/admin-ui/settings-section/MissionValuesCommitmentSection";
import { BrandingMediaSection } from "../../components/admin-ui/settings-section/BrandingMediaSection";
import { WhatWeDoSection } from "../../components/admin-ui/settings-section/WhatWeDoSection";
import { SocialMediaLinksSection } from "../../components/admin-ui/settings-section/SocialMediaLinksSection";

export function AdminCompanySettings() {
  const {
    companyInfo,
    loading,
    formData,
    isSaving,
    saveState,
    sectionOpen,
    isDirty,
    dirtyCount,
    openSectionCount,
    handleFieldChange,
    handleSaveOnBlur,
    getPreviewUrl,
    handleImageUploadField,
    setAllSections,
    handleSectionToggle,
    handleSaveAll,
    handleDiscardChanges,
  } = useAdminCompanySettingsPage();

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
          <CompanySettingsHeaderPanel
            openSectionCount={openSectionCount}
            onExpandAll={() => setAllSections(true)}
            onCollapseAll={() => setAllSections(false)}
          />

          <CompanySettingsSaveStatusBar
            saveState={saveState}
            isDirty={isDirty}
            isSaving={isSaving}
            dirtyCount={dirtyCount}
            onDiscard={handleDiscardChanges}
            onSaveAll={handleSaveAll}
          />

          <div className="admin-section-panel">
            <ContactInfoSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.contactInfo}
              onOpenChange={(nextOpen) => handleSectionToggle("contactInfo", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>

          <div className="admin-section-panel">
            <AboutSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.about}
              onOpenChange={(nextOpen) => handleSectionToggle("about", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>

          <div className="admin-section-panel">
            <AboutPresentationSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.aboutPresentation}
              onOpenChange={(nextOpen) => handleSectionToggle("aboutPresentation", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>

          <div className="admin-section-panel">
            <MissionValuesCommitmentSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.missionValues}
              onOpenChange={(nextOpen) => handleSectionToggle("missionValues", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>

          <div className="admin-section-panel">
            <BrandingMediaSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.brandingMedia}
              onOpenChange={(nextOpen) => handleSectionToggle("brandingMedia", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
              onImageUploadField={handleImageUploadField}
              getPreviewUrl={getPreviewUrl}
            />
          </div>

          <div className="admin-section-panel">
            <WhatWeDoSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.whatWeDo}
              onOpenChange={(nextOpen) => handleSectionToggle("whatWeDo", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>

          <div className="admin-section-panel">
            <SocialMediaLinksSection
              formData={formData}
              isSaving={isSaving}
              isOpen={sectionOpen.socialLinks}
              onOpenChange={(nextOpen) => handleSectionToggle("socialLinks", nextOpen)}
              onFieldChange={handleFieldChange}
              onFieldBlur={handleSaveOnBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCompanySettings;
