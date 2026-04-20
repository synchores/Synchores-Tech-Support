import { useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Field, TextInput, TextArea } from "../../admin-ui/field";
import { CmsDrawer } from "../../admin-ui/CmsDrawer";

const FALLBACK_IMAGE = "https://placehold.co/600x300/e2e8f0/64748b?text=Service+Image";
const THEME_PRIMARY = "#179cf9";
const MAX_CATEGORY_LENGTH = 120;
const MAX_CTA_BUTTON_LABEL_LENGTH = 160;
const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
const EMPTY_STAT_ROW = { label: "", value: "" };
const EMPTY_FEATURE_ROW = { title: "", description: "" };
const EMPTY_PROCESS_ROW = { label: "", description: "" };
const VALID_ICONS = ["package", "tool", "settings", "star"];

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

function parseStructuredRows(value = "", leftKey, rightKey) {
  const parsed = splitLines(value).map((line) => {
    const [left = "", ...rest] = line.split("|");
    return {
      [leftKey]: left.trim(),
      [rightKey]: rest.join("|").trim(),
    };
  });

  return parsed.length ? parsed : [{ [leftKey]: "", [rightKey]: "" }];
}

function serializeStructuredRows(rows, leftKey, rightKey) {
  return rows
    .map((row) => ({
      left: String(row[leftKey] || "").trim(),
      right: String(row[rightKey] || "").trim(),
    }))
    .filter((row) => row.left || row.right)
    .map((row) => `${row.left}|${row.right}`)
    .join("\n");
}

function resolveImageSource(path = "") {
  if (!path) return FALLBACK_IMAGE;
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith("/")) return `http://localhost:3000${path}`;
  return `http://localhost:3000/${path}`;
}

function createInitialFormData(service = null) {
  return {
    title: service?.title || "",
    subtitle: service?.subtitle || "",
    description: service?.description || "",
    longDescription: service?.longDescription || "",
    points: service?.points || "",
    stats: service?.stats || "",
    features: service?.features || "",
    process: service?.process || "",
    ctaTitle: service?.ctaTitle || "",
    ctaDescription: service?.ctaDescription || "",
    ctaButtonLabel: service?.ctaButtonLabel || "",
    icon: service?.icon || "package",
    image: service?.image || "",
    category: service?.category || "General",
    status: service?.status || "draft",
  };
}

