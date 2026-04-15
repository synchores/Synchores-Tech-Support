import { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Field, TextInput, TextArea } from "../../admin-ui/field";
import { CmsDrawer } from "../../admin-ui/CmsDrawer";

const FALLBACK_IMAGE = "https://placehold.co/600x300/e2e8f0/64748b?text=Service+Image";

function Section({ title, description, children }) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        padding: "1rem",
        borderRadius: "0.875rem",
        border: "1px solid rgba(148, 163, 184, 0.18)",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#64748b" }}>
          {title}
        </p>
        {description && (
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            {description}
          </p>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>{children}</div>
    </section>
  );
}

export function ServiceDetailModal({
  service = null,
  open,
  onClose,
  onSubmit,
}) {
  const isEditMode = !!service;
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "package",
    image: "",
    category: "General",
    status: "draft",
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        icon: service.icon || "package",
        image: service.image || "",
        category: service.category || "General",
        status: service.status || "draft",
      });
      return;
    }

    setFormData({
      title: "",
      description: "",
      icon: "package",
      image: "",
      category: "General",
      status: "draft",
    });
  }, [service, open]);

  const uploadFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }

    const body = new FormData();
    body.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:3000/landing-page/upload/image", {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, image: data.path }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Please fill all fields");
      return;
    }

    await onSubmit(
      isEditMode
        ? { cardId: service.cardId, ...formData }
        : formData
    );

    onClose();
  };

  return (
    <CmsDrawer
      open={open}
      title={isEditMode ? "Edit Service" : "New Service"}
      onClose={onClose}
      actions={[
        {
          id: "cancel",
          label: "Cancel",
          variant: "ghost",
          onClick: onClose,
        },
        {
          id: "submit",
          label: isEditMode ? "Update" : "Create",
          variant: "primary",
          onClick: handleSubmit,
        },
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Section
          title="Content"
          description="Start with the core service details and summary copy."
        >
          <Field label="Title">
            <TextInput
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              placeholder="Service title"
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              placeholder="Service description"
              rows={4}
            />
          </Field>
        </Section>

        <Section
          title="Status & Classification"
          description="Choose the icon, category, and publish state."
        >
          <Field label="Icon">
            <select
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                background: "white",
                color: "var(--foreground)",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <option value="package">📦 Package</option>
              <option value="tool">🔧 Tool</option>
              <option value="settings">⚙️ Settings</option>
              <option value="star">⭐ Star</option>
            </select>
          </Field>

          <Field label="Category">
            <TextInput
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              placeholder="General"
            />
          </Field>

          <Field label="Status">
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid var(--border)",
                background: "white",
                color: "var(--foreground)",
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.15s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </Section>

        <Section
          title="Media"
          description="Upload a hero image and review the current preview."
        >
          <div
            style={{
              borderRadius: "0.875rem",
              padding: "1rem",
              border: "1px dashed #94a3b8",
              background: "#f8fafc",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              uploadFile(file);
            }}
          >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => uploadFile(e.target.files?.[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.9rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid #cbd5e1",
              background: "white",
              color: "var(--foreground)",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eff6ff";
              e.currentTarget.style.borderColor = "#93c5fd";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
          >
            <UploadCloud size={16} />
            {uploading ? "Uploading..." : "Drag and drop image or click to upload"}
          </button>
        </div>

        <div style={{ marginTop: "0.25rem" }}>
          <img
            src={formData.image ? `http://localhost:3000${formData.image}` : FALLBACK_IMAGE}
            alt="Service preview"
            className="w-full h-40 rounded-lg object-cover border border-solid"
            style={{
              borderColor: "var(--border)",
              boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
              background: "#f8fafc",
            }}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
        </div>
        </Section>
      </div>
    </CmsDrawer>
  );
}
