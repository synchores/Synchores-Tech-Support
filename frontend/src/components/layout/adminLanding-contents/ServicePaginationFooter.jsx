export function ServicePaginationFooter({
  totalItems,
  pageStart,
  pageEnd,
  pageSize,
  currentPage,
  totalPages,
  onPageSizeChange,
  onGoToPage,
}) {
  return (
    <div
      className="rounded-lg border px-3 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        {totalItems > 0
          ? `Showing ${pageStart + 1}-${pageEnd} of ${totalItems} services`
          : "No services to display"}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Per page
        </label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          title="Choose items per page"
          className="h-8 px-2 rounded border text-xs"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

        <button
          type="button"
          onClick={() => onGoToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          title="Go to previous page"
          className="h-8 px-3 rounded border text-xs"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
            opacity: currentPage <= 1 ? 0.5 : 1,
            cursor: currentPage <= 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onGoToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          title="Go to next page"
          className="h-8 px-3 rounded border text-xs"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
            color: "var(--foreground)",
            opacity: currentPage >= totalPages ? 0.5 : 1,
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
