import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLoadScript } from "@react-google-maps/api";
import ContactHero from "./components/ContactHero";
import ContactInfoPanel from "./components/ContactInfoPanel";
import ContactFormPanel from "./components/ContactFormPanel";
import { toastError } from "../../../../services/admin-service/adminToast";
import { useContactForm } from "../../../../hooks/useContactForm";

const DEFAULT_CONTACT_BG = "https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMFVJJTIwZGVzaWduJTIwc2NyZWVuJTIwbW9kZXJufGVufDF8fHx8MTc3NjEzOTgwNXww&ixlib=rb-4.1.0&q=80&w=1080";

function resolveAssetUrl(path, fallback) {
  if (!path) return fallback;
  return path.startsWith("/uploads/") ? `http://localhost:3000${path}` : path;
}

export function ContactUs({ companyInfo }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);
  const { submitContact } = useContactForm();
  const contactBg = resolveAssetUrl(companyInfo?.contactBgImage, DEFAULT_CONTACT_BG);
  const contactBgAlt = companyInfo?.contactBgImageAlt || "Contact";
  const contactEyebrow = companyInfo?.contactEyebrow || "LET'S WORK TOGETHER";
  const contactHeading = companyInfo?.contactHeading || "HOW CAN WE HELP?";
  const contactIntroText =
    companyInfo?.contactIntroText ||
    "Ready to transform your IT infrastructure? Our team of experts is here to help. Reach out and we'll get back to you within one business day.";
  const contactInfo = [
    {
      icon: Phone,
      label: "PHONE",
      value: companyInfo?.phoneMobile || "+63 977 322 3796",
    },
    {
      icon: Phone,
      label: "LANDLINE",
      value: companyInfo?.phoneMain || "(046) 884 6572",
    },
    {
      icon: Mail,
      label: "EMAIL",
      value: companyInfo?.email || "info@synchores.com",
    },
    {
      icon: MapPin,
      label: "ADDRESS",
      value:
        companyInfo?.address ||
        "KM 27, Emilio Aguinaldo Highway, Anabu 2F, Imus City, Cavite 4103 PH",
    },
  ];
  const businessHours = [
    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const payload = {
      fullName: form.name.trim(),
      email: form.email.trim(),
      contactNumber: form.phone.trim(),
      serviceType: form.service.trim(),
      message: form.message.trim(),
    };

    if (!payload.fullName || !payload.email || !payload.contactNumber || !payload.serviceType || !payload.message) {
      toastError(new Error("Please complete all required fields before sending your message."), "Incomplete form");
      return;
    }

    try {
      setLoading(true);
      await submitContact(payload);
      setSubmitted(true);
    } catch (error) {
      toastError(error, "Message not sent");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  const handleFocus = (name) => setFocused(name);
  const handleBlur = () => setFocused(null);

  return (
    <section id="contact" style={{ backgroundColor: "var(--landing-bg-strong)" }}>
      <ContactHero
        contactBg={contactBg}
        contactBgAlt={contactBgAlt}
        eyebrow={contactEyebrow}
        heading={contactHeading}
      />

      {/* Main content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "48px",
        }}>
          <ContactInfoPanel
            introText={contactIntroText}
            contactInfo={contactInfo}
            hours={businessHours}
          />

          <ContactFormPanel
            form={form}
            loading={loading}
            submitted={submitted}
            focused={focused}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isLoaded={isLoaded}
            loadError={loadError}
            mapCenter={mapCenter}
            mapContainerStyle={mapContainerStyle}
            mapOptions={mapOptions}
          />
        </div>
      </div>
    </section>
  );
}
export default ContactUs;
