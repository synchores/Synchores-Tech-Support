/* ─── deployments gallery data (organized by type) ───────────────────────────────────────── */
export const deploymentsGalleryData = [
  // Infrastructure
  {
    id: 101,
    image: "/assets/offer_devgal_1.png",
    label: "Network Infrastructure",
    project: "Network Infrastructure Setup",
    type: "Network & Infrastructure",
    description: "Enterprise network infrastructure deployment.",
  },
  {
    id: 102,
    image: "/assets/offer_devgal_2.png",
    label: "Network Infrastructure",
    project: "Network Infrastructure Setup",
    type: "Network & Infrastructure",
    description: "Enterprise network infrastructure deployment.",
  },
  {
    id: 103,
    image: "/assets/offer_devgal_3.png",
    label: "Security and Surveillance",
    project: "Biometric Access Control: Plus Time and Attendance",
    type: "Security and Surveillance",
    description: "Enterprise-level biometric access control with integrated time tracking system.",
  },
  {
    id: 104,
    image: "/assets/offer_devgal_4.png",
    label: "Network Infrastructure",
    project: "Network Infrastructure Setup",
    type: "Network & Infrastructure",
    description: "Enterprise network infrastructure deployment.",
  },
  {
    id: 105,
    image: "/assets/offer_progal_1.png",
    label: "Network Infrastructure",
    project: "Professional Services Installation",
    type: "Network & Infrastructure",
    description: "Professional network infrastructure installation and setup.",
  },
  {
    id: 106,
    image: "/assets/offer_progal_2.png",
    label: "Network Infrastructure",
    project: "Professional Services Installation",
    type: "Network & Infrastructure",
    description: "Professional network infrastructure installation and setup.",
  },

  // Security and Surveillance
  {
    id: 201,
    image: "/assets/offer_devgal_5.png",
    label: "Security and Surveillance",
    project: "Access Control System",
    type: "Security and Surveillance",
    description: "Advanced access control and security system installation.",
  },
  {
    id: 202,
    image: "/assets/offer_devgal_7.png",
    label: "Security and Surveillance",
    project: "Surveillance CCTV",
    type: "Security and Surveillance",
    description: "4K CCTV surveillance system with AI detection capabilities.",
  },
  {
    id: 203,
    image: "/assets/offer_devgal_8.png",
    label: "Security and Surveillance",
    project: "Surveillance Video Wall",
    type: "Security and Surveillance",
    description: "Multi-screen video wall for real-time security monitoring.",
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
