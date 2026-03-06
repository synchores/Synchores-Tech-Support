import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Server,
  Wifi,
  HardDrive,
  Lightbulb,
  Globe,
  MessageSquare,
  LayoutDashboard,
  Ticket,
  Users,
  Settings,
  BarChart2,
  Bell,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
  Zap,
  User,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  Cpu,
} from "lucide-react";
import { CREATE_INQUIRY_FORM_MUTATION } from "../../services/client-service/Mutation";

const IT_SERVICES = [
  {
    id: "web-development",
    label: "Web Development",
    icon: Globe,
    description: "Websites, web apps & UI/UX",
    accent: "#4f6ef7",
    bg: "#eef0fe",
    ring: "ring-[#4f6ef7]",
  },
  {
    id: "it-infrastructure",
    label: "IT Infrastructure",
    icon: Server,
    description: "Servers, cloud & storage",
    accent: "#8b5cf6",
    bg: "#f3f0ff",
    ring: "ring-[#8b5cf6]",
  },
  {
    id: "networks",
    label: "Networks",
    icon: Wifi,
    description: "LAN, WAN, VPN setup",
    accent: "#10b981",
    bg: "#ecfdf5",
    ring: "ring-[#10b981]",
  },
  {
    id: "software-hardware",
    label: "Software & Hardware",
    icon: HardDrive,
    description: "Install, maintain & repair",
    accent: "#f59e0b",
    bg: "#fffbeb",
    ring: "ring-[#f59e0b]",
  },
  {
    id: "tech-consultation",
    label: "Tech Consultation",
    icon: Lightbulb,
    description: "IT strategy & planning",
    accent: "#ef4444",
    bg: "#fff1f2",
    ring: "ring-[#ef4444]",
  },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Ticket, label: "Tickets", active: true },
  { icon: Users, label: "Clients" },
  { icon: BarChart2, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export default function ClientServiceRequestForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    typeOfService: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const [createInquiryForm, { loading: isSubmitting }] = useMutation(CREATE_INQUIRY_FORM_MUTATION);
  const fullNamePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

  const handleQuickSelect = (service) => {
    setSelectedServiceId(service.id);
    setForm((prev) => ({ ...prev, typeOfService: service.label }));
    setErrors((prev) => ({ ...prev, typeOfService: undefined }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitError) {
      setSubmitError("");
    }
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (field === "typeOfService") {
      const match = IT_SERVICES.find((s) => s.label === value);
      setSelectedServiceId(match ? match.id : null);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (!fullNamePattern.test(form.fullName.trim())) {
      newErrors.fullName = "Full name must contain letters only.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else {
      const normalizedMobile = form.mobileNumber.replace(/\D/g, "");
      const isAllowedFormat = /^\+?[\d\s\-()]+$/.test(form.mobileNumber);
      if (!isAllowedFormat || normalizedMobile.length < 10 || normalizedMobile.length > 15) {
        newErrors.mobileNumber = "Please enter a valid mobile number (10-15 digits).";
      }
    }
    if (!form.typeOfService) newErrors.typeOfService = "Please select a service type.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setSubmitError("");

      await createInquiryForm({
        variables: {
          input: {
            fullName: form.fullName.trim(),
            email: form.email.trim(),
            contactNumber: form.mobileNumber.trim(),
            serviceType: form.typeOfService,
            message: form.message.trim(),
          },
        },
      });

      setSubmitted(true);
    } catch (error) {
      const message =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "Failed to submit inquiry. Please try again.";
      setSubmitError(message);
    }
  };

  const handleClear = () => {
    setForm({
      fullName: "",
      email: "",
      mobileNumber: "",
      typeOfService: "",
      message: "",
    });
    setErrors({});
    setSelectedServiceId(null);
  };

  const selectedService = IT_SERVICES.find((s) => s.id === selectedServiceId);

  return (
    <div className="flex h-screen bg-[#f0f2f8] overflow-hidden">
      {/* <aside className="w-14 bg-[#0f1117] flex flex-col items-center py-4 gap-1 shrink-0 z-10">
        <div className="w-8 h-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center mb-4">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            title={item.label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              item.active
                ? "bg-[#4f6ef7] text-white"
                : "text-[#6b7280] hover:text-white hover:bg-[#1e2130]"
            }`}
          >
            <item.icon className="w-4 h-4" />
          </button>
        ))}
        <div className="mt-auto w-8 h-8 rounded-full bg-[#4f6ef7] flex items-center justify-center text-white text-xs">
          JD
        </div>
      </aside> */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <header className="bg-white border-b border-[#e5e7eb] px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <span>IT Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1a1f36]">New Service Request</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-full bg-[#f0f2f8] flex items-center justify-center cursor-pointer hover:bg-[#e5e7eb] transition-colors">
              <Bell className="w-4 h-4 text-[#6b7280]" />
              <span
                className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#ef4444] rounded-full text-white flex items-center justify-center"
                style={{ fontSize: "9px" }}
              >
                2
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#4f6ef7] flex items-center justify-center text-white text-xs">
              JD
            </div>
          </div>
        </header> */}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {submitted ? (
            <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
              </div>
              <h2 className="text-[#1a1f36] mb-2">Request Submitted!</h2>
              <p className="text-sm text-[#6b7280] mb-1">
                Hi <span className="text-[#1a1f36]">{form.fullName}</span>, your service request has been received.
              </p>
              <p className="text-sm text-[#6b7280] mb-2">
                Service: <span className="text-[#4f6ef7]">{form.typeOfService}</span>
              </p>
              <p className="text-sm text-[#6b7280] mb-8">
                Our team will contact you at <span className="text-[#1a1f36]">{form.email}</span> shortly.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    handleClear();
                  }}
                  className="px-5 py-2 bg-[#4f6ef7] text-white rounded-lg hover:bg-[#3b5ae0] transition-colors text-sm cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto flex flex-col gap-5">
              <div>
                <h1 className="text-[#1a1f36]">Service Request</h1>
                <p className="text-sm text-[#6b7280] mt-0.5">
                  Fill in the details below to submit a new IT service request.
                </p>
              </div>

              {submitError && (
                <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-lg px-4 py-3 text-sm text-[#be123c]">
                  {submitError}
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-[#4f6ef7]" />
                  <h4 className="text-[#1a1f36]">Quick Service Selector</h4>
                </div>
                <p className="text-xs text-[#6b7280] mb-4">Click a category to instantly pre-fill your service type.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {IT_SERVICES.map((service) => {
                    const Icon = service.icon;
                    const isActive = selectedServiceId === service.id;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleQuickSelect(service)}
                        className={`relative flex flex-col items-start gap-2 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                          isActive
                            ? `border-current ring-2 ${service.ring} ring-offset-1`
                            : "border-[#e5e7eb] hover:border-gray-300 hover:shadow-sm"
                        } ${isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                        style={isActive ? { borderColor: service.accent } : {}}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: isActive ? service.accent : service.bg }}
                        >
                          <Icon className="w-4 h-4" style={{ color: isActive ? "#fff" : service.accent }} />
                        </div>
                        <div>
                          <p className="text-xs text-[#1a1f36] leading-tight">{service.label}</p>
                          <p className="text-xs text-[#9ca3af] leading-tight mt-0.5">{service.description}</p>
                        </div>
                        {isActive && (
                          <span
                            className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: service.accent }}
                          >
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-5">
                  <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#f0f2f8]">
                    <FileText className="w-4 h-4 text-[#4f6ef7]" />
                    <h4 className="text-[#1a1f36]">Contact & Service Details</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-[#1a1f36] flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#6b7280]" />
                        Full Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="e.g. Juan Dela Cruz"
                        className={`w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#f8f9fc] border outline-none transition-all ${
                          errors.fullName
                            ? "border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20"
                            : "border-[#e5e7eb] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20"
                        } text-[#1a1f36] placeholder-[#9ca3af]`}
                      />
                      {errors.fullName && (
                        <p className="flex items-center gap-1 text-xs text-[#ef4444]">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-[#1a1f36] flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#6b7280]" />
                        Email Address <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="e.g. juan@email.com"
                        className={`w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#f8f9fc] border outline-none transition-all ${
                          errors.email
                            ? "border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20"
                            : "border-[#e5e7eb] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20"
                        } text-[#1a1f36] placeholder-[#9ca3af]`}
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-xs text-[#ef4444]">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-[#1a1f36] flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#6b7280]" />
                        Mobile Number <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={form.mobileNumber}
                        onChange={(e) => handleChange("mobileNumber", e.target.value)}
                        placeholder="e.g. +63 912 345 6789"
                        className={`w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#f8f9fc] border outline-none transition-all ${
                          errors.mobileNumber
                            ? "border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20"
                            : "border-[#e5e7eb] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20"
                        } text-[#1a1f36] placeholder-[#9ca3af]`}
                      />
                      {errors.mobileNumber && (
                        <p className="flex items-center gap-1 text-xs text-[#ef4444]">
                          <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-[#1a1f36] flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-[#6b7280]" />
                        Type of Service <span className="text-[#ef4444]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={form.typeOfService}
                          onChange={(e) => handleChange("typeOfService", e.target.value)}
                          className={`w-full appearance-none rounded-lg px-3.5 py-2.5 pr-9 text-sm bg-[#f8f9fc] border outline-none transition-all cursor-pointer ${
                            errors.typeOfService
                              ? "border-[#ef4444] focus:ring-2 focus:ring-[#ef4444]/20"
                              : "border-[#e5e7eb] focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20"
                          } ${!form.typeOfService ? "text-[#9ca3af]" : "text-[#1a1f36]"}`}
                        >
                          <option value="" disabled>
                            Select a service...
                          </option>
                          {IT_SERVICES.map((s) => (
                            <option key={s.id} value={s.label}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280] pointer-events-none" />
                      </div>
                      {selectedService && !errors.typeOfService && (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className="inline-block w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: selectedService.accent }}
                          />
                          <span className="text-xs text-[#6b7280]">{selectedService.description}</span>
                        </div>
                      )}
                      {errors.typeOfService && (
                        <p className="flex items-center gap-1 text-xs text-[#ef4444]">
                          <AlertCircle className="w-3 h-3" /> {errors.typeOfService}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-sm text-[#1a1f36] flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#6b7280]" />
                        Message / Details
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Describe your issue or request in detail..."
                        rows={4}
                        className="w-full rounded-lg px-3.5 py-2.5 text-sm bg-[#f8f9fc] border border-[#e5e7eb] outline-none transition-all focus:border-[#4f6ef7] focus:ring-2 focus:ring-[#4f6ef7]/20 text-[#1a1f36] placeholder-[#9ca3af] resize-none"
                      />
                      {errors.message && (
                        <p className="flex items-center gap-1 text-xs text-[#ef4444]">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-[#f0f2f8] mt-6 pt-5 flex items-center justify-between">
                    <p className="text-xs text-[#9ca3af]">
                      <span className="text-[#ef4444]">*</span> Required fields
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleClear}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#e5e7eb] text-sm text-[#6b7280] hover:bg-[#f8f9fc] hover:text-[#1a1f36] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Clear
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center gap-1.5 px-5 py-2 rounded-lg text-white text-sm transition-all duration-200 shadow-sm ${
                          isSubmitting
                            ? "bg-[#3b5ae0] scale-[0.98] shadow-inner cursor-not-allowed"
                            : "bg-[#4f6ef7] hover:bg-[#3b5ae0] hover:-translate-y-[1px] cursor-pointer"
                        }`}
                      >
                        <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


