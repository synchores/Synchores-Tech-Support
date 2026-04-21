import { COMPANY_SETTINGS_SECTIONS } from "../../../hooks/useAdminCompanySettingsPage";

export function CompanySettingsHeaderPanel({ openSectionCount, onExpandAll, onCollapseAll }) {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
        Company Settings
      </h1>
      <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
        Manage your company information and contact details
      </p>

      <div className="settings-guidance-card mt-4">
        <p className="settings-guidance-title">How to edit</p>
        <p className="settings-guidance-text">
          All sections are collapsed by default. Click any section header to open only what you want to edit.
        </p>
        <p className="settings-guidance-text">
          Changes auto-save when you leave a field, and you can also use Save Unsaved for batch updates.
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          className="h-8 px-3 rounded-lg border text-xs font-semibold"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
          onClick={onExpandAll}
        >
          Expand all
        </button>
        <button
          type="button"
          className="h-8 px-3 rounded-lg border text-xs font-semibold"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
          onClick={onCollapseAll}
        >
          Collapse all
        </button>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {openSectionCount} of {COMPANY_SETTINGS_SECTIONS.length} sections open
        </span>
      </div>
    </div>
  );
}

export default CompanySettingsHeaderPanel;