function getSelectStyles(hasError) {
  return {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: hasError ? "1px solid #dc2626" : "1px solid var(--border)",
    background: "white",
    color: "var(--foreground)",
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "all 0.15s ease-in-out",
  };
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

function RowEditor({
  title,
  description,
  rowPrefix,
  rows,
  columns,
  addLabel,
  error,
  onChangeCell,
  onAddRow,
  onRemoveRow,
}) {
  const columnTemplate = `34px repeat(${columns.length}, minmax(0, 1fr)) auto`;
  const rowMinWidth = columns.length >= 2 ? "500px" : "420px";

  return (
    <div
      style={{
        border: error ? "1px solid rgba(185, 28, 28, 0.4)" : "1px solid rgba(148, 163, 184, 0.25)",
        borderRadius: "0.75rem",
        padding: "0.875rem",
        display: "grid",
        gap: "0.75rem",
        background: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        <p style={{ margin: 0, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#334155" }}>
          {title}
        </p>
        <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748b" }}>{description}</p>
      </div>

      <div style={{ display: "grid", gap: "0.5rem", overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: columnTemplate, gap: "0.5rem", minWidth: rowMinWidth }}>
          <div />
          {columns.map((column) => (
            <p
              key={column.key}
              style={{
                margin: 0,
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#64748b",
                fontWeight: 700,
              }}
            >
              {column.label}
            </p>
          ))}
          <div />
        </div>

        {rows.map((row, index) => (
          <div
            key={`${rowPrefix}-${index}`}
            style={{ display: "grid", gridTemplateColumns: columnTemplate, gap: "0.5rem", alignItems: "center", minWidth: rowMinWidth }}
          >
            <span
              style={{
                height: "1.75rem",
                width: "1.75rem",
                borderRadius: "9999px",
                display: "grid",
                placeItems: "center",
                background: "#e2e8f0",
                color: "#334155",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {index + 1}
            </span>

            {columns.map((column) => (
              <TextInput
                key={column.key}
                id={`${rowPrefix}-${index}-${column.key}`}
                value={row[column.key]}
                onChange={(value) => onChangeCell(index, column.key, value)}
                placeholder={column.placeholder}
              />
            ))}

            <button
              type="button"
              onClick={() => onRemoveRow(index)}
              disabled={rows.length === 1}
              style={{
                height: "2.4rem",
                borderRadius: "0.5rem",
                border: "1px solid #e2e8f0",
                background: rows.length === 1 ? "#f8fafc" : "white",
                color: rows.length === 1 ? "#94a3b8" : "#475569",
                fontSize: "0.78rem",
                cursor: rows.length === 1 ? "not-allowed" : "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAddRow}
        style={{
          justifySelf: "start",
          padding: "0.45rem 0.7rem",
          borderRadius: "0.5rem",
          border: "1px solid #cbd5e1",
          background: "#f8fafc",
          color: "#0f172a",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        + {addLabel}
      </button>

      {error && (
        <p style={{ margin: 0, fontSize: "0.76rem", color: "#b91c1c" }}>{error}</p>
      )}
    </div>
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
  const [submitting, setSubmitting] = useState(false);
  const [showAdvancedStructuredInput, setShowAdvancedStructuredInput] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState(createInitialFormData());
  const [statsRows, setStatsRows] = useState([EMPTY_STAT_ROW]);
  const [featureRows, setFeatureRows] = useState([EMPTY_FEATURE_ROW]);
  const [processRows, setProcessRows] = useState([EMPTY_PROCESS_ROW]);

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
    const nextData = createInitialFormData(service);

    setFormData(nextData);
    setStatsRows(parseStructuredRows(nextData.stats, "label", "value"));
    setFeatureRows(parseStructuredRows(nextData.features, "title", "description"));
    setProcessRows(parseStructuredRows(nextData.process, "label", "description"));

    setErrors({});
    setSubmitError("");
    setUploadError("");
    setSubmitting(false);
  }, [service, open]);

  useEffect(() => {
    const serializedStats = serializeStructuredRows(statsRows, "label", "value");

    setFormData((prev) => {
      if (prev.stats === serializedStats) return prev;
      return { ...prev, stats: serializedStats };
    });
  }, [statsRows]);

  useEffect(() => {
    const serializedFeatures = serializeStructuredRows(featureRows, "title", "description");

    setFormData((prev) => {
      if (prev.features === serializedFeatures) return prev;
      return { ...prev, features: serializedFeatures };
    });
  }, [featureRows]);

  useEffect(() => {
    const serializedProcess = serializeStructuredRows(processRows, "label", "description");

    setFormData((prev) => {
      if (prev.process === serializedProcess) return prev;
      return { ...prev, process: serializedProcess };
    });
  }, [processRows]);

  const clearError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
    setSubmitError("");
  };

  const updateStructuredRow = (setter, fieldErrorKey) => (index, key, value) => {
    setter((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
    clearError(fieldErrorKey);
    setSubmitError("");
  };

  const addRow = (setter, rowFactory, fieldErrorKey) => {
    setter((prev) => [...prev, rowFactory()]);
    clearError(fieldErrorKey);
  };

  const removeRow = (setter, rowFactory, fieldErrorKey) => (index) => {
    setter((prev) => {
      if (prev.length === 1) return prev;
      const next = prev.filter((_, rowIndex) => rowIndex !== index);
      return next.length ? next : [rowFactory()];
    });
    clearError(fieldErrorKey);
    setSubmitError("");
  };

  const applyRawStructuredValue = (field, value, setter, leftKey, rightKey, fieldErrorKey) => {
    updateField(field, value);
    setter(parseStructuredRows(value, leftKey, rightKey));
    clearError(fieldErrorKey);
  };

  const hasPartialRows = (rows, leftKey, rightKey) => {
    return rows.some((row) => {
      const left = String(row[leftKey] || "").trim();
      const right = String(row[rightKey] || "").trim();
      return (left || right) && (!left || !right);
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!formData.status.trim()) {
      nextErrors.status = "Status is required.";
    }

    if (!VALID_ICONS.includes(formData.icon)) {
      nextErrors.icon = "Select a valid icon option.";
    }

    if (formData.category.trim().length > MAX_CATEGORY_LENGTH) {
      nextErrors.category = `Category must be ${MAX_CATEGORY_LENGTH} characters or fewer.`;
    }

    if (formData.ctaButtonLabel.trim().length > MAX_CTA_BUTTON_LABEL_LENGTH) {
      nextErrors.ctaButtonLabel = `CTA button label must be ${MAX_CTA_BUTTON_LABEL_LENGTH} characters or fewer.`;
    }

    if (hasPartialRows(statsRows, "label", "value")) {
      nextErrors.stats = "Each stat row needs both Label and Value, or remove that row.";
    }

    if (hasPartialRows(featureRows, "title", "description")) {
      nextErrors.features = "Each feature row needs both Title and Description, or remove that row.";
    }

    if (hasPartialRows(processRows, "label", "description")) {
      nextErrors.process = "Each process row needs both Step Label and Description, or remove that row.";
    }

    return nextErrors;
  };

  const focusFirstError = (nextErrors) => {
    const firstErrorTarget = [
      ["title", "service-title"],
      ["description", "service-description"],
      ["stats", "service-stat-0-label"],
      ["features", "service-feature-0-title"],
      ["process", "service-process-0-label"],
      ["icon", "service-icon"],
      ["category", "service-category"],
      ["status", "service-status"],
      ["ctaButtonLabel", "service-cta-button-label"],
    ].find(([key]) => !!nextErrors[key]);

    if (!firstErrorTarget) return;

    const target = document.getElementById(firstErrorTarget[1]);
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  };

  const uploadFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file.");
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setUploadError("Image is too large. Please upload an image smaller than 5MB.");
      return;
    }

    const body = new FormData();
    body.append("file", file);

    try {
      setUploading(true);
      setUploadError("");

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
      updateField("image", data.path || "");
    } catch (error) {
      console.error(error);
      setUploadError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async () => {
    if (uploading || submitting) return;

    const normalizedFormData = {
      ...formData,
      stats: serializeStructuredRows(statsRows, "label", "value"),
      features: serializeStructuredRows(featureRows, "title", "description"),
      process: serializeStructuredRows(processRows, "label", "description"),
    };

    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitError("Please fix the highlighted fields before saving.");
      focusFirstError(nextErrors);
      return;
    }

    setSubmitError("");
    setErrors({});

    try {
      setSubmitting(true);

      await onSubmit(
        isEditMode
          ? { cardId: service.cardId, ...normalizedFormData }
          : normalizedFormData,
      );

      onClose();
    } catch (error) {
      console.error(error);
      setSubmitError("Unable to save this service right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          disabled: submitting || uploading,
        },
        {
          id: "submit",
          label: isEditMode ? "Update Service" : "Create Service",
          loadingLabel: isEditMode ? "Updating Service..." : "Creating Service...",
          loading: submitting,
          variant: "primary",
          onClick: handleSubmit,
          disabled: submitting || uploading,
        },
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {(submitError || uploadError) && (
          <div
            role="alert"
            style={{
              borderRadius: "0.75rem",
              border: "1px solid rgba(185, 28, 28, 0.35)",
              background: "#fff1f2",
              color: "#9f1239",
              padding: "0.75rem 0.875rem",
              fontSize: "0.83rem",
              lineHeight: 1.5,
            }}
          >
            {submitError && <p style={{ margin: 0 }}>{submitError}</p>}
            {uploadError && <p style={{ margin: submitError ? "0.3rem 0 0 0" : 0 }}>{uploadError}</p>}
          </div>
        )}

        <Section
          title="How To Fill This Form"
          description="Required fields are marked with *. Structured blocks use row editors so you do not need to remember text formatting rules."
        >
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              padding: "0.8rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148, 163, 184, 0.25)",
              background: "#f8fafc",
              fontSize: "0.8rem",
              color: "#475569",
              lineHeight: 1.5,
            }}
          >
            <p style={{ margin: 0 }}>1. Enter Basic Information first so the preview has real content.</p>
            <p style={{ margin: 0 }}>2. Use Add Row for Stats, Features, and Process. Fill both columns per row.</p>
            <p style={{ margin: 0 }}>3. Upload your image and verify everything in the Live Detail Preview.</p>
          </div>
        </Section>

        <Section
          title="Basic Information"
          description="Set the primary content shown in cards and detail pages."
        >
          <Field
            label="Title"
            required
            inputId="service-title"
            error={errors.title}
            hint="Primary service name shown in cards and hero section."
          >
            <TextInput
              value={formData.title}
              onChange={(value) => updateField("title", value)}
              placeholder="Service title"
            />
          </Field>

          <Field
            label="Description"
            required
            inputId="service-description"
            error={errors.description}
            hint="Short summary used in list cards and metadata areas."
          >
            <TextArea
              value={formData.description}
              onChange={(value) => updateField("description", value)}
              placeholder="Service description"
              rows={4}
            />
          </Field>

          <Field
            label="Subtitle"
            inputId="service-subtitle"
            hint="Optional line shown under the hero title."
          >
            <TextInput
              value={formData.subtitle}
              onChange={(value) => updateField("subtitle", value)}
              placeholder="Short subtitle shown under title"
            />
          </Field>

          <Field
            label="Status"
            required
            inputId="service-status"
            error={errors.status}
            hint="Draft keeps this item private. Published shows it live."
          >
            <select
              id="service-status"
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              aria-invalid={errors.status ? true : undefined}
              style={getSelectStyles(!!errors.status)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
        </Section>

        <Section
          title="Service Content"
          description="Populate detailed overview text and bullet points."
        >
          <Field
            label="Long Description"
            inputId="service-long-description"
            hint="Main descriptive paragraph used in the Overview section."
          >
            <TextArea
              value={formData.longDescription}
              onChange={(value) => updateField("longDescription", value)}
              placeholder="Detailed overview paragraph"
              rows={5}
            />
          </Field>

          <Field
            label="Overview Points"
            inputId="service-points"
            hint="Enter one point per line."
          >
            <TextArea
              value={formData.points}
              onChange={(value) => updateField("points", value)}
              placeholder={"Technology strategy and roadmap planning\nProcess and platform advisory for SMEs\nVendor-neutral recommendations"}
              rows={4}
            />
          </Field>
        </Section>

        <Section
          title="Structured Detail Blocks"
          description="Add list-style detail content using row editors."
        >
          <RowEditor
            title="Service Stats"
            description="Example: Strategy Clarity | 92%"
            rowPrefix="service-stat"
            rows={statsRows}
            columns={[
              { key: "label", label: "Label", placeholder: "Strategy Clarity" },
              { key: "value", label: "Value", placeholder: "92%" },
            ]}
            addLabel="Add Stat"
            error={errors.stats}
            onChangeCell={updateStructuredRow(setStatsRows, "stats")}
            onAddRow={() => addRow(setStatsRows, () => ({ ...EMPTY_STAT_ROW }), "stats")}
            onRemoveRow={removeRow(setStatsRows, () => ({ ...EMPTY_STAT_ROW }), "stats")}
          />

          <RowEditor
            title="Included Features"
            description="Example: Technology Assessment | Capability and gap analysis."
            rowPrefix="service-feature"
            rows={featureRows}
            columns={[
              { key: "title", label: "Title", placeholder: "Technology Assessment" },
              { key: "description", label: "Description", placeholder: "Capability and gap analysis." },
            ]}
            addLabel="Add Feature"
            error={errors.features}
            onChangeCell={updateStructuredRow(setFeatureRows, "features")}
            onAddRow={() => addRow(setFeatureRows, () => ({ ...EMPTY_FEATURE_ROW }), "features")}
            onRemoveRow={removeRow(setFeatureRows, () => ({ ...EMPTY_FEATURE_ROW }), "features")}
          />

          <RowEditor
            title="Process Steps"
            description="Example: Evaluate | Assess current state and priorities."
            rowPrefix="service-process"
            rows={processRows}
            columns={[
              { key: "label", label: "Step Label", placeholder: "Evaluate" },
              { key: "description", label: "Description", placeholder: "Assess current state and priorities." },
            ]}
            addLabel="Add Process Step"
            error={errors.process}
            onChangeCell={updateStructuredRow(setProcessRows, "process")}
            onAddRow={() => addRow(setProcessRows, () => ({ ...EMPTY_PROCESS_ROW }), "process")}
            onRemoveRow={removeRow(setProcessRows, () => ({ ...EMPTY_PROCESS_ROW }), "process")}
          />

          <button
            type="button"
            onClick={() => setShowAdvancedStructuredInput((prev) => !prev)}
            style={{
              alignSelf: "start",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              padding: "0.45rem 0.7rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            aria-expanded={showAdvancedStructuredInput}
          >
            {showAdvancedStructuredInput ? "Hide" : "Show"} Advanced Raw Text
          </button>

          {showAdvancedStructuredInput && (
            <div
              style={{
                display: "grid",
                gap: "0.75rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background: "#f8fafc",
                padding: "0.875rem",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#475569" }}>
                Raw mode accepts one item per line using <strong>Label|Value</strong> format.
              </p>

              <Field label="Raw Stats" inputId="service-stats-raw">
                <TextArea
                  value={formData.stats}
                  onChange={(value) =>
                    applyRawStructuredValue("stats", value, setStatsRows, "label", "value", "stats")
                  }
                  placeholder={"Strategy Clarity|92%\nExecution Accuracy|91%"}
                  rows={4}
                />
              </Field>

              <Field label="Raw Features" inputId="service-features-raw">
                <TextArea
                  value={formData.features}
                  onChange={(value) =>
                    applyRawStructuredValue("features", value, setFeatureRows, "title", "description", "features")
                  }
                  placeholder={"Digital Strategy Advisory|Practical strategy aligned with business KPIs."}
                  rows={4}
                />
              </Field>

              <Field label="Raw Process" inputId="service-process-raw">
                <TextArea
                  value={formData.process}
                  onChange={(value) =>
                    applyRawStructuredValue("process", value, setProcessRows, "label", "description", "process")
                  }
                  placeholder={"Evaluate|Assess current state and priorities."}
                  rows={4}
                />
              </Field>
            </div>
          )}
        </Section>

        <Section
          title="Call To Action"
          description="Configure the final conversion card shown at the bottom of the detail page."
        >
          <Field label="CTA Title" inputId="service-cta-title">
            <TextInput
              value={formData.ctaTitle}
              onChange={(value) => updateField("ctaTitle", value)}
              placeholder="Ready to Get Started?"
            />
          </Field>

          <Field label="CTA Description" inputId="service-cta-description">
            <TextArea
              value={formData.ctaDescription}
              onChange={(value) => updateField("ctaDescription", value)}
              placeholder="Describe why users should contact your team."
              rows={3}
            />
          </Field>

          <Field
            label="CTA Button Label"
            inputId="service-cta-button-label"
            error={errors.ctaButtonLabel}
            hint={`Keep this short (max ${MAX_CTA_BUTTON_LABEL_LENGTH} characters).`}
          >
            <TextInput
              value={formData.ctaButtonLabel}
              onChange={(value) => updateField("ctaButtonLabel", value)}
              placeholder="Schedule Consultation"
            />
          </Field>
          <p
            style={{
              margin: "-0.5rem 0 0 0",
              fontSize: "0.72rem",
              color: formData.ctaButtonLabel.length > MAX_CTA_BUTTON_LABEL_LENGTH ? "#b91c1c" : "#64748b",
            }}
          >
            {formData.ctaButtonLabel.length}/{MAX_CTA_BUTTON_LABEL_LENGTH}
          </p>
        </Section>

        <Section
          title="Media"
          description="Upload a hero image and review the current preview. Accepted formats: image files under 5MB."
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
              disabled={uploading || submitting}
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
                cursor: uploading || submitting ? "not-allowed" : "pointer",
                opacity: uploading || submitting ? 0.65 : 1,
                fontSize: "0.875rem",
                fontWeight: 500,
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
                transition: "all 0.15s ease-in-out",
              }}
            >
              <UploadCloud size={16} />
              {uploading ? "Uploading image..." : "Drag and drop image or click to upload"}
            </button>
            <p
              aria-live="polite"
              style={{ margin: "0.5rem 0 0 0", fontSize: "0.75rem", color: "#64748b" }}
            >
              {uploading ? "Upload in progress. Please wait..." : "PNG, JPG, WEBP and other standard image formats are supported."}
            </p>
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
          title="Classification"
          description="Choose icon and category used in organization and list filtering."
        >
          <Field
            label="Icon"
            inputId="service-icon"
            error={errors.icon}
            hint="Pick the icon that best matches this service type."
          >
            <select
              id="service-icon"
              value={formData.icon}
              onChange={(e) => updateField("icon", e.target.value)}
              style={getSelectStyles(!!errors.icon)}
            >
              <option value="package">📦 Package</option>
              <option value="tool">🔧 Tool</option>
              <option value="settings">⚙️ Settings</option>
              <option value="star">⭐ Star</option>
            </select>
          </Field>

          <Field
            label="Category"
            inputId="service-category"
            error={errors.category}
            hint={`Used in admin grouping (max ${MAX_CATEGORY_LENGTH} characters).`}
          >
            <TextInput
              value={formData.category}
              onChange={(value) => updateField("category", value)}
              placeholder="General"
            />
          </Field>
          <p
            style={{
              margin: "-0.5rem 0 0 0",
              fontSize: "0.72rem",
              color: formData.category.length > MAX_CATEGORY_LENGTH ? "#b91c1c" : "#64748b",
            }}
          >
            {formData.category.length}/{MAX_CATEGORY_LENGTH}
          </p>
        </Section>

        <Section
          title="Live Detail Preview"
          description="Always-on preview of how this content appears in your offering detail page."
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

            <div style={{ padding: "18px", display: "grid", gap: "16px", maxHeight: "720px", overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
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
                  What&apos;s Included
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
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

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
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