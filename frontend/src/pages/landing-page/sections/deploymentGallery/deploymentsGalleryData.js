/* ─── deployments gallery data (organized by type) ───────────────────────────────────────── */
export const deploymentsGalleryData = [
  // Infrastructure
  {
    id: 101,
    image: "/assets/offer_devgal_3.png",
    label: "Network Infrastructure",
    project: "Biometric Access Control: Plus Time and Attendance",
    type: "Infrastructure",
    description: "Enterprise-level biometric access control with integrated time tracking system.",
  },
  {
    id: 102,
    image: "/assets/offer_devgal_infra_2.png",
    label: "Wi-Fi Network",
    project: "Enterprise Campus Wi-Fi Network",
    type: "Infrastructure",
    description: "High-performance Wi-Fi deployment across multiple facilities.",
  },
  {
    id: 103,
    image: "/assets/offer_devgal_infra_3.png",
    label: "Data Center",
    project: "Secure Data Center Infrastructure",
    type: "Infrastructure",
    description: "Redundant data center with backup power and cooling systems.",
  },

  // Security and Surveillance
  {
    id: 201,
    image: "/assets/offer_devgal_7.png",
    label: "Security and Surveillance",
    project: "Surveillance CCTV",
    type: "Security and Surveillance",
    description: "4K CCTV surveillance system with AI detection capabilities.",
  },
  {
    id: 202,
    image: "/assets/offer_devgal_8.png",
    label: "Security and Surveillance",
    project: "Surveillance Video Wall",
    type: "Security and Surveillance",
    description: "Multi-screen video wall for real-time security monitoring.",
  },
  {
    id: 203,
    image: "/assets/offer_devgal_security_3.png",
    label: "Access Control System",
    project: "Multi-Building Access Control",
    type: "Security and Surveillance",
    description: "Integrated access control system across 6 buildings.",
  },

  // Telecommunications
  {
    id: 301,
    image: "/assets/offer_devgal_6.png",
    label: "Telecommunications and Computers",
    project: "Teleconference System",
    type: "Telecommunications",
    description: "Advanced teleconferencing setup with video and audio optimization.",
  },
  {
    id: 302,
    image: "/assets/offer_devgal_telecom_2.png",
    label: "VoIP Communication",
    project: "Enterprise VoIP System",
    type: "Telecommunications",
    description: "Unified communications platform with PBX integration.",
  },
  {
    id: 303,
    image: "/assets/offer_devgal_telecom_3.png",
    label: "Network Connectivity",
    project: "Multi-site Connectivity",
    type: "Telecommunications",
    description: "Seamless WAN connectivity between all office locations.",
  },
];

// Helper function to organize data by type
export const getDeploymentsByType = () => {
  const grouped = {};
  
  deploymentsGalleryData.forEach((item) => {
    if (!grouped[item.type]) {
      grouped[item.type] = [];
    }
    grouped[item.type].push(item);
  });

  return grouped;
};

export const getAllDeploymentTypes = () => {
  return [...new Set(deploymentsGalleryData.map((item) => item.type))];
};
