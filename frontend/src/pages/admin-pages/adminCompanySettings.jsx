import { useState, useEffect } from "react";
import { useCompanyInfo } from "../../hooks/useLandingPageData";
import { SectionCard } from "../../components/admin-ui/section-card";
import { Field, TextInput, TextArea } from "../../components/admin-ui/field";
import { Link } from "lucide-react";

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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (companyInfo) {
      setFormData({
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
      });
    }
  }, [companyInfo]);

  const handleSaveOnBlur = async (fieldName) => {
    if (!companyInfo?.infoId) return;

    try {
      setIsSaving(true);
      await updateCompanyInfo({
        [fieldName]: formData[fieldName],
      });
    } catch (error) {
      console.error("Save failed:", error);
      // Revert on error
      setFormData((prev) => ({
        ...prev,
        [fieldName]: companyInfo[fieldName],
      }));
    } finally {
      setIsSaving(false);
    }
  };

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

        {/* Save Status */}
        {isSaving && (
        <div className="flex items-center gap-2 text-sm rounded-lg p-3" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
          <div
            className="animate-spin h-4 w-4 border-2 rounded-full"
            style={{ borderColor: "var(--muted-foreground)", borderTopColor: "var(--foreground)" }}
          ></div>
          Saving changes...
        </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default AdminCompanySettings;
