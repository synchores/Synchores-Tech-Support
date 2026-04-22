export default function ContactField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  focused,
  onFocus,
  onBlur,
  pattern,
  maxLength,
  error,
}) {
  const fieldInputStyle = {
    width: "100%",
    backgroundColor: "var(--landing-surface)",
    border: `1px solid ${error ? "#ff4444" : focused === name ? "#1e7fd4" : "var(--landing-border-strong)"}`,
    borderRadius: "2px",
    padding: "11px 13px",
    fontFamily: "'Inter', Arial, sans-serif",
    fontSize: "15px",
    fontWeight: 400,
    color: "var(--landing-text)",
    outline: "none",
    lineHeight: 1.5,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div>
      <p
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          fontSize: "10px",
          fontWeight: 700,
          color: "#1e7fd4",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: "0 0 6px 0",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {label}
        {required && <span style={{ color: "#ff4444", fontSize: "12px" }}>*</span>}
      </p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        style={fieldInputStyle}
        onFocus={() => onFocus(name)}
        onBlur={onBlur}
      />
      {error && (
        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: "#ff4444",
            margin: "4px 0 0 0",
            padding: 0,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
