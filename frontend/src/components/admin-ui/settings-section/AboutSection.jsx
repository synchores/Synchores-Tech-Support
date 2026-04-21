import { SectionCard } from "../section-card";
import { Field, TextArea } from "../field";

export function AboutSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="About Us"
      subtitle="Company description and mission"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Field label="About Text" hint="Tell visitors about your company">
        <TextArea
          value={formData.aboutText}
          onChange={(val) => onFieldChange("aboutText", val)}
          onBlur={() => onFieldBlur("aboutText")}
          placeholder="Share your company's story, mission, and values here..."
          rows={5}
          disabled={isSaving}
        />
      </Field>
    </SectionCard>
  );
}

export default AboutSection;
