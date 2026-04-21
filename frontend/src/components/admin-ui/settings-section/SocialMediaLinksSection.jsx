import { SectionCard } from "../section-card";
import { Field, TextInput } from "../field";

export function SocialMediaLinksSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="Social Media Links"
      subtitle="Connect with your audience"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <Field label="Facebook URL" hint="Your Facebook business page">
          <TextInput
            type="url"
            value={formData.facebookUrl}
            onChange={(val) => onFieldChange("facebookUrl", val)}
            onBlur={() => onFieldBlur("facebookUrl")}
            placeholder="https://facebook.com/synchores"
            disabled={isSaving}
          />
        </Field>

        <Field label="Instagram URL" hint="Your Instagram business profile">
          <TextInput
            type="url"
            value={formData.instagramUrl}
            onChange={(val) => onFieldChange("instagramUrl", val)}
            onBlur={() => onFieldBlur("instagramUrl")}
            placeholder="https://instagram.com/synchores"
            disabled={isSaving}
          />
        </Field>

        <Field label="YouTube URL" hint="Your YouTube channel">
          <TextInput
            type="url"
            value={formData.youtubeUrl}
            onChange={(val) => onFieldChange("youtubeUrl", val)}
            onBlur={() => onFieldBlur("youtubeUrl")}
            placeholder="https://youtube.com/synchores"
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default SocialMediaLinksSection;
