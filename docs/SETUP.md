# AptiBattle Setup Guide

This guide will help you set up and run the AptiBattle multiplayer quiz platform.

## Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Firebase Account** (for authentication)

## Backend Setup (Spring Boot)

### 1. Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE aptibattle;
```

2. Run the database schema:
```bash
mysql -u root -p aptibattle < database/schema.sql
```

3. Update database credentials in `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    username: your_mysql_username
    password: your_mysql_password
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google Sign-in
3. Download the service account key JSON file
4. Place it in `backend/src/main/resources/` as `firebase-service-account.json`

### 3. Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Frontend Setup (React.js)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

1. Copy the environment template:
```bash
cp .env.example .env.local
```

2. Update Firebase configuration in `.env.local`:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Run Frontend

```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Development Workflow

### Backend Development
- Main application: `backend/src/main/java/com/aptibattle/AptiBattleApplication.java`
- API endpoints: `backend/src/main/java/com/aptibattle/controller/`
- Business logic: `backend/src/main/java/com/aptibattle/service/`
- Database entities: `backend/src/main/java/com/aptibattle/entity/`

### Frontend Development
- Main App component: `frontend/src/App.js`
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Services: `frontend/src/services/`

## Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Production Deployment

### Backend
```bash
cd backend
mvn clean package
java -jar target/aptibattle-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the build/ directory to your web server
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check credentials in `application.yml`
   - Ensure database exists

2. **Firebase Authentication Error**
   - Verify Firebase configuration
   - Check service account key file location
   - Ensure Firebase project has authentication enabled

3. **CORS Issues**
   - Backend CORS is configured for `http://localhost:3000`
   - Update `cors.allowed-origins` in `application.yml` for production

4. **Port Conflicts**
   - Backend runs on port 8080
   - Frontend runs on port 3000
   - Change ports in respective configuration files if needed

## Next Steps

1. Implement remaining backend APIs (Week 3-4)
2. Add WebSocket support for real-time features (Week 5-6)
3. Implement quiz gameplay and leaderboard (Week 5-7)
4. Add comprehensive testing (Week 7)
5. Deploy to production (Week 8)

For more information, see the main [README.md](../README.md) file.