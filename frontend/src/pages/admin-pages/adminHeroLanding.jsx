import { useState, useEffect } from "react";
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
} from "lucide-react";

export function AdminHeroLanding() {
  const { hero, loading, updateHero } = useHeroSection();
  const [formData, setFormData] = useState({
    headline: "",
    tagline: "",
    backgroundImage: "",
  });
  const [isSaving, setIsSaving] = useState(false);

	const isActive = !!hero?.headline;
	const hasImage = !!formData.backgroundImage;
	const headlineLength = (formData.headline || "").length;
	const lastUpdated = hero?.updatedAt
		? new Date(hero.updatedAt).toLocaleDateString()
		: "N/A";

  useEffect(() => {
    if (hero) {
      setFormData({
        headline: hero.headline || "",
        tagline: hero.tagline || "",
        backgroundImage: hero.backgroundImage || "",
      });
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

    try {
      setIsSaving(true);
      await updateHero({
        heroId: hero.heroId,
        [fieldName]: value || formData[fieldName],
      });
    } catch (error) {
      console.error("Save failed:", error);
      setFormData((prev) => ({
        ...prev,
        [fieldName]: hero[fieldName],
      }));
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6" style={{ color: "var(--muted-foreground)" }}>Loading hero section...</div>
    );
  }

  return (
    <div className="admin-page-shell">
      <div className="p-6 flex flex-col gap-5 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Hero Section</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Edit your landing page hero content
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
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
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            {isActive ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
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
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            <Clock size={18} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
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
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            <Type size={18} />
          </div>
        </div>

        <div
          className="rounded-lg p-4 flex items-center justify-between shadow-sm"
          style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
        >
          <div className="flex flex-col gap-1">
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Background image</p>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
              }}
            >
              {hasImage ? "Set" : "Not set"}
            </p>
          </div>
          <div
            className="rounded-full p-2"
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            {hasImage ? <ImageIcon size={18} /> : <ImageOff size={18} />}
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
              style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            >
            <div className="admin-section-panel space-y-6">
              {/* Headline Card */}
              <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg p-2" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
                  <Type size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Headline</h3>
                  <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Main hero section text</p>
                </div>
              </div>
              <TextInput
                value={formData.headline}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, headline: val }))
                }
                onBlur={() => handleSaveOnBlur("headline")}
                placeholder="Scalable Tech Solutions Built For Your Business SUCCESS"
                disabled={isSaving}
              />
              </div>

              {/* Tagline Card */}
              <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-lg p-2" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
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
            </div>

            <div className="admin-section-panel space-y-6">
              {/* Background Image Card */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg p-2" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
                    <ImageIcon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Background Image</h3>
                    <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Hero section background (1920x1080px)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {formData.backgroundImage && (
                    <div
                      className="relative w-full h-40 rounded-xl overflow-hidden"
                      style={{ background: "var(--accent)", border: "1px solid var(--border)" }}
                    >
                      <img
                        src={`http://localhost:3000${formData.backgroundImage}`}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <ImageUpload onUpload={handleImageUpload} disabled={isSaving} />
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
                borderColor: "#e2e8f0",
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
                  <img
                    src={`http://localhost:3000${formData.backgroundImage}`}
                    alt="Hero background preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
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

      {/* Save Status */}
      {isSaving && (
        <div className="flex items-center gap-2 text-sm rounded-lg p-3" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
          <div className="animate-spin h-4 w-4 border-2" style={{ borderColor: "var(--muted-foreground)", borderTopColor: "var(--foreground)", borderRadius: "50%" }}></div>
          Saving changes...
        </div>
      )}
      </div>
    </div>
  );
}

export default AdminHeroLanding;
