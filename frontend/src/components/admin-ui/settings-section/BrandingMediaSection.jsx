import { SectionCard } from "../section-card";
import { Field, TextInput, TextArea } from "../field";
import { ImageUpload } from "../../landing-page/image-upload";

export function BrandingMediaSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
  onImageUploadField,
  getPreviewUrl,
}) {
  return (
    <SectionCard
      title="Branding and Media"
      subtitle="Images, logo, and contact section copy"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-6">
        <Field label="Footer Brand Text" hint="Short company description shown in footer">
          <TextArea
            value={formData.footerBrandText}
            onChange={(val) => onFieldChange("footerBrandText", val)}
            onBlur={() => onFieldBlur("footerBrandText")}
            placeholder="We specialize in delivering customized digital solutions..."
            rows={3}
            disabled={isSaving}
          />
        </Field>

        <Field label="About Main Image" hint="Image for the first About split section">
          <ImageUpload
            onUpload={onImageUploadField("aboutImage1")}
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
            onChange={(val) => onFieldChange("aboutImage1Alt", val)}
            onBlur={() => onFieldBlur("aboutImage1Alt")}
            placeholder="Synchores team collaborating"
            disabled={isSaving}
          />
        </Field>

        <Field label="About Alternate Image" hint="Image for the second About split section">
          <ImageUpload
            onUpload={onImageUploadField("aboutImage2")}
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
            onChange={(val) => onFieldChange("aboutImage2Alt", val)}
            onBlur={() => onFieldBlur("aboutImage2Alt")}
            placeholder="Synchores consulting session"
            disabled={isSaving}
          />
        </Field>

        <Field label="Company Logo" hint="Logo used in footer brand and copyright bar">
          <ImageUpload
            onUpload={onImageUploadField("companyLogo")}
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
            onChange={(val) => onFieldChange("companyLogoAlt", val)}
            onBlur={() => onFieldBlur("companyLogoAlt")}
            placeholder="Synchores logo"
            disabled={isSaving}
          />
        </Field>

        <Field label="Contact Eyebrow" hint="Label above contact heading">
          <TextInput
            value={formData.contactEyebrow}
            onChange={(val) => onFieldChange("contactEyebrow", val)}
            onBlur={() => onFieldBlur("contactEyebrow")}
            placeholder="LET'S WORK TOGETHER"
            disabled={isSaving}
          />
        </Field>

        <Field label="Contact Heading" hint="Main heading in contact section">
          <TextInput
            value={formData.contactHeading}
            onChange={(val) => onFieldChange("contactHeading", val)}
            onBlur={() => onFieldBlur("contactHeading")}
            placeholder="HOW CAN WE HELP?"
            disabled={isSaving}
          />
        </Field>

        <Field label="Contact Intro Text" hint="Supporting text in the contact section">
          <TextArea
            value={formData.contactIntroText}
            onChange={(val) => onFieldChange("contactIntroText", val)}
            onBlur={() => onFieldBlur("contactIntroText")}
            placeholder="Ready to transform your IT infrastructure?..."
            rows={4}
            disabled={isSaving}
          />
        </Field>

        <Field label="Contact Background Image" hint="Top banner image for the contact section">
          <ImageUpload
            onUpload={onImageUploadField("contactBgImage")}
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
            onChange={(val) => onFieldChange("contactBgImageAlt", val)}
            onBlur={() => onFieldBlur("contactBgImageAlt")}
            placeholder="Team discussing digital strategy"
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default BrandingMediaSection;
