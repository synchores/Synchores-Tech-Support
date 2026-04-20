import { Children, cloneElement, isValidElement } from "react";

export function Field({
  label,
  hint,
  error,
  required = false,
  inputId,
  children,
}) {
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;
  const errorId = error && inputId ? `${inputId}-error` : undefined;

  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const describedBy = [
      child.props["aria-describedby"],
      hintId,
      errorId,
    ]
      .filter(Boolean)
      .join(" ");

    return cloneElement(child, {
      id: child.props.id || inputId,
      required: child.props.required ?? required,
      "aria-required": required ? true : child.props["aria-required"],
      "aria-invalid": error ? true : child.props["aria-invalid"],
      "aria-describedby": describedBy || undefined,
    });
  });

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: `var(--muted-foreground)` }}
      >
        {label}
        {required && (
          <span style={{ color: "#dc2626", marginLeft: "0.25rem" }}>
            *
          </span>
        )}
      </label>
      {hint && (
        <p
          id={hintId}
          className="text-[11px] -mt-1"
          style={{ color: `var(--muted-foreground)` }}
        >
          {hint}
        </p>
      )}
      {enhancedChildren}
      {error && (
        <p
          id={errorId}
          className="text-[11px]"
          style={{ color: "#b91c1c" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  onBlur,
  type = "text",
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      {...rest}
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
  id,
  value,
  onChange,
  placeholder,
  rows = 3,
  disabled = false,
  className = "",
  onBlur,
  ...rest
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onBlur={onBlur}
      {...rest}
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
