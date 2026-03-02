# Synchores Tech Support Platform

## 📋 Project Overview

Synchores Tech Support is a comprehensive full-stack web application designed to streamline technical support operations and client service management. The platform provides an efficient ticketing system with role-based access for both clients and administrators, featuring real-time notifications, service request management, and user authentication.

### 🎯 Key Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Ticket Management**: Complete ticketing system for client support requests
- **Service Management**: Admin capabilities for managing available services
- **Real-time Notifications**: Instant updates for ticket status changes
- **Role-based Access**: Separate interfaces for clients and administrators
- **Responsive Design**: Modern UI built with React and TailwindCSS
- **GraphQL API**: Efficient data fetching with Apollo Client/Server integration

## 🏗️ Architecture Overview

```
Synchores-Tech-Support/
├── 📂 frontend/          # React + Vite Client Application
├── 📂 backend/           # NestJS + GraphQL API Server
└── 📄 package.json      # Root package configuration
```

### Technology Stack

#### Backend (NestJS + GraphQL)
- **Framework**: NestJS 11.0.1
- **API**: GraphQL with Apollo Server
- **Database**: MySQL with TypeORM
- **Authentication**: JWT + Passport
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest

#### Frontend (React + Vite)
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router DOM 7.13.1
- **State Management**: Apollo Client 4.1.6 + React Query
- **Styling**: TailwindCSS 3.4.17
- **Icons**: Lucide React
- **Notifications**: Sileo
- **HTTP Client**: Axios

## 📁 Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── db.config.ts              # Database configuration
│   ├── modules/
│   │   ├── admin-modules/
│   │   │   ├── services/             # Service management
│   │   │   └── users-crud/           # User CRUD operations
│   │   ├── client-modules/
│   │   │   └── tickets/              # Ticket management
│   │   └── general/
│   │       ├── auth/                 # Authentication module
│   │       └── notifications/        # Notification system
│   ├── app.module.ts                 # Root module
│   └── main.ts                       # Application entry point
├── test/                             # E2E tests
├── package.json                      # Backend dependencies
└── tsconfig.json                     # TypeScript configuration
```

> **Note:** The above structure excludes files and folders listed in `.gitignore`, such as `node_modules`, `dist`, `logs`, `.env`, `coverage`, IDE/editor configs, and other generated or sensitive files. Only source and configuration files relevant to development and deployment are shown.

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/                     # Authentication components
│   │   ├── modal/                    # Modal components
│   │   └── Icons.jsx                 # Icon components
│   ├── pages/
│   │   ├── admin-pages/              # Admin dashboard pages
│   │   ├── auth/                     # Authentication pages
│   │   └── client-pages/             # Client dashboard pages
│   ├── routers/
│   │   ├── appRouter.jsx             # Main routing configuration
│   │   └── protectedRoute.jsx        # Route protection
│   ├── services/
│   │   ├── apolloClient.jsx          # GraphQL client setup
│   │   ├── authService.jsx           # Authentication services
│   │   ├── admin-service/            # Admin GraphQL operations
│   │   └── client-service/           # Client GraphQL operations
│   ├── serviceConfig.js              # Service type configurations
│   └── main.jsx                      # Application entry point
├── public/                           # Static assets
└── package.json                      # Frontend dependencies
```

> **Note:** The above structure excludes files and folders listed in `.gitignore`, such as `node_modules`, `dist`, `logs`, `.env`, `src/assets/screenshots`, IDE/editor configs, and other generated or sensitive files. Only source and configuration files relevant to development and deployment are shown.

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **MySQL**: v8.0 or higher
- **Git**: Latest version

### 1. Clone Repository
```bash
git clone <repository-url>
cd Synchores-Tech-Support
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Environment Variables (.env)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=synchores_db
DB_SYNC=true

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d

# Application Configuration
PORT=3000
NODE_ENV=development
AUTO_SCHEMA=true
PLAYGROUND=true
```

#### Database Setup
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE synchores_db;
USE synchores_db;
exit;

# Run database migrations (auto-sync enabled in development)
npm run start:dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Frontend Environment Variables (.env)
```env
VITE_API_URL=http://localhost:3000/graphql
```

## 🖥️ Development Workflow

### Starting Development Servers

#### Backend Development Server
```bash
cd backend

# Development mode with hot reload
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

#### Frontend Development Server
```bash
cd frontend

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running Tests

#### Backend Testing
```bash
cd backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

#### Code Quality Tools
```bash
# Backend linting and formatting
cd backend
npm run lint
npm run format

# Frontend linting
cd ../frontend
npm run lint
```

## 📊 Database Schema

### Core Entities

#### Users Table
- `userId` (Primary Key)
- `firstName`, `middleName`, `lastName`
- `emailAddress` (Unique)
- `password` (Hashed)
- `userType` (CLIENT/ADMIN)
- `clientServicesId` (JSON array)
- Timestamps and status fields

#### Tickets Table
- `ticketId` (Primary Key)
- `userId` (Foreign Key → Users)
- `serviceId` (Foreign Key → Services)
- `title`, `description`
- `status`, `priority`
- Timestamps and relationships

#### Services Table
- Service configuration and management
- Admin-controlled service offerings
- Client service request handling

## 🔄 Git Workflow & Version Control

### Branch Structure
```
main/master     → Production-ready code
develop         → Development integration branch
feature/*       → Feature development branches
bugfix/*        → Bug fix branches
hotfix/*        → Emergency production fixes
```

### Commit Message Convention
```
feat: add new ticket creation functionality
fix: resolve authentication token refresh issue
docs: update API documentation
style: format code according to ESLint rules
refactor: optimize database queries
test: add unit tests for auth service
chore: update dependencies
```

### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/ticket-management
git push -u origin feature/ticket-management

# 2. Make changes and commit
git add .
git commit -m "feat: implement ticket creation with file upload"

# 3. Keep branch updated
git fetch origin
git rebase origin/develop

# 4. Push changes
git push origin feature/ticket-management

# 5. Create Pull Request to develop branch
# 6. After review, merge to develop
# 7. Deploy develop to staging for testing
# 8. Merge develop to main for production
```

## 📈 Weekly Progress Tracking
## 🚀 Deployment

### Production Environment
- **Backend**: Deploy to cloud service (AWS, Google Cloud, etc.)
- **Frontend**: Deploy to Netlify/Vercel or static hosting
- **Database**: Managed MySQL service (AWS RDS, Google Cloud SQL)

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
DB_SYNC=false
AUTO_SCHEMA=false
PLAYGROUND=false
```

## 📝 API Documentation

The GraphQL API provides comprehensive queries and mutations for:
- User authentication and management
- Ticket operations (CRUD)
- Service management
- Notifications system

Access GraphQL Playground: `http://localhost:3000/graphql` (development only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔧 Troubleshooting

### Common Issues

**Database Connection Issues**:
- Verify MySQL service is running
- Check database credentials in .env file
- Ensure database exists and is accessible

**GraphQL Schema Issues**:
- Clear schema cache: delete `schema.gql` file
- Restart backend server with `npm run start:dev`

**Frontend Build Issues**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Check environment variables configuration

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check documentation and troubleshooting section

---

**Last Updated**: March 2, 2026  
**Version**: 1.0.0  
**Maintained by**: Synchores Development Team