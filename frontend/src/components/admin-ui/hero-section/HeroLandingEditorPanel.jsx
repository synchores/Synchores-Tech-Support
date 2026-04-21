import { Type, FileText, Image as ImageIcon } from "lucide-react";
import { TextInput, TextArea } from "../field";
import { ImageUpload } from "../../landing-page/image-upload";

function getMediaPreviewSrc(path) {
  return `http://localhost:3000${path}`;
}

export function HeroLandingEditorPanel({
  formData,
  isVideo,
  isSaving,
  onFieldChange,
  onFieldBlur,
  onImageUpload,
}) {
  return (
    <div className="flex-1">
      <div
        className="rounded-lg border shadow-sm p-6 space-y-6"
        style={{ backgroundColor: "#f8fafc", borderColor: "var(--border)" }}
      >
        <div className="admin-section-panel space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                <Type size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Headline</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  Main hero lines (use Enter to split into two lines)
                </p>
              </div>
            </div>
            <TextArea
              value={formData.headline}
              onChange={(val) => onFieldChange("headline", val)}
              onBlur={() => onFieldBlur("headline")}
              placeholder={"Scalable Tech Solutions\nBuilt for your"}
              rows={2}
              disabled={isSaving}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                <FileText size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Tagline</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Supporting text for the hero</p>
              </div>
            </div>
            <TextArea
              value={formData.tagline}
              onChange={(val) => onFieldChange("tagline", val)}
              onBlur={() => onFieldBlur("tagline")}
              placeholder="Enter your hero tagline or subtitle..."
              rows={4}
              disabled={isSaving}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                <FileText size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Focus Text</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Animated words in hero headline</p>
              </div>
            </div>
            <TextInput
              value={formData.focusText}
              onChange={(val) => onFieldChange("focusText", val)}
              onBlur={() => onFieldBlur("focusText")}
              placeholder="BUSINESS SUCCESS"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="admin-section-panel space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
                <ImageIcon size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)" }}>Background Media</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  Hero section background image or video
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {formData.backgroundImage && (
                <div
                  className="relative w-full h-40 rounded-xl overflow-hidden"
                  style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
                >
                  {isVideo ? (
                    <video
                      src={getMediaPreviewSrc(formData.backgroundImage)}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={getMediaPreviewSrc(formData.backgroundImage)}
                      alt="Hero background"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}
              <ImageUpload
                onUpload={onImageUpload}
                disabled={isSaving}
                accept="image/*,video/*"
                buttonLabel="Click to upload image or video"
                busyLabel="Uploading media..."
                ariaLabel="Upload background media"
                fileTypeLabel="image or video"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroLandingEditorPanel;
