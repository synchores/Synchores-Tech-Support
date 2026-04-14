import { useState } from "react";
import { X } from "lucide-react";
import { Field, TextInput, TextArea } from "../../admin-ui/field";

export function ServiceDetailModal({
  service = null,
  onClose,
  onSubmit,
}) {
  const isEditMode = !!service;

  const [formData, setFormData] = useState(
    service
      ? {
          title: service.title || "",
          description: service.description || "",
          icon: service.icon || "package",
          image: service.image || "",
        }
      : {
          title: "",
          description: "",
          icon: "package",
          image: "",
        }
  );

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (isEditMode) {
      await onSubmit(service.id, formData);
    } else {
      await onSubmit(formData);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid #e2e8f0" }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {isEditMode ? "Edit Service" : "New Service"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} color="#64748b" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <Field label="Title">
            <TextInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Service title"
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Service description"
              rows={4}
            />
          </Field>

          <Field label="Icon">
            <select
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: "14px",
                color: "var(--foreground)",
                background: "var(--input-background)",
              }}
            >
              <option value="package">📦 Package</option>
              <option value="tool">🔧 Tool</option>
              <option value="settings">⚙️ Settings</option>
              <option value="star">⭐ Star</option>
            </select>
          </Field>

          <Field label="Image URL">
            <TextInput
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="https://..."
            />
          </Field>
        </div>

        {/* Footer */}
        <div
          className="flex gap-3 p-6"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg font-semibold"
            style={{
              background: "#f1f5f9",
              color: "#0f172a",
              fontSize: "14px",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-lg font-semibold"
            style={{
              background: "#3b82f6",
              color: "white",
              fontSize: "14px",
            }}
          >
            {isEditMode ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
