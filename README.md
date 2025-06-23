# Rehearsal Scheduler

A web application for automatically scheduling band rehearsals, sending reminders, tracking attendance, and suggesting optimal rehearsal times based on member availability.

## 🎵 Features

- **User Authentication and Roles**
  - Create an account and join your band's workspace
  - Create a band and invite members to join
  - Assign different roles and permissions to band members

- **Availability Management**
  - Set recurring availability for rehearsals
  - Mark specific dates/times as unavailable
  - See an overview of all members' availability

- **Rehearsal Scheduling**
  - Create and schedule rehearsal sessions
  - Get intelligent suggestions for optimal rehearsal times
  - View upcoming rehearsals on a calendar

- **Attendance Tracking**
  - RSVP to rehearsal invitations
  - Track attendance for each rehearsal
  - See attendance history and patterns

- **Rehearsal Management**
  - Add details to rehearsals (location, equipment needed, etc.)
  - Add notes/comments to specific rehearsals
  - Attach setlists or music sheets to rehearsal details

- **Notifications and Reminders**
  - Receive notifications about new or changed rehearsals
  - Get reminders before upcoming rehearsals
  - Send announcements to all band members

- **Reporting and Analytics**
  - View attendance statistics and trends
  - Identify optimal rehearsal times based on historical data
  - See personal attendance records

## 🚀 Technology Stack

### Frontend:
- React.js with TypeScript
- Material-UI for UI components
- Redux for state management
- FullCalendar for calendar visualization
- Formik with Yup for form validation

### Backend:
- Node.js with Express
- RESTful API
- JWT Authentication
- SendGrid for email notifications
- Firebase Cloud Messaging for push notifications

### Database:
- PostgreSQL for data storage
- Redis for caching and session management

### DevOps & Deployment:
- Docker for containerization
- GitHub Actions for CI/CD
- Deployable to AWS or Heroku
- Sentry for error tracking

## 📋 Project Structure

```
├── client/               # Frontend React application
│   ├── public/           # Static files
│   └── src/              # Source files
│       ├── assets/       # Images, icons, etc.
│       ├── components/   # Reusable UI components
│       ├── context/      # Context API files
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page components
│       ├── services/     # API services
│       ├── store/        # Redux store
│       ├── types/        # TypeScript types
│       └── utils/        # Utility functions
│
├── server/               # Backend Node.js/Express application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── db/               # Database models and migrations
│   ├── middleware/       # Custom middleware
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
│
├── docker/               # Docker configuration
├── docs/                 # Documentation
└── scripts/              # Build and deployment scripts
```

## 📥 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn
- PostgreSQL 12.x or higher
- Redis (optional, for caching)

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/rehearsal-scheduler-dx-62385.git
   cd rehearsal-scheduler-dx-62385
   ```

2. Install dependencies
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Environment setup
   ```bash
   # Copy environment file examples
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the .env files with your configuration
   ```

4. Database setup
   ```bash
   # Run database migrations
   cd server
   npm run db:migrate
   
   # (Optional) Seed the database with initial data
   npm run db:seed
   ```

5. Start the development servers
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # Start frontend development server (in another terminal)
   cd client
   npm start
   ```

## 🐳 Docker Deployment

1. Build and run with Docker Compose
   ```bash
   docker-compose up -d
   ```

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📱 Mobile Responsiveness

The application is designed with a mobile-first approach to ensure usability on all devices:
- Responsive layout adapts to different screen sizes
- Touch-friendly UI elements
- Optimized for both portrait and landscape orientations

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CSRF protection
- Rate limiting for API endpoints
- Input validation and sanitization
- Regular security updates

## 🔄 Integrations

- Google Calendar / iCal for calendar sync
- Spotify for setlist integration
- WhatsApp or Telegram for notifications
- Dropbox/Google Drive for file storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

For questions or support, please open an issue or contact [dxag.info@gmail.com](mailto:dxag.info@gmail.com).