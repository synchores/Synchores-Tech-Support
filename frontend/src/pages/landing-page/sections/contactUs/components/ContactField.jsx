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
}) {
  const fieldInputStyle = {
    width: "100%",
    backgroundColor: "var(--landing-surface)",
    border: `1px solid ${focused === name ? "#1e7fd4" : "var(--landing-border-strong)"}`,
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
        }}
      >
        {label}
      </p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={fieldInputStyle}
        onFocus={() => onFocus(name)}
        onBlur={onBlur}
      />
    </div>
  );
}
