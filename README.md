# 🏗️ Architecture Decision Wizard

A modern, AI-powered web application that helps developers and architects decide whether to adopt a **microservices architecture** or stick with a **monolith** based on detailed project analysis.

## ✨ Features

### 🎯 **Guided Decision Framework**
- **5-Step Assessment Process**: Structured evaluation covering all critical decision factors
- **Real-time Validation**: Step-by-step input validation with helpful guidance
- **Progress Tracking**: Visual progress indicator with clear step descriptions

### 🔧 **Comprehensive Input Collection**
- **Project Details**: Name, description, goals, and expected scale
- **Tech Stack**: Programming languages, frameworks, and versions
- **Infrastructure**: Cloud providers, CI/CD tools, databases, messaging systems
- **System Complexity**: Communication patterns, caching, monitoring, deployment strategies
- **Team Metrics**: Size, experience, deployment frequency, CI/CD maturity

### 🚀 **Smart Recommendations**
- **AI-Powered Analysis**: Intelligent decision engine with confidence scoring
- **Detailed Reasoning**: Clear explanation of why each architecture is recommended
- **Risk Assessment**: Identifies potential challenges and mitigation strategies
- **Tool Suggestions**: Recommends specific technologies and practices

### 📊 **Professional Reporting**
- **Export Functionality**: Download recommendations as Markdown reports
- **Visual Results**: Clean, professional presentation of analysis
- **Actionable Insights**: Practical next steps and implementation guidance

## ��️ Architecture

### Frontend (React + TypeScript)
- **Modern UI Framework**: Built with React 18 and TypeScript
- **Responsive Design**: Tailwind CSS for beautiful, mobile-friendly interfaces
- **Component Architecture**: Modular, reusable components for maintainability
- **State Management**: React hooks for efficient state handling
- **Form Validation**: Real-time input validation and error handling

### Backend (Spring Boot)
- **RESTful API**: Clean, RESTful endpoints for data processing
- **Decision Engine**: Sophisticated algorithm for architecture recommendations
- **Data Persistence**: Optional storage of user inputs and recommendations
- **Scalable Design**: Built for enterprise-grade performance

### Integration
- **Mock API Support**: Built-in fallback for development and testing
- **Real-time Communication**: Seamless frontend-backend integration
- **Error Handling**: Graceful fallback to local recommendation engine

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm** 9+
- **Java** 17+ and **Maven** 3.6+
- **Git** for version control

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd project-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Build with Maven
mvn clean install

# Run Spring Boot application
mvn spring-boot:run
```

### Environment Configuration
Create `.env` files for both frontend and backend:

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_MOCK_API=true
```

**Backend (application.properties)**
```properties
server.port=8080
spring.application.name=architecture-wizard
```

## 🎨 UI/UX Features

### Modern Design Principles
- **Clean Interface**: Minimalist design focusing on user experience
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Dark/Light Mode**: Optional theme switching (planned feature)

### User Experience
- **Intuitive Navigation**: Clear step progression with breadcrumbs
- **Smart Defaults**: Intelligent pre-selection based on common patterns
- **Real-time Feedback**: Immediate validation and helpful error messages
- **Progress Persistence**: Save and resume functionality (planned)

