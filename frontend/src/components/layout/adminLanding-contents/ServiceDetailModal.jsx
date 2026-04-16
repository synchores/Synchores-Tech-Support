import { useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Field, TextInput, TextArea } from "../../admin-ui/field";
import { CmsDrawer } from "../../admin-ui/CmsDrawer";

const FALLBACK_IMAGE = "https://placehold.co/600x300/e2e8f0/64748b?text=Service+Image";
const THEME_PRIMARY = "#179cf9";

function splitLines(value = "") {
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLabelValueLines(value = "") {
  return splitLines(value)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      const normalizedLabel = (label || "").trim();
      const normalizedValue = rest.join("|").trim();

      if (!normalizedLabel && !normalizedValue) return null;
      return {
        label: normalizedLabel || "Metric",
        value: normalizedValue || normalizedLabel,
      };
    })
    .filter(Boolean);
}

function parseFeatureLines(value = "") {
  return splitLines(value)
    .map((line) => {
      const [title, ...rest] = line.split("|");
      const normalizedTitle = (title || "").trim();
      const description = rest.join("|").trim();

      if (!normalizedTitle && !description) return null;
      return {
        title: normalizedTitle || "Feature",
        description: description || normalizedTitle,
      };
    })
    .filter(Boolean);
}

function parseProcessLines(value = "") {
  return splitLines(value)
    .map((line, index) => {
      const [label, ...rest] = line.split("|");
      const normalizedLabel = (label || "").trim();
      const description = rest.join("|").trim();

      if (!normalizedLabel && !description) return null;
      return {
        step: index + 1 < 10 ? `0${index + 1}` : String(index + 1),
        label: normalizedLabel || "Step",
        description: description || normalizedLabel,
      };
    })
    .filter(Boolean);
}

