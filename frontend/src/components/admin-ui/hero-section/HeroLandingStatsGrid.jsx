import {
  Type,
  FileText,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  ImageOff,
  Video,
} from "lucide-react";

export function HeroLandingStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        className="rounded-lg p-4 flex items-center justify-between shadow-sm"
        style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Status</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {stats.isActive ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="rounded-full p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
          {stats.isActive ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
        </div>
      </div>

      <div
        className="rounded-lg p-4 flex items-center justify-between shadow-sm"
        style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Last Updated</p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--foreground)",
              lineHeight: 1.2,
            }}
          >
            {stats.lastUpdated}
          </p>
        </div>
        <div className="rounded-full p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
          <Clock size={18} />
        </div>
      </div>

      <div
        className="rounded-lg p-4 flex items-center justify-between shadow-sm"
        style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Headline length</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {stats.headlineLength} chars
          </p>
        </div>
        <div className="rounded-full p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
          <Type size={18} />
        </div>
      </div>

      <div
        className="rounded-lg p-4 flex items-center justify-between shadow-sm"
        style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Focus text length</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {stats.focusLength} chars
          </p>
        </div>
        <div className="rounded-full p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
          <FileText size={18} />
        </div>
      </div>

      <div
        className="rounded-lg p-4 flex items-center justify-between shadow-sm"
        style={{ background: "#f8fafc", border: "1px solid var(--border)" }}
      >
        <div className="flex flex-col gap-1">
          <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>Background media</p>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--foreground)",
              lineHeight: 1,
            }}
          >
            {stats.hasImage ? (stats.isVideo ? "Video" : "Image") : "Not set"}
          </p>
        </div>
        <div className="rounded-full p-2" style={{ background: "#f8fafc", color: "var(--foreground)" }}>
          {stats.hasImage ? (stats.isVideo ? <Video size={18} /> : <ImageIcon size={18} />) : <ImageOff size={18} />}
        </div>
      </div>
    </div>
  );
}

export default HeroLandingStatsGrid;
