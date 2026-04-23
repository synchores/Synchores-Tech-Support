import { useEffect, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Field, TextInput, TextArea } from "../../admin-ui/field";
import { CmsDrawer } from "../../admin-ui/CmsDrawer";
import { toastError, toastInfo } from "../../../services/admin-service/adminToast";

const CATEGORIES = [
  { value: "cloud", label: "Cloud" },
  { value: "devops", label: "DevOps" },
  { value: "mobile", label: "Mobile" },
  { value: "web", label: "Web" },
  { value: "infrastructure", label: "Infrastructure" },
];

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

export function DeploymentDetailModal({
  deployment = null,
  open,
  onClose,
  onSubmit,
}) {
  const isEditMode = !!deployment;
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    status: "draft",
    order: 0,
  });

  useEffect(() => {
    if (deployment) {
      setFormData({
        title: deployment.title || "",
        description: deployment.description || "",
        image: deployment.image || "",
        category: deployment.category || "",
        status: deployment.status || "draft",
        order: deployment.order || 0,
      });
      return;
    }

    setFormData({
      title: "",
      description: "",
      image: "",
      category: "",
      status: "draft",
      order: 0,
    });
  }, [deployment, open]);

  const uploadFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toastInfo("Image required", "Please upload a valid image file.");
      return;
    }

    const body = new FormData();
    body.append("file", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${IMAGE_URL}/landing-page/upload/image`, {
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
      toastError(error, "Upload failed", "Image upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toastInfo("Missing fields", "Please fill all required fields.");
      return;
    }

    try {
      await onSubmit(
        isEditMode
          ? { deploymentId: deployment.deploymentId, ...formData }
          : formData
      );

      onClose();
    } catch (error) {
      toastError(error, isEditMode ? "Update failed" : "Create failed");
    }
  };

  return (
    <CmsDrawer
      open={open}
      title={isEditMode ? "Edit Deployment" : "New Deployment"}
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
          description="Write the summary and supporting copy for this deployment."
        >
          <Field label="Title">
            <TextInput
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              placeholder="Deployment title"
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              placeholder="Deployment description"
              rows={4}
            />
          </Field>
        </Section>

        <Section
          title="Classification"
          description="Assign the deployment category, order, and status."
        >
          <Field label="Category">
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
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
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
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

          <Field label="Order (for display)">
            <TextInput
              type="number"
              value={formData.order}
              onChange={(value) =>
                setFormData({ ...formData, order: parseInt(value, 10) || 0 })
              }
              placeholder="0"
            />
          </Field>
        </Section>

        <Section
          title="Media"
          description="Upload a deployment hero image and review the current preview."
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

        {formData.image && (
          <div style={{ marginTop: "0.25rem" }}>
            <img
              src={`${IMAGE_URL}${formData.image}`}
              alt="Deployment preview"
              className="w-full h-40 rounded-lg object-cover border border-solid"
              style={{
                borderColor: "var(--border)",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
                background: "#f8fafc",
              }}
            />
          </div>
        )}
        </Section>
      </div>
    </CmsDrawer>
  );
}
