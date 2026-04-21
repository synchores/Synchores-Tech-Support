import { SectionCard } from "../section-card";
import { Field, TextInput, TextArea } from "../field";

export function AboutPresentationSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="About Section Presentation"
      subtitle="Section labels, headings, and supporting copy"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <Field label="About Eyebrow" hint="Small label above the heading">
          <TextInput
            value={formData.aboutEyebrow}
            onChange={(val) => onFieldChange("aboutEyebrow", val)}
            onBlur={() => onFieldBlur("aboutEyebrow")}
            placeholder="Who We Are"
            disabled={isSaving}
          />
        </Field>

        <Field label="About Heading" hint="Main section heading">
          <TextInput
            value={formData.aboutHeading}
            onChange={(val) => onFieldChange("aboutHeading", val)}
            onBlur={() => onFieldBlur("aboutHeading")}
            placeholder="ABOUT SYNCHORES"
            disabled={isSaving}
          />
        </Field>

        <Field label="About Paragraph 2" hint="Secondary paragraph under the main about text">
          <TextArea
            value={formData.aboutParagraph2}
            onChange={(val) => onFieldChange("aboutParagraph2", val)}
            onBlur={() => onFieldBlur("aboutParagraph2")}
            placeholder="Supporting paragraph for the About section"
            rows={4}
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default AboutPresentationSection;
