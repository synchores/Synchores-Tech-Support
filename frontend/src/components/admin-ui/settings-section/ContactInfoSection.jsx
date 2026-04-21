import { SectionCard } from "../section-card";
import { Field, TextInput, TextArea } from "../field";

export function ContactInfoSection({
  formData,
  isSaving,
  isOpen,
  onOpenChange,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <SectionCard
      title="Contact Information"
      subtitle="Phone numbers, email, and address"
      collapsible={true}
      defaultOpen={false}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <Field label="Main Phone Number" hint="Primary business phone">
          <TextInput
            value={formData.phoneMain}
            onChange={(val) => onFieldChange("phoneMain", val)}
            onBlur={() => onFieldBlur("phoneMain")}
            placeholder="e.g., (046) 884 6572"
            disabled={isSaving}
          />
        </Field>

        <Field label="Mobile Phone" hint="Mobile contact number">
          <TextInput
            value={formData.phoneMobile}
            onChange={(val) => onFieldChange("phoneMobile", val)}
            onBlur={() => onFieldBlur("phoneMobile")}
            placeholder="e.g., +63 977 322 3796"
            disabled={isSaving}
          />
        </Field>

        <Field label="Email Address" hint="Main company email">
          <TextInput
            type="email"
            value={formData.email}
            onChange={(val) => onFieldChange("email", val)}
            onBlur={() => onFieldBlur("email")}
            placeholder="e.g., info@synchores.com"
            disabled={isSaving}
          />
        </Field>

        <Field label="Address" hint="Full company address">
          <TextArea
            value={formData.address}
            onChange={(val) => onFieldChange("address", val)}
            onBlur={() => onFieldBlur("address")}
            placeholder="Enter your full company address"
            rows={3}
            disabled={isSaving}
          />
        </Field>
      </div>
    </SectionCard>
  );
}

export default ContactInfoSection;