function resolveImageSource(path = "") {
  if (!path) return FALLBACK_IMAGE;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith("/")) return `http://localhost:3000${path}`;
  return `http://localhost:3000/${path}`;
}

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
    subtitle: "",
    description: "",
    longDescription: "",
    points: "",
    stats: "",
    features: "",
    process: "",
    ctaTitle: "",
    ctaDescription: "",
    ctaButtonLabel: "",
    icon: "package",
    image: "",
    category: "General",
    status: "draft",
  });

  const previewImage = useMemo(
    () => resolveImageSource(formData.image),
    [formData.image],
  );
  const previewPoints = useMemo(
    () => splitLines(formData.points),
    [formData.points],
  );
  const previewStats = useMemo(
    () => parseLabelValueLines(formData.stats),
    [formData.stats],
  );
  const previewFeatures = useMemo(
    () => parseFeatureLines(formData.features),
    [formData.features],
  );
  const previewProcess = useMemo(
    () => parseProcessLines(formData.process),
    [formData.process],
  );

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        subtitle: service.subtitle || "",
        description: service.description || "",
        longDescription: service.longDescription || "",
        points: service.points || "",
        stats: service.stats || "",
        features: service.features || "",
        process: service.process || "",
        ctaTitle: service.ctaTitle || "",
        ctaDescription: service.ctaDescription || "",
        ctaButtonLabel: service.ctaButtonLabel || "",
        icon: service.icon || "package",
        image: service.image || "",
        category: service.category || "General",
        status: service.status || "draft",
      });
      return;
    }

    setFormData({
      title: "",
      subtitle: "",
      description: "",
      longDescription: "",
      points: "",
      stats: "",
      features: "",
      process: "",
      ctaTitle: "",
      ctaDescription: "",
      ctaButtonLabel: "",
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

          <Field label="Subtitle">
            <TextInput
              value={formData.subtitle}
              onChange={(value) => setFormData({ ...formData, subtitle: value })}
              placeholder="Short subtitle shown under title"
            />
          </Field>

          <Field label="Long Description">
            <TextArea
              value={formData.longDescription}
              onChange={(value) => setFormData({ ...formData, longDescription: value })}
              placeholder="Detailed overview paragraph"
              rows={5}
            />
          </Field>

          <Field label="Overview Points (one per line)">
            <TextArea
              value={formData.points}
              onChange={(value) => setFormData({ ...formData, points: value })}
              placeholder={"Technology strategy and roadmap planning\nProcess and platform advisory for SMEs\nVendor-neutral recommendations"}
              rows={4}
            />
          </Field>
        </Section>

        <Section
          title="Detail Blocks"
          description="Configure sections used in Offering detail pages."
        >
          <Field label="Stats (Label|Value per line)">
            <TextArea
              value={formData.stats}
              onChange={(value) => setFormData({ ...formData, stats: value })}
              placeholder={"Strategy Clarity|92%\nExecution Accuracy|91%\nCost Optimization|+18%\nTimeline Adherence|88%"}
              rows={5}
            />
          </Field>

          <Field label="Features (Title|Description per line)">
            <TextArea
              value={formData.features}
              onChange={(value) => setFormData({ ...formData, features: value })}
              placeholder={"Digital Strategy Advisory|Practical strategy aligned with business KPIs.\nTechnology Assessment|Capability and gap analysis."}
              rows={5}
            />
          </Field>

          <Field label="Process (Label|Description per line)">
            <TextArea
              value={formData.process}
              onChange={(value) => setFormData({ ...formData, process: value })}
              placeholder={"Evaluate|Assess current state and priorities.\nPlan|Define roadmap and phases.\nGuide|Support execution checkpoints.\nMeasure|Track outcomes and optimize."}
              rows={5}
            />
          </Field>

          <Field label="CTA Title">
            <TextInput
              value={formData.ctaTitle}
              onChange={(value) => setFormData({ ...formData, ctaTitle: value })}
              placeholder="Ready to Get Started?"
            />
          </Field>

          <Field label="CTA Description">
            <TextArea
              value={formData.ctaDescription}
              onChange={(value) => setFormData({ ...formData, ctaDescription: value })}
              placeholder="Describe why users should contact your team."
              rows={3}
            />
          </Field>

          <Field label="CTA Button Label">
            <TextInput
              value={formData.ctaButtonLabel}
              onChange={(value) => setFormData({ ...formData, ctaButtonLabel: value })}
              placeholder="Schedule Consultation"
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
            src={previewImage}
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

        <Section
          title="Live Detail Preview"
          description="This mirrors the front-end offering detail sections using your current form values."
        >
          <div
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              border: "1px solid rgba(148, 163, 184, 0.22)",
              background: "#060c14",
              color: "#ffffff",
            }}
          >
            <div style={{ position: "relative", minHeight: "220px" }}>
              <img
                src={previewImage}
                alt="Detail hero preview"
                style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.84) 100%)",
                }}
              />
              <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "16px" }}>
                <p
                  style={{
                    fontSize: "10px",
                    margin: "0 0 8px 0",
                    color: THEME_PRIMARY,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                  }}
                >
                  Service Preview
                </p>
                <h3 style={{ margin: 0, fontSize: "28px", lineHeight: 1.1, textTransform: "uppercase" }}>
                  {formData.title || "Service Title"}
                </h3>
                <p style={{ margin: "10px 0 0 0", color: THEME_PRIMARY, fontSize: "14px" }}>
                  {formData.subtitle || "Subtitle"}
                </p>
              </div>
            </div>

            <div style={{ padding: "18px", display: "grid", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <p style={{ margin: "0 0 8px 0", color: THEME_PRIMARY, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                    Overview
                  </p>
                  <p style={{ margin: "0 0 10px 0", fontSize: "13px", lineHeight: 1.6, color: "#d9e5f5" }}>
                    {formData.longDescription || formData.description || "Long description will appear here."}
                  </p>
                  <div style={{ display: "grid", gap: "6px" }}>
                    {(previewPoints.length ? previewPoints : ["Overview point one", "Overview point two"]).slice(0, 4).map((point) => (
                      <p key={point} style={{ margin: 0, fontSize: "12px", color: "#f8fafc" }}>
                        • {point}
                      </p>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    background: "rgba(23,156,249,0.2)",
                    border: "1px solid rgba(23,156,249,0.35)",
                  }}
                >
                  {(previewStats.length
                    ? previewStats
                    : [
                        { label: "Quality", value: "95%" },
                        { label: "Delivery", value: "On Time" },
                        { label: "Coverage", value: "Wide" },
                        { label: "Support", value: "24/7" },
                      ]
                  ).slice(0, 4).map((stat) => (
                    <div key={`${stat.label}-${stat.value}`} style={{ background: "#0c335e", padding: "14px" }}>
                      <p style={{ margin: "0 0 4px 0", color: THEME_PRIMARY, fontSize: "20px", fontWeight: 700 }}>
                        {stat.value}
                      </p>
                      <p style={{ margin: 0, color: "#ffffff", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ margin: "0 0 10px 0", color: THEME_PRIMARY, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                  What's Included
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "10px" }}>
                  {(previewFeatures.length
                    ? previewFeatures
                    : [{ title: "Core Capability", description: "Feature description will appear here." }]
                  ).slice(0, 4).map((feature) => (
                    <div key={feature.title} style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.2)", padding: "12px" }}>
                      <p style={{ margin: "0 0 6px 0", fontSize: "11px", textTransform: "uppercase", color: "#ffffff", fontWeight: 700 }}>
                        {feature.title}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#c6d6ea", lineHeight: 1.5 }}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ margin: "0 0 10px 0", color: THEME_PRIMARY, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                  How It Works
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "10px" }}>
                  {(previewProcess.length
                    ? previewProcess
                    : [
                        { step: "01", label: "Assess", description: "Understand scope." },
                        { step: "02", label: "Plan", description: "Define roadmap." },
                        { step: "03", label: "Deliver", description: "Execute milestones." },
                        { step: "04", label: "Optimize", description: "Improve outcomes." },
                      ]
                  ).slice(0, 4).map((step) => (
                    <div key={`${step.step}-${step.label}`} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "12px", background: "rgba(255,255,255,0.01)" }}>
                      <p style={{ margin: "0 0 6px 0", color: "rgba(23,156,249,0.3)", fontSize: "24px", fontWeight: 800 }}>{step.step}</p>
                      <p style={{ margin: "0 0 6px 0", color: THEME_PRIMARY, fontSize: "10px", textTransform: "uppercase", fontWeight: 700 }}>{step.label}</p>
                      <p style={{ margin: 0, color: "#a8b7cc", fontSize: "12px", lineHeight: 1.45 }}>{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ border: "1px solid rgba(23,156,249,0.38)", background: "rgba(23,156,249,0.13)", padding: "14px" }}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "22px", textTransform: "uppercase", fontWeight: 700 }}>
                    {formData.ctaTitle || "Ready to Get Started?"}
                  </p>
                  <p style={{ margin: "0 0 12px 0", fontSize: "12px", lineHeight: 1.55, color: "#d7e6f8" }}>
                    {formData.ctaDescription || "CTA description will appear here."}
                  </p>
                  <button type="button" style={{ width: "100%", border: "none", padding: "10px", textTransform: "uppercase", fontWeight: 700, background: THEME_PRIMARY, color: "#05121f", cursor: "default" }}>
                    {formData.ctaButtonLabel || "Schedule Consultation"}
                  </button>
                </div>
                <div style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", padding: "14px" }}>
                  <p style={{ margin: "0 0 8px 0", color: THEME_PRIMARY, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                    Next Service
                  </p>
                  <p style={{ margin: "0 0 6px 0", fontSize: "20px", textTransform: "uppercase", fontWeight: 700 }}>
                    Next Published Item
                  </p>
                  <p style={{ margin: 0, color: "#c7d6ea", fontSize: "12px", lineHeight: 1.6 }}>
                    This block mirrors the right CTA card on the live page and auto-fills from neighboring service data there.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </CmsDrawer>
  );
}
