import { useNavigate, useLocation } from "react-router-dom";

function resolveAssetUrl(path, fallback) {
  if (!path) return fallback;
  return path.startsWith("/uploads/") ? `http://localhost:3000${path}` : path;
}

function normalizeExternalUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function Footer({ companyInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const topLogo = resolveAssetUrl(companyInfo?.companyLogo, "/assets/Synchores-logo.png");
  const bottomLogo = resolveAssetUrl(companyInfo?.companyLogo, "/assets/synchores-color.png");
  const logoAlt = companyInfo?.companyLogoAlt || "Synchores Logo";
  const footerBrandText =
    companyInfo?.footerBrandText ||
    "We specialize in delivering customized digital solutions that empower businesses to operate more efficiently and securely.";
  const phoneMobile = companyInfo?.phoneMobile || "+63 977 322 3796";
  const phoneMain = companyInfo?.phoneMain || "(046) 884 6572";
  const email = companyInfo?.email || "info@synchores.com";
  const address =
    companyInfo?.address ||
    "KM 27, Emilio Aguinaldo Highway, Anabu 2F, Imus City, Cavite 4103 PH";

  const defaultSocialLinks = {
    facebook: "https://www.facebook.com/synchores.itsolutions",
    instagram: "https://www.instagram.com/synchores.itsolutions/",
    youtube: "https://www.youtube.com/@SynchoresIT",
  };

  const handleNav = (sectionId) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "offering", label: "Offerings" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  const resourceLinks = [
    { label: "IT Consulting", url: "/offering/tech-consultancy" },
    { label: "Infrastructure Management", url: "/offering/it-infrastructure" },
    { label: "Security Solutions", url: "/deployments" },
    { label: "Telecommunications", url: "/deployments" },
    { label: "Technical Support", url: "/deployments" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      url: normalizeExternalUrl(companyInfo?.facebookUrl) || defaultSocialLinks.facebook,
    },
    {
      label: "Instagram",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
      url: normalizeExternalUrl(companyInfo?.instagramUrl) || defaultSocialLinks.instagram,
    },
    {
      label: "YouTube",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      url: normalizeExternalUrl(companyInfo?.youtubeUrl) || defaultSocialLinks.youtube,
    },
  ];

  return (
    <footer
      style={{ backgroundColor: "#0055aa", borderTop: "1px solid #003d7a" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "clamp(24px, 4vw, 32px) 0",
        }}
      >
        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 5vw, 48px)",
            marginBottom: "clamp(32px, 5vw, 48px)",
            paddingBottom: "clamp(32px, 5vw, 48px)",
          }}
        >
          {/* Brand Section - spans wider */}
          <div style={{ gridColumn: "span 1", paddingLeft: "clamp(16px, 2vw, 24px)", paddingRight: "clamp(16px, 2vw, 24px)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              <img
                src={topLogo}
                alt={logoAlt}
                width="40"
                height="40"
                style={{ objectFit: "contain" }}
              />
              <h3
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: 0,
                  letterSpacing: "0.05em",
                }}
              >
                SYNCHORES
              </h3>
            </div>
            <p
              style={{
                fontFamily: "'Inter', Arial, sans-serif",
                fontSize: "clamp(13px, 2vw, 15px)",
                fontWeight: 400,
                color: "#ffffff",
                lineHeight: 1.6,
                margin: "0 0 clamp(16px, 2vw, 24px) 0",
                wordBreak: "break-word",
              }}
            >
              {footerBrandText}
            </p>
            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                gap: "clamp(12px, 2vw, 16px)",
                flexWrap: "wrap",
              }}
            >
              {socialLinks.map(({ label, path, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "clamp(44px, 10vw, 50px)",
                    height: "clamp(44px, 10vw, 50px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1e7fd4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div style={{ paddingLeft: "clamp(16px, 2vw, 24px)", paddingRight: "clamp(16px, 2vw, 24px)" }}>
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 clamp(16px, 2vw, 24px) 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              QUICK LINKS
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(13px, 2vw, 15px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    padding: 0,
                    transition: "color 0.2s",
                    wordBreak: "break-word",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#4da6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div style={{ paddingLeft: "clamp(16px, 2vw, 24px)", paddingRight: "clamp(16px, 2vw, 24px)" }}>
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 clamp(16px, 2vw, 24px) 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              SERVICES
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {resourceLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    navigate(link.url);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(13px, 2vw, 15px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#4da6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div style={{ paddingLeft: "clamp(16px, 2vw, 24px)" }}>
            <h3
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(14px, 2.5vw, 16px)",
                fontWeight: 700,
                color: "#ffffff",
                margin: "0 0 clamp(16px, 2vw, 24px) 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              CONTACT US
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 16px)" }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 6px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    opacity: 0.9,
                  }}
                >
                  PHONE
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(12px, 2vw, 14px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {phoneMobile}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 6px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    opacity: 0.9,
                  }}
                >
                  LANDLINE
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(12px, 2vw, 14px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {phoneMain}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 6px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    opacity: 0.9,
                  }}
                >
                  EMAIL
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(12px, 2vw, 14px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {email}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(11px, 1.8vw, 13px)",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 6px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    opacity: 0.9,
                  }}
                >
                  ADDRESS
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', Arial, sans-serif",
                    fontSize: "clamp(12px, 2vw, 14px)",
                    fontWeight: 400,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e5e5e5",
          padding: "clamp(24px, 3vw, 32px) clamp(16px, 3vw, 24px)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontSize: "clamp(14px, 2.2vw, 17px)",
            color: "#666666",
            margin: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          2026 all rights reserved
          <img
            src={bottomLogo}
            alt={companyInfo?.companyLogoAlt || "Synchores"}
            style={{
              height: "clamp(16px, 2.2vw, 19px)",
              objectFit: "contain",
            }}
          />
          Synchores Information Technology Solutions
        </p>
      </div>
    </footer>
  );
}
