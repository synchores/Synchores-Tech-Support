import { useAdminHeroLandingPage } from "../../hooks/useAdminHeroLandingPage";
import { HeroLandingHeader } from "../../components/admin-ui/hero-section/HeroLandingHeader";
import { HeroLandingSaveStatusBar } from "../../components/admin-ui/hero-section/HeroLandingSaveStatusBar";
import { HeroLandingStatsGrid } from "../../components/admin-ui/hero-section/HeroLandingStatsGrid";
import { HeroLandingEditorPanel } from "../../components/admin-ui/hero-section/HeroLandingEditorPanel";
import { HeroLandingPreviewCard } from "../../components/admin-ui/hero-section/HeroLandingPreviewCard";

export function AdminHeroLanding() {
  const {
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
  } = useAdminHeroLandingPage();

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6" style={{ color: "var(--muted-foreground)" }}>Loading hero section...</div>
    );
  }

  return (
    <div className="admin-page-shell admin-hero-page">
      <div className="p-6 flex flex-col gap-5 max-w-6xl mx-auto">
        <HeroLandingHeader />

        <HeroLandingSaveStatusBar
          saveState={saveState}
          isDirty={isDirty}
          isSaving={isSaving}
          dirtyCount={dirtyCount}
          onDiscard={handleDiscardChanges}
          onSaveAll={handleSaveAll}
        />

        <HeroLandingStatsGrid stats={stats} />

      {/* Content Container */}
      <div className="admin-surface-card overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          <HeroLandingEditorPanel
            formData={formData}
            isVideo={stats.isVideo}
            isSaving={isSaving}
            onFieldChange={handleFieldChange}
            onFieldBlur={handleSaveOnBlur}
            onImageUpload={handleImageUpload}
          />

          <HeroLandingPreviewCard formData={formData} isVideo={stats.isVideo} />
        </div>
      </div>

      </div>
    </div>
  );
}

export default AdminHeroLanding;
