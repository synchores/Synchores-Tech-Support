-- ============================================================
-- Landing Page Database Seed - MySQL Script
-- Paste this entire script into MySQL Workbench
-- ============================================================

-- 1. Insert Hero Section
INSERT INTO hero_section_tbl (headline, tagline, backgroundImage, createdAt, updatedAt) VALUES (
  'Scalable Tech Solutions Built For Your Business SUCCESS',
  'We deliver innovative software solutions that empower your business to grow faster and smarter. From custom development to enterprise-grade infrastructure, we have the expertise you need.',
  '/uploads/landing-page/hero-bg.jpg',
  NOW(),
  NOW()
);

-- 2. Insert Service Cards
INSERT INTO landing_service_card_tbl (title, description, icon, image, `order`, createdAt, updatedAt) VALUES
('Custom Development', 'Tailored software solutions built from scratch to meet your unique business needs. We specialize in full-stack development with modern technologies.', 'code', '/uploads/landing-page/service-1.jpg', 1, NOW(), NOW()),
('Infrastructure & Deployment', 'Robust cloud infrastructure solutions with automated deployment pipelines. Scalable, secure, and optimized for performance.', 'server', '/uploads/landing-page/service-2.jpg', 2, NOW(), NOW()),
('System Integration', 'Seamlessly integrate multiple systems and platforms. Connect your legacy systems with modern applications for unified operations.', 'zap', '/uploads/landing-page/service-3.jpg', 3, NOW(), NOW()),
('Security & Compliance', 'Comprehensive security solutions ensuring your data and systems are protected. Full compliance with industry standards and regulations.', 'shield', '/uploads/landing-page/service-4.jpg', 4, NOW(), NOW()),
('Maintenance & Support', '24/7 technical support and maintenance services. Keep your systems running smoothly with our dedicated support team.', 'headphones', '/uploads/landing-page/service-5.jpg', 5, NOW(), NOW());

-- 3. Insert Deployment Gallery
INSERT INTO deployment_gallery_tbl (title, description, image, category, `order`, createdAt, updatedAt) VALUES
('Enterprise ERP System Migration', 'Successfully migrated a legacy ERP system to a modern cloud-based solution for a Fortune 500 company. Achieved 40% operational efficiency improvement and reduced infrastructure costs by 35%.', '/uploads/landing-page/deployment-1.jpg', 'Enterprise', 1, NOW(), NOW()),
('Real-time Surveillance System', 'Deployed a comprehensive CCTV surveillance system with AI-powered analytics for intelligent threat detection across 50+ locations.', '/uploads/landing-page/deployment-2.jpg', 'Surveillance', 2, NOW(), NOW()),
('E-Commerce Platform Overhaul', 'Built and deployed a high-performance e-commerce platform handling 1M+ daily transactions with 99.9% uptime, advanced search, and personalization features.', '/uploads/landing-page/deployment-3.jpg', 'Web Development', 3, NOW(), NOW()),
('Healthcare Data Management System', 'Developed a HIPAA-compliant patient management system serving 50+ hospitals with real-time data synchronization and advanced analytics capability.', '/uploads/landing-page/deployment-4.jpg', 'Healthcare', 4, NOW(), NOW());

-- 4. Insert Company Info
INSERT INTO company_info_tbl (address, phoneMain, phoneMobile, email, aboutText, facebookUrl, instagramUrl, youtubeUrl, createdAt, updatedAt) VALUES (
  'Unit 2A, 2nd Floor, Podium Bldg., Emerald Avenue, Pasig City, Philippines 1604',
  '(046) 884 6572',
  '+63 977 322 3796',
  'info@synchores.com',
  'Synchores IT Solutions is a leading technology company dedicated to providing innovative software solutions and infrastructure services. With over a decade of experience, we have successfully delivered projects for businesses ranging from startups to Fortune 500 companies. Our team of expert developers, architects, and engineers are committed to delivering excellence in every project.',
  'https://facebook.com/synchores',
  'https://instagram.com/synchores',
  'https://youtube.com/synchores',
  NOW(),
  NOW()
);

-- ============================================================
-- Seed completed successfully!
-- Tables populated:
-- ✅ hero_section_tbl (1 record)
-- ✅ landing_service_card_tbl (5 records)
-- ✅ deployment_gallery_tbl (4 records)
-- ✅ company_info_tbl (1 record)
-- ============================================================
