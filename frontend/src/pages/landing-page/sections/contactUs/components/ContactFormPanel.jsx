import { motion } from "motion/react";
import { CheckCircle, Send } from "lucide-react";
import ContactMap from "./ContactMap";
import ContactField from "./ContactField";

const inputStyle = {
  width: "100%",
  backgroundColor: "var(--landing-surface)",
  border: "1px solid var(--landing-border-strong)",
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

export default function ContactFormPanel({
  form,
  loading,
  submitted,
  focused,
  onChange,
  onSubmit,
  onReset,
  onFocus,
  onBlur,
  isLoaded,
  loadError,
  mapCenter,
  mapContainerStyle,
  mapOptions,
  cooldownRemaining = 0,
  errors = {},
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {submitted ? (
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "64px 32px",
            textAlign: "center",
            border: "1px solid var(--landing-border)",
            borderRadius: "2px",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CheckCircle size={56} color="#1e7fd4" style={{ marginBottom: "24px" }} />
          </motion.div>
          <h3
            style={{
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--landing-text)",
              textTransform: "uppercase",
              margin: "0 0 12px 0",
            }}
          >
            MESSAGE SENT
          </h3>
          <p
            style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "15px",
              color: "var(--landing-text-muted)",
              lineHeight: 1.67,
              margin: "0 0 24px 0",
            }}
          >
            Thank you for reaching out. The team will respond ASAP.
          </p>
          <button
            onClick={onReset}
            disabled={cooldownRemaining > 0}
            style={{
              background: cooldownRemaining > 0 ? "rgba(30,127,212,0.3)" : "transparent",
              border: "1px solid #1e7fd4",
              borderRadius: "2px",
              padding: "8px 20px",
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#1e7fd4",
              cursor: cooldownRemaining > 0 ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: cooldownRemaining > 0 ? 0.6 : 1,
              transition: "all 0.2s",
            }}
          >
            {cooldownRemaining > 0 ? `WAIT ${cooldownRemaining}S` : "SEND ANOTHER"}
          </button>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          >
            <ContactField
              label="NAME"
              name="name"
              type="text"
              placeholder="Enter Name"
              required
              error={errors.name}
              value={form.name}
              onChange={onChange}
              maxLength={100}
              focused={focused}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <ContactField
              label="EMAIL ADDRESS"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={onChange}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              error={errors.email}
              focused={focused}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </motion.div>
          <motion.div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <ContactField
              label="PHONE"
              name="phone"
              type="tel"
              placeholder="Enter Phone"
              value={form.phone}
              onChange={onChange}
              maxLength={20}
              focused={focused}
              onFocus={onFocus}
              onBlur={onBlur}
            />
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
                SERVICE NEEDED
                <span style={{ color: "#ff4444", fontSize: "12px" }}>*</span>
              </p>
              <select
                name="service"
                value={form.service}
                onChange={onChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.service ? "#ff4444" : focused === "service" ? "#1e7fd4" : "var(--landing-border-strong)",
                  color: form.service ? "var(--landing-text)" : "var(--landing-text-soft)",
                  cursor: "pointer",
                }}
                onFocus={() => onFocus("service")}
                onBlur={onBlur}
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="network">Network Infrastructure</option>
                <option value="software">Software & Web Development</option>
                <option value="consultancy">Tech Consultancy</option>
                <option value="other">Other</option>
              </select>
              {errors.service && (
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
                  {errors.service}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          >
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
              MESSAGE
              <span style={{ color: "#ff4444", fontSize: "12px" }}>*</span>
            </p>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              maxLength={1000}
              placeholder="Tell us about your IT needs..."
              style={{
                ...inputStyle,
                borderColor: errors.message ? "#ff4444" : focused === "message" ? "#1e7fd4" : "var(--landing-border-strong)",
                resize: "none",
              }}
              onFocus={() => onFocus("message")}
              onBlur={onBlur}
            />
            {errors.message && (
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
                {errors.message}
              </p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "rgba(30,127,212,0.3)" : "transparent",
              border: "2px solid #1e7fd4",
              borderRadius: "2px",
              padding: "13px 24px",
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1e7fd4",
              cursor: loading ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "background 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "#1eaedb";
                e.currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1e7fd4";
              }
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.75" />
                </svg>
                SENDING...
              </>
            ) : (
              <>
                <Send size={15} />
                SEND MESSAGE
              </>
            )}
          </motion.button>

          <motion.div
            style={{ marginTop: "24px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          >
            <ContactMap
              isLoaded={isLoaded}
              loadError={loadError}
              mapCenter={mapCenter}
              mapContainerStyle={mapContainerStyle}
              mapOptions={mapOptions}
            />
          </motion.div>
        </form>
      )}
    </motion.div>
  );
}
