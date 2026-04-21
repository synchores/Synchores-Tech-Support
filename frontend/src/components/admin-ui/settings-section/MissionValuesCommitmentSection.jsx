import { SectionCard } from "../section-card";
import { Field, TextInput, TextArea } from "../field";

export function MissionValuesCommitmentSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="Mission, Values, and Commitment"
      subtitle="Content for mission card and commitment block"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <Field label="Mission Label" hint="Label above mission statement">
          <TextInput
            value={formData.missionLabel}
            onChange={(val) => onFieldChange("missionLabel", val)}
            onBlur={() => onFieldBlur("missionLabel")}
            placeholder="Our Mission"
            disabled={isSaving}
          />
        </Field>

        <Field label="Mission Statement" hint="Mission quote text">
          <TextArea
            value={formData.missionStatement}
            onChange={(val) => onFieldChange("missionStatement", val)}
            onBlur={() => onFieldBlur("missionStatement")}
            placeholder="Empower organizations through technology..."
            rows={3}
            disabled={isSaving}
          />
        </Field>

        <Field label="Values Label" hint="Label above values statement">
          <TextInput
            value={formData.valuesLabel}
            onChange={(val) => onFieldChange("valuesLabel", val)}
            onBlur={() => onFieldBlur("valuesLabel")}
            placeholder="Our Values"
            disabled={isSaving}
          />
        </Field>

        <Field label="Values Statement" hint="Values quote text">
          <TextArea
            value={formData.valuesStatement}
            onChange={(val) => onFieldChange("valuesStatement", val)}
            onBlur={() => onFieldBlur("valuesStatement")}
            placeholder="Quality, innovation, and reliability..."
            rows={3}
            disabled={isSaving}
          />
        </Field>

        <Field label="Commitment Eyebrow" hint="Small label for commitment panel">
          <TextInput
            value={formData.commitmentEyebrow}
            onChange={(val) => onFieldChange("commitmentEyebrow", val)}
            onBlur={() => onFieldBlur("commitmentEyebrow")}
            placeholder="Why Choose Us"
            disabled={isSaving}
          />
        </Field>

        <Field label="Commitment Heading" hint="Main heading for commitment panel">
          <TextInput
            value={formData.commitmentHeading}
            onChange={(val) => onFieldChange("commitmentHeading", val)}
            onBlur={() => onFieldBlur("commitmentHeading")}
            placeholder="OUR COMMITMENT"
            disabled={isSaving}
          />
        </Field>

        <Field label="Commitment Statement" hint="Body text for commitment panel">
          <TextArea
            value={formData.commitmentStatement}
            onChange={(val) => onFieldChange("commitmentStatement", val)}
            onBlur={() => onFieldBlur("commitmentStatement")}
            placeholder="We implement secure, scalable technologies..."
            rows={4}
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default MissionValuesCommitmentSection;
