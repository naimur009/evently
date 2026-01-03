# Evently - Responsive Event Management Dashboard

Evently is a modern, full-stack event management platform featuring a high-fidelity, responsive admin dashboard. Built with the latest web technologies, it provides a seamless experience for managing events, users, and sales data across all devices.

## 🚀 Technologies Used

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, XSS-Clean, Mongo Sanitize, Rate Limit
- **Payments**: SSLCommerz Integration
- **Email**: Nodemailer

## ✨ Key Features

### 📊 Modern Dashboard
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **Adaptive Sidebar**: 
  - **Desktop**: Collapsible vertical navigation.
  - **Mobile**: Bottom navigation bar with expandable drawer for access to all features.
- **Interactive UI**: Smooth animations, glassmorphism effects, and premium UI components.
- **Data Visualization**: Real-time metric cards and charts.

### 📅 Event Management
- **Create & Edit**: Comprehensive forms to manage event details.
- **List View**: Responsive tables/cards to view all events.
- **Filtering**: Advanced search and filter options.

### 👥 User Administration
- **User Management**: View and manage detailed user profiles.
- **Role-Based Access**: Secure admin and user roles.

### 🔒 Security & Performance
- **Secure Auth**: HttpOnly cookies and JWT protection.
- **Optimization**: Server-side rendering (SSR) and optimized assets.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/evently.git
cd evently
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=8000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add other backend env vars
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Start the frontend development server:
```bash
npm run dev
```

## 📂 Project Structure

```
evently/
├── frontend/          # Next.js 15 Client
│   ├── app/           # App Router
│   │   ├── (Dashboard)/ # Admin Dashboard Layouts & Pages
│   │   └── components/  # Reusable UI Components
│   └── public/        # Static Assets
│
├── backend/           # Express Server
│   ├── models/        # Mongoose Models
│   ├── routes/        # API Routes
│   └── controllers/   # Request Handlers
│
└── README.md          # Project Documentation
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
