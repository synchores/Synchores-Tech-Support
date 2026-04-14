export function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: `var(--muted-foreground)` }}
      >
        {label}
      </label>
      {hint && (
        <p
          className="text-[11px] -mt-1"
          style={{ color: `var(--muted-foreground)` }}
        >
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  onBlur,
  type = "text",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      className={`w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
      backgroundColor: `#ffffff`,
      borderColor: `var(--border)`,
      color: `var(--foreground)`,
      border: `1px solid var(--border)`,
      }}
    />
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
  disabled = false,
  className = "",
  onBlur,
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onBlur={onBlur}
      className={`w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
      backgroundColor: `#ffffff`,
      borderColor: `var(--border)`,
      color: `var(--foreground)`,
      border: `1px solid var(--border)`,
      }}
    />
  );
}
