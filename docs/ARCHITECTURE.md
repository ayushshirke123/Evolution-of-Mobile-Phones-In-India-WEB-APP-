# AptiBattle Architecture

This document outlines the technical architecture of the AptiBattle multiplayer quiz platform.

## System Overview

AptiBattle is a full-stack web application with the following components:

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Spring Boot REST API
- **Database**: MySQL
- **Authentication**: Firebase Authentication
- **Real-time Communication**: WebSocket

## Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React.js      │    │   Spring Boot    │    │     MySQL       │
│   Frontend      │◄──►│   Backend        │◄──►│   Database      │
│                 │    │                  │    │                 │
│ - Components    │    │ - REST APIs      │    │ - User Data     │
│ - Pages         │    │ - WebSocket      │    │ - Quiz Data     │
│ - Services      │    │ - Business Logic │    │ - Session Data  │
│ - Auth Context  │    │ - Data Access    │    │ - Scores        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   Firebase      │    │   WebSocket      │
│   Auth          │    │   Server         │
│                 │    │                  │
│ - User Auth     │    │ - Real-time      │
│ - JWT Tokens    │    │ - Game Events    │
│ - Google SSO    │    │ - Live Updates   │
└─────────────────┘    └──────────────────┘
```

## Technology Stack

### Frontend (React.js)
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Authentication**: Firebase SDK
- **WebSocket**: Socket.IO Client
- **UI Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Database**: Spring Data JPA
- **Authentication**: Firebase Admin SDK
- **WebSocket**: Spring WebSocket
- **Security**: Spring Security
- **Build Tool**: Maven

### Database (MySQL)
- **Version**: MySQL 8.0
- **ORM**: Hibernate
- **Connection Pool**: HikariCP
- **Migration**: Spring Boot Auto-DDL

## Data Models

### Core Entities

1. **User**
   - Primary authentication and profile data
   - Game statistics and scores
   - Firebase UID integration

2. **Quiz**
   - Template for quiz sessions
   - Categories and difficulty levels
   - Question collections

3. **Question**
   - Multiple choice questions
   - Correct answers and explanations
   - Point values and ordering

4. **QuizSession**
   - Live game instances
   - Session codes for joining
   - Status tracking (waiting, active, completed)

5. **PlayerSession**
   - User participation in sessions
   - Real-time scores and rankings
   - Answer tracking

6. **PlayerAnswer**
   - Individual question responses
   - Time tracking and scoring
   - Correctness validation

### Relationships

```
User (1) ──→ (N) QuizSession [Host]
User (1) ──→ (N) PlayerSession [Participant]
Quiz (1) ──→ (N) Question
Quiz (1) ──→ (N) QuizSession
QuizSession (1) ──→ (N) PlayerSession
PlayerSession (1) ──→ (N) PlayerAnswer
Question (1) ──→ (N) PlayerAnswer
```

## API Design

### RESTful Endpoints

- **User Management**: `/api/users/*`
- **Quiz Management**: `/api/quizzes/*`
- **Session Management**: `/api/sessions/*`
- **Game Operations**: `/api/sessions/{code}/*`
- **Leaderboards**: `/api/sessions/{code}/leaderboard`

### Authentication Flow

1. User signs in with Firebase (Email/Google)
2. Frontend receives Firebase ID token
3. Token sent with API requests in Authorization header
4. Backend validates token with Firebase Admin SDK
5. User context extracted for authorization

### WebSocket Communication

- **Connection**: `/ws/game/{sessionCode}`
- **Events**: Session updates, new questions, leaderboard changes
- **Real-time Features**: Live scoring, player join/leave, quiz progression

## Security

### Authentication
- Firebase JWT token validation
- Secure user session management
- Role-based access control (Host vs Player)

### Authorization
- Session-based permissions
- User can only access own data
- Host controls for session management

### Data Protection
- HTTPS in production
- SQL injection prevention via JPA
- Input validation and sanitization
- CORS configuration for frontend

## Performance Considerations

### Database
- Indexed columns for frequent queries
- Connection pooling with HikariCP
- Optimized queries with JPA

### Caching
- Spring Boot caching for static data
- Redis for session state (future enhancement)

### Scalability
- Stateless backend design
- Horizontal scaling ready
- Load balancer support

## Deployment Architecture

### Development Environment
```
Frontend (3000) ─── Backend (8080) ─── MySQL (3306)
                    │
                    └─── Firebase Auth
```

### Production Environment
```
Load Balancer ─── Frontend (React Build)
     │
     └─── Backend Cluster ─── MySQL Cluster
          │                  │
          └─── Redis Cache ──┘
          │
          └─── Firebase Auth
```

## File Structure

```
aptibattle/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/aptibattle/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access
│   │   ├── entity/          # JPA entities
│   │   ├── dto/             # Data transfer objects
│   │   ├── config/          # Configuration classes
│   │   └── websocket/       # WebSocket handlers
│   ├── src/main/resources/
│   │   ├── application.yml  # App configuration
│   │   └── firebase-*.json  # Firebase service key
│   └── pom.xml              # Maven dependencies
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   └── hooks/           # Custom hooks
│   ├── public/              # Static assets
│   └── package.json         # NPM dependencies
├── database/                # Database scripts
│   └── schema.sql           # Database schema
└── docs/                    # Documentation
    ├── SETUP.md             # Setup instructions
    ├── API.md               # API documentation
    └── ARCHITECTURE.md      # This file
```

## Development Workflow

1. **Backend Development**
   - Entity → Repository → Service → Controller
   - Unit tests for business logic
   - Integration tests for APIs

2. **Frontend Development**
   - Component → Page → Route → Service
   - Responsive design with Tailwind
   - Real-time updates via WebSocket

3. **Database Changes**
   - Update entity models
   - Spring Boot auto-DDL for development
   - Manual migration scripts for production

## Future Enhancements

### Short Term (Next Release)
- Complete backend API implementation
- WebSocket integration for real-time features
- Enhanced UI components and animations

### Medium Term
- Mobile app (React Native)
- Advanced analytics and reporting
- Social features (friends, challenges)

### Long Term
- AI-powered question generation
- Voice-based quiz interactions
- Enterprise features (teams, organizations)