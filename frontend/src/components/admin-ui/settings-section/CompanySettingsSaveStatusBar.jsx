import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";

export function CompanySettingsSaveStatusBar({
  saveState,
  isDirty,
  isSaving,
  dirtyCount,
  onDiscard,
  onSaveAll,
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 text-sm rounded-lg p-3"
      style={{
        background:
          saveState.status === "saving"
            ? "#eff6ff"
            : saveState.status === "saved"
            ? "#ecfdf5"
            : saveState.status === "error"
            ? "#fef2f2"
            : "var(--accent)",
        color:
          saveState.status === "saving"
            ? "#1d4ed8"
            : saveState.status === "saved"
            ? "#166534"
            : saveState.status === "error"
            ? "#b91c1c"
            : "var(--foreground)",
        border: "1px solid var(--border)",
      }}
    >
      {saveState.status === "saving" && <Loader2 size={16} className="animate-spin" />}
      {saveState.status === "saved" && <CheckCircle2 size={16} />}
      {saveState.status === "error" && <AlertCircle size={16} />}
      {saveState.status === "idle" && <Info size={16} />}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex flex-col">
          <span>{saveState.message}</span>
          {saveState.lastSavedAt && (
            <span style={{ fontSize: "12px", opacity: 0.85 }}>
              Last saved at {new Date(saveState.lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isDirty ? (
            <>
              <button
                type="button"
                onClick={onDiscard}
                disabled={isSaving}
                title="Discard all unsaved edits"
                className="h-9 px-3 rounded-lg border text-sm font-medium transition"
                style={{
                  borderColor: "var(--border, #cbd5e1)",
                  background: "var(--background, #ffffff)",
                  color: "var(--foreground, #0f172a)",
                  opacity: isSaving ? 0.55 : 1,
                  cursor: isSaving ? "not-allowed" : "pointer",
                }}
              >
                Discard Unsaved
              </button>
              <button
                type="button"
                onClick={onSaveAll}
                disabled={isSaving}
                title="Save all unsaved edits"
                className="h-9 px-3 rounded-lg text-sm font-semibold transition"
                style={{
                  background: "var(--primary, #0f172a)",
                  color: "var(--primary-foreground, #ffffff)",
                  border: "1px solid var(--primary, #0f172a)",
                  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.14)",
                  opacity: isSaving ? 0.55 : 1,
                  cursor: isSaving ? "not-allowed" : "pointer",
                }}
              >
                {isSaving ? "Saving..." : `Save ${dirtyCount} Unsaved`}
              </button>
            </>
          ) : (
            <div
              className="h-9 px-3 rounded-lg border flex items-center gap-2 text-sm font-medium"
              style={{
                borderColor: "var(--border, #cbd5e1)",
                background: "var(--background, #ffffff)",
                color: "var(--muted-foreground, #64748b)",
              }}
            >
              <CheckCircle2 size={14} />
              All changes saved
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanySettingsSaveStatusBar;
