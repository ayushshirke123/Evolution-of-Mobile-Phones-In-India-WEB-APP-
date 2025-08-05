# AptiBattle - Multiplayer Quiz Platform

A real-time multiplayer quiz platform designed to make aptitude testing engaging and competitive.

## 🎯 Project Overview

AptiBattle addresses the lack of engaging aptitude platforms by providing a multiplayer quiz-based learning experience with real-time gameplay and live leaderboards.

## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Spring Boot + MySQL
- **Authentication**: Firebase Authentication
- **Real-time Communication**: WebSocket
- **Database**: MySQL

## 👥 Team Members & Responsibilities

- **Ayush**: Backend development and database design
- **Sakshi**: Frontend UI development and responsiveness
- **Sejal**: Authentication and real-time multiplayer logic
- **Mrunal**: UI/UX design, testing, and documentation

## 📅 Development Timeline (8 Weeks)

### Week 1: Research & Planning
- Finalize problem statement
- Research quiz platforms
- Conduct user surveys

### Week 2: Design Phase
- Create wireframes and UI flow
- Design host, player, and leaderboard interfaces

### Week 3: Backend Setup
- Set up Spring Boot project
- Configure MySQL database
- Build core APIs

### Week 4: Frontend Development
- Develop React.js frontend
- Implement Tailwind CSS styling

### Week 5: Authentication & Core Logic
- Add Firebase Authentication
- Implement host/player quiz session logic

### Week 6: Real-time Features
- Integrate WebSocket for multiplayer
- Implement live leaderboard

### Week 7: Testing & Polish
- QA testing
- UI polish and bug fixing
- Feature completion

### Week 8: Finalization
- Complete documentation
- Prepare demo
- Present working prototype

## 🚀 Features

- **Host Dashboard**: Create and manage quiz sessions
- **Player Interface**: Join quiz sessions and compete
- **Real-time Gameplay**: Live multiplayer quiz experience
- **Live Leaderboard**: Real-time score tracking
- **Firebase Authentication**: Secure user management
- **Responsive Design**: Works on all devices

## 📦 Project Structure

```
aptibattle/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/                # React.js frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── database/                # MySQL scripts
└── docs/                   # Documentation
```

## 🔧 Installation & Setup

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Database Setup
```bash
mysql -u root -p < database/schema.sql
```

## 🎮 How to Use

1. **Host**: Create an account, set up a quiz session
2. **Players**: Join using session code
3. **Compete**: Answer questions in real-time
4. **Win**: Check live leaderboard for rankings

## 📊 Milestones

- **Week 1-2**: Problem finalization, user feedback, UI wireframes
- **Week 3-4**: Backend + API development, frontend UI setup
- **Week 5-6**: Core features implemented (auth, quiz logic, multiplayer)
- **Week 7**: Working multiplayer prototype ready
- **Week 8**: Final report, GitHub repository, live demo

## 🏆 Demo

Live demo will be available at: [To be updated]

## 📄 License

This project is for educational purposes as part of our coursework.