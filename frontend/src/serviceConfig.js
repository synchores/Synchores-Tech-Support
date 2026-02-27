export const SERVICE_TYPES = {
  WEB_DEVELOPMENT: 'Web Development',
  UI_UX_DESIGN: 'UI/UX Design',
  SEO_OPTIMIZATION: 'SEO Optimization',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  CLOUD_SERVICES: 'Cloud Services',
};

export const SERVICE_REQUIREMENTS = {
  [SERVICE_TYPES.WEB_DEVELOPMENT]: {
    label: 'Web Development',
    fields: [
      { name: 'projectName', label: 'Project Name', type: 'text', required: true, placeholder: 'e.g., Company Portal' },
      { name: 'description', label: 'Project Description', type: 'textarea', required: true, placeholder: 'Describe your web project requirements' },
      { name: 'timeline', label: 'Timeline (weeks)', type: 'number', required: true, placeholder: '4' },
      { name: 'budget', label: 'Estimated Budget ($)', type: 'text', required: true, placeholder: 'e.g., 5000' },
      { name: 'features', label: 'Key Features Needed', type: 'textarea', required: false, placeholder: 'Authentication, Payment integration, etc.' },
    ]
  },
  [SERVICE_TYPES.UI_UX_DESIGN]: {
    label: 'UI/UX Design',
    fields: [
      { name: 'projectName', label: 'Project Name', type: 'text', required: true, placeholder: 'e.g., Mobile App Redesign' },
      { name: 'description', label: 'Design Scope', type: 'textarea', required: true, placeholder: 'Describe the design requirements' },
      { name: 'scope', label: 'Project Scope', type: 'select', required: true, options: ['Full Redesign', 'Partial Redesign', 'New Design', 'Design System'] },
      { name: 'targetAudience', label: 'Target Audience', type: 'text', required: true, placeholder: 'e.g., Young professionals, Businesses' },
      { name: 'designStyle', label: 'Design Style Preference', type: 'select', required: true, options: ['Minimalist', 'Modern', 'Classic', 'Bold', 'Custom'] },
      { name: 'timeline', label: 'Timeline (weeks)', type: 'number', required: true, placeholder: '3' },
    ]
  },
  [SERVICE_TYPES.SEO_OPTIMIZATION]: {
    label: 'SEO Optimization',
    fields: [
      { name: 'websiteUrl', label: 'Website URL', type: 'text', required: true, placeholder: 'https://yourwebsite.com' },
      { name: 'currentRanking', label: 'Current Position (keywords)', type: 'text', required: false, placeholder: 'e.g., Page 2-3' },
      { name: 'targetKeywords', label: 'Target Keywords', type: 'textarea', required: true, placeholder: 'One keyword per line' },
      { name: 'goals', label: 'SEO Goals', type: 'textarea', required: true, placeholder: 'e.g., Increase organic traffic, rank for high-intent keywords' },
      { name: 'budget', label: 'Budget ($)', type: 'text', required: false, placeholder: 'e.g., 2000' },
      { name: 'timeline', label: 'Timeline (months)', type: 'number', required: true, placeholder: '6' },
    ]
  },
  [SERVICE_TYPES.MOBILE_DEVELOPMENT]: {
    label: 'Mobile Development',
    fields: [
      { name: 'appName', label: 'App Name', type: 'text', required: true, placeholder: 'e.g., Fitness Tracker' },
      { name: 'description', label: 'App Description', type: 'textarea', required: true, placeholder: 'What does your app do?' },
      { name: 'platform', label: 'Target Platform', type: 'select', required: true, options: ['iOS', 'Android', 'Both (Cross-platform)', 'No preference'] },
      { name: 'technology', label: 'Preferred Technology', type: 'select', required: true, options: ['React Native', 'Flutter', 'Native', 'No preference'] },
      { name: 'features', label: 'Core Features', type: 'textarea', required: false, placeholder: 'Push notifications, offline mode, etc.' },
      { name: 'timeline', label: 'Timeline (weeks)', type: 'number', required: true, placeholder: '8' },
    ]
  },
  [SERVICE_TYPES.CLOUD_SERVICES]: {
    label: 'Cloud Services',
    fields: [
      { name: 'serviceType', label: 'Service Type', type: 'select', required: true, options: ['Cloud Migration', 'Infrastructure Setup', 'Database Optimization', 'Security Audit'] },
      { name: 'currentSetup', label: 'Current Setup', type: 'textarea', required: true, placeholder: 'Describe your current infrastructure' },
      { name: 'provider', label: 'Preferred Cloud Provider', type: 'select', required: true, options: ['AWS', 'Azure', 'Google Cloud', 'Multi-cloud', 'No preference'] },
      { name: 'goals', label: 'Project Goals', type: 'textarea', required: true, placeholder: 'Cost reduction, scalability, security, etc.' },
      { name: 'budget', label: 'Budget ($)', type: 'text', required: false, placeholder: 'e.g., 10000' },
      { name: 'timeline', label: 'Timeline (weeks)', type: 'number', required: true, placeholder: '4' },
    ]
  }
};
