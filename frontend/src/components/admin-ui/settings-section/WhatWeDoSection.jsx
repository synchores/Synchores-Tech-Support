import { SectionCard } from "../section-card";
import { Field, TextInput, TextArea } from "../field";

export function WhatWeDoSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="What We Do"
      subtitle="Homepage overview copy"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <Field label="Section Title" hint="Heading shown above this section">
          <TextInput
            value={formData.whatWeDoTitle}
            onChange={(val) => onFieldChange("whatWeDoTitle", val)}
            onBlur={() => onFieldBlur("whatWeDoTitle")}
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
            onChange={(val) => onFieldChange("whatWeDoParagraph1", val)}
            onBlur={() => onFieldBlur("whatWeDoParagraph1")}
            placeholder="We deliver tailored digital solutions that help small and medium enterprises thrive..."
            rows={4}
            disabled={isSaving}
          />
        </Field>

        <Field label="Second Paragraph" hint="Optional supporting paragraph">
          <TextArea
            value={formData.whatWeDoParagraph2}
            onChange={(val) => onFieldChange("whatWeDoParagraph2", val)}
            onBlur={() => onFieldBlur("whatWeDoParagraph2")}
            placeholder="We implement secure, scalable technologies-from networking and cloud systems to AI-powered workflows..."
            rows={4}
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default WhatWeDoSection;
