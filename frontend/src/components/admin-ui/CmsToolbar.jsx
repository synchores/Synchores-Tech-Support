import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export function CmsToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  categories,
  view,
  onViewChange,
  onCreate,
  createLabel,
  selectedCount,
  onBulkDelete,
  onBulkPublish,
  onBulkArchive,
  onClearSelection,
}) {
  const [focusedSelect, setFocusedSelect] = useState(null);

  const selectShellBaseStyle = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    height: "43px",
    borderRadius: "0.375rem",
    background: "linear-gradient(180deg, var(--input-background) 0%, #ffffff 100%)",
    border: "1px solid var(--border)",
    transition: "all 0.15s ease-in-out",
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  };

  const selectBaseStyle = {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    height: "100%",
    width: "100%",
    border: "none",
    background: "transparent",
    color: "var(--foreground)",
    fontSize: "0.875rem",
    padding: "0 2.1rem 0 0.75rem",
    cursor: "pointer",
    outline: "none",
  };

  return (
    <div className="space-y-4">
      {/* Main controls row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.875rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          padding: "1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1 1 320px",
            minWidth: "240px",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted-foreground)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, description, category..."
            style={{
              width: "100%",
              height: "43px",
              paddingLeft: "2.5rem",
              paddingRight: "0.875rem",
              background: "var(--input-background)",
              color: "var(--foreground)",
              border: "1px solid rgba(15, 23, 42, 0.22)",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              transition: "all 0.15s ease-in-out",
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#06b6d4";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.22)";
              e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.06)";
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "0.625rem",
            flex: "1 1 360px",
            marginLeft: "auto",
          }}
        >
          <div
            style={{
              ...selectShellBaseStyle,
              minWidth: "150px",
              borderColor:
                focusedSelect === "status" ? "#06b6d4" : "var(--border)",
              boxShadow:
                focusedSelect === "status"
                  ? "0 0 0 3px rgba(6, 182, 212, 0.12)"
                  : "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
            onMouseEnter={(e) => {
              if (focusedSelect !== "status") {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(15, 23, 42, 0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (focusedSelect !== "status") {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04)";
              }
            }}
          >
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              style={selectBaseStyle}
              onFocus={() => {
                setFocusedSelect("status");
              }}
              onBlur={() => {
                setFocusedSelect(null);
              }}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown
              size={16}
              style={{
                position: "absolute",
                right: "0.625rem",
                color: "var(--muted-foreground)",
                pointerEvents: "none",
                transition: "transform 0.15s ease-in-out",
                transform:
                  focusedSelect === "status" ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>

          <div
            style={{
              ...selectShellBaseStyle,
              minWidth: "160px",
              borderColor:
                focusedSelect === "category" ? "#06b6d4" : "var(--border)",
              boxShadow:
                focusedSelect === "category"
                  ? "0 0 0 3px rgba(6, 182, 212, 0.12)"
                  : "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
            onMouseEnter={(e) => {
              if (focusedSelect !== "category") {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(15, 23, 42, 0.06)";
              }
            }}
            onMouseLeave={(e) => {
              if (focusedSelect !== "category") {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.04)";
              }
            }}
          >
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              style={selectBaseStyle}
              onFocus={() => {
                setFocusedSelect("category");
              }}
              onBlur={() => {
                setFocusedSelect(null);
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              style={{
                position: "absolute",
                right: "0.625rem",
                color: "var(--muted-foreground)",
                pointerEvents: "none",
                transition: "transform 0.15s ease-in-out",
                transform:
                  focusedSelect === "category"
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </div>

          {/* View toggle */}
          <div
            className="inline-flex rounded-md overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              height: "43px",
            }}
          >
            <button
              type="button"
              onClick={() => onViewChange("table")}
              title="Switch to table view"
              className="px-3 text-xs font-medium transition-colors"
              style={{
                background: view === "table" ? "#3b82f6" : "transparent",
                color: view === "table" ? "white" : "var(--foreground)",
                height: "100%",
                minWidth: "64px",
              }}
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              title="Switch to grid view"
              className="px-3 text-xs font-medium transition-colors"
              style={{
                background: view === "grid" ? "#3b82f6" : "transparent",
                color: view === "grid" ? "white" : "var(--foreground)",
                borderLeft: "1px solid var(--border)",
                height: "100%",
                minWidth: "64px",
              }}
            >
              Grid
            </button>
          </div>

          <button
            type="button"
            onClick={onCreate}
            title="Create a new service"
            style={{
              height: "43px",
              background: "#3b82f6",
              color: "white",
              border: "1px solid #3b82f6",
              borderRadius: "0.375rem",
              padding: "0 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563eb";
              e.currentTarget.style.borderColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3b82f6";
              e.currentTarget.style.borderColor = "#3b82f6";
            }}
          >
            {createLabel}
          </button>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          title="Filter by all categories"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: category === "all" ? "#3b82f6" : "var(--accent)",
            color: category === "all" ? "white" : "var(--muted-foreground)",
            border: category === "all" ? "none" : "1px solid var(--border)",
            borderRadius: "1.5rem",
            padding: "0.375rem 0.75rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s ease-in-out",
          }}
          onMouseEnter={(e) => {
            if (category !== "all") {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (category !== "all") {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--border)";
            }
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            title={`Filter by ${cat}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: category === cat ? "#3b82f6" : "var(--accent)",
              color: category === cat ? "white" : "var(--muted-foreground)",
              border: category === cat ? "none" : "1px solid var(--border)",
              borderRadius: "1.5rem",
              padding: "0.375rem 0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (category !== cat) {
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (category !== cat) {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--border)";
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bulk action bar */}
      {selectedCount > 0 && (
        <div
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {selectedCount} selected
          </span>
          <div className="flex-1"></div>
          <button
            type="button"
            onClick={onBulkPublish}
            title="Publish selected services"
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#22c55e";
            }}
          >
            Publish
          </button>
          <button
            type="button"
            onClick={onBulkArchive}
            title="Archive selected services"
            style={{
              background: "transparent",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Archive
          </button>
          <button
            type="button"
            onClick={onBulkDelete}
            title="Delete selected services"
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dc2626";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ef4444";
            }}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={onClearSelection}
            title="Clear current selection"
            style={{
              background: "transparent",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "0.375rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
