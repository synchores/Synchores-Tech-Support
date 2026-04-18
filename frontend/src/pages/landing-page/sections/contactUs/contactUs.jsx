import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { GoogleMap, Marker, useLoadScript, OverlayView } from "@react-google-maps/api";

const contactBg = "https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMFVJJTIwZGVzaWduJTIwc2NyZWVuJTIwbW9kZXJufGVufDF8fHx8MTc3NjEzOTgwNXww&ixlib=rb-4.1.0&q=80&w=1080";

const contactInfo = [
  { icon: Phone, label: "PHONE", value: "+63 977 322 3796" },
  { icon: Phone, label: "LANDLINE", value: "(046) 884 6572" },
  { icon: Mail, label: "EMAIL", value: "info@synchores.com" },
  { icon: MapPin, label: "ADDRESS", value: "KM 27, Emilio Aguinaldo Highway, Anabu 2F, Imus City, Cavite 4103 PH" },
];

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

export function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const mapCenter = { lat: 14.365098137849008, lng: 120.93677433750133 };
  const mapContainerStyle = {
    width: "100%",
    height: "260px",
    border: "1px solid var(--landing-border-strong)",
    borderRadius: "2px",
    overflow: "hidden",
  };
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "cooperative",
    clickableIcons: false,
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  return (
    <section id="contact" style={{ backgroundColor: "var(--landing-bg-strong)" }}>
      {/* Top image band */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={contactBg}
          alt="Contact"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,74,136,0.16) 0%, var(--landing-bg-strong) 100%)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#1e7fd4",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              margin: "0 0 12px 0",
            }}>
              LET'S WORK TOGETHER
            </p>
            <h2 style={{
              fontFamily: "'Orbitron', Arial, sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              fontWeight: 700,
              color: "var(--landing-text)",
              lineHeight: 1.25,
              margin: 0,
              textTransform: "uppercase",
            }}>
              HOW CAN WE HELP?
            </h2>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px",
        }}>
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              fontFamily: "'Inter', Arial, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "var(--landing-text-muted)",
              lineHeight: 1.67,
              margin: "0 0 40px 0",
            }}>
              Ready to transform your IT infrastructure? Our team of experts is here
              to help. Reach out and we'll get back to you within one business day.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--landing-border-strong)",
                    borderRadius: "2px",
                    backgroundColor: "var(--landing-surface)",
                  }}>
                    <Icon size={16} color="#1e7fd4" />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#1e7fd4",
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      margin: "0 0 4px 0",
                    }}>{label}</p>
                    <p style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "var(--landing-text-muted)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div style={{ marginTop: "40px" }}>
              <p style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#1e7fd4",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                margin: "0 0 16px 0",
              }}>BUSINESS HOURS</p>
              {[
                { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
                { day: "Sunday", hours: "Closed" },
              ].map(({ day, hours }) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--landing-border)",
                  }}
                >
                  <span style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "14px",
                    color: "var(--landing-text-muted)",
                  }}>{day}</span>
                  <span style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "14px",
                    color: "var(--landing-text-soft)",
                    fontWeight: 700,
                  }}>{hours}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "64px 32px",
                textAlign: "center",
                border: "1px solid var(--landing-border)",
                borderRadius: "2px",
              }}>
                <CheckCircle size={56} color="#1e7fd4" style={{ marginBottom: "24px" }} />
                <h3 style={{
                  fontFamily: "'Orbitron', Arial, sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--landing-text)",
                  textTransform: "uppercase",
                  margin: "0 0 12px 0",
                }}>MESSAGE SENT</h3>
                <p style={{
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: "15px",
                  color: "var(--landing-text-muted)",
                  lineHeight: 1.67,
                  margin: "0 0 24px 0",
                }}>
                  Thank you for reaching out. We'll respond within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                  style={{
                    background: "transparent",
                    border: "1px solid #1e7fd4",
                    borderRadius: "2px",
                    padding: "8px 20px",
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1e7fd4",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="FULL NAME" name="name" type="text" placeholder="Enter Name" value={form.name} onChange={handleChange} required focused={focused} setFocused={setFocused} />
                  <Field label="EMAIL ADDRESS" name="email" type="email" placeholder="Enter Email" value={form.email} onChange={handleChange} required focused={focused} setFocused={setFocused} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <Field label="PHONE" name="phone" type="tel" placeholder="Enter Phone" value={form.phone} onChange={handleChange} focused={focused} setFocused={setFocused} />
                  <div>
                    <p style={{
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#1e7fd4",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      margin: "0 0 6px 0",
                    }}>SERVICE NEEDED</p>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        borderColor: focused === "service" ? "#1e7fd4" : "var(--landing-border-strong)",
                        color: form.service ? "var(--landing-text)" : "var(--landing-text-soft)",
                        cursor: "pointer",
                      }}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="network">Network Infrastructure</option>
                      <option value="software">Software & Web Development</option>
                      <option value="consultancy">Tech Consultancy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#1e7fd4",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    margin: "0 0 6px 0",
                  }}>MESSAGE</p>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your IT needs..."
                    style={{
                      ...inputStyle,
                      borderColor: focused === "message" ? "#1e7fd4" : "var(--landing-border-strong)",
                      resize: "none",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <button
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
                </button>

                <div style={{ marginTop: "24px" }}>
                  {loadError ? (
                    <div style={{
                      padding: "16px",
                      border: "1px solid var(--landing-border)",
                      borderRadius: "2px",
                      color: "var(--landing-text-muted)",
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: "14px",
                    }}>
                      Map failed to load. Please check your Google Maps API key.
                    </div>
                  ) : (
                    isLoaded && (
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={18}
                        options={mapOptions}
                      >
                        <Marker
                          position={mapCenter}
                          title="Synchores Information Technology Solutions"
                        />
                        <OverlayView
                          position={mapCenter}
                          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                          <div
                            style={{
                              transform: "translate(14px, -26px)",
                              color: "#d32f2f",
                              fontFamily: "'Inter', Arial, sans-serif",
                              fontSize: "14px",
                              fontWeight: 700,
                              background: "transparent",
                              whiteSpace: "nowrap",
                              textShadow: "0 0 1px rgba(255,255,255,0.95)",
                              pointerEvents: "none",
                            }}
                          >
                            Synchores Information Technology Solutions
                          </div>
                        </OverlayView>
                      </GoogleMap>
                    )
                  )}
                  {!loadError && !isLoaded && (
                    <div style={{
                      height: mapContainerStyle.height,
                      border: mapContainerStyle.border,
                      borderRadius: mapContainerStyle.borderRadius,
                      background: "var(--landing-surface-soft)",
                    }} />
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type, placeholder, value, onChange, required, focused, setFocused,
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
      <p style={{
        fontFamily: "'Inter', Arial, sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        color: "#1e7fd4",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        margin: "0 0 6px 0",
      }}>{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={fieldInputStyle}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
      />
    </div>
  );
}

export default ContactUs;
