export function ServiceArchivedModePanel({
  showArchived,
  archivedCount,
  onToggleArchived,
}) {
  return (
    <div
      className="rounded-lg border px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
      }}
    >
      <label
        className="inline-flex items-center gap-2 text-sm cms-checkbox-hitbox"
        style={{ color: "var(--foreground)" }}
        title="Toggle archived mode"
      >
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => onToggleArchived(e.target.checked)}
          className="cms-checkbox-input"
          aria-label="Toggle archived mode"
        />
        Archived Mode
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "var(--accent)",
            color: "var(--muted-foreground)",
          }}
        >
          {archivedCount}
        </span>
      </label>
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        {showArchived
          ? "Archived mode: only archived services are visible."
          : "Active mode: only draft and published services are visible."}
      </p>
    </div>
  );
}
