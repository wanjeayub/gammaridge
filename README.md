
# Loan Application System

A complete MERN stack loan application system with both frontend and backend functionalities. This application enables users to register, apply for loans, view loan statuses, and manage account details, while admins can manage user accounts, approve or reject loan applications, and track loan statuses.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### User Features
- **Registration and Authentication**: Users can register, log in, and log out.
- **User Dashboard**: View and manage applied loans, update profile details, and apply for a new loan.
- **Loan Application**: Users can apply for a loan, specifying the amount and repayment duration, and view the loan’s status.
- **Loan Payment**: Make full or partial payments on approved loans, and view loan balance updates.
- **Profile Management**: Update personal information and change the password.

### Admin Features
- **Admin Dashboard**: View all registered users and their loan details.
- **Loan Management**: Approve or reject loan applications and manage loan statuses.
- **Loan Tracking**: Track loans by categories such as pending, approved, rejected, in-progress, and paid loans.
- **User Management**: CRUD operations on user data and loan records.

## Technologies Used
- **Frontend**: Vite, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT and OAuth (Google login)
- **Image Storage**: Firebase
- **API Handling**: Fetch API

## Getting Started
To get a local copy of the project up and running, follow these steps.

### Prerequisites
- **Node.js**: Make sure Node.js is installed on your machine. [Download here](https://nodejs.org/).
- **MongoDB**: Set up MongoDB for the database. You can use MongoDB Atlas or install MongoDB locally.
- **Firebase**: Set up a Firebase project for storing images.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/loan-application-system.git
   cd loan-application-system
   ```

2. **Install dependencies for backend and frontend**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in both the backend and frontend directories and add the following environment variables:

### Backend `.env`
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
```

### Frontend `.env`
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_API_BASE_URL=http://localhost:5000/api
```

## Usage

1. **Run the backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Run the frontend server**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Visit** `http://localhost:3000` to access the application.

## API Endpoints

Here’s a summary of the key API endpoints:

### Authentication
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Log in a user
- **POST /api/auth/google** - OAuth with Google

### Loan Management
- **GET /api/loans** - Get all loans (admin)
- **POST /api/loans** - Apply for a new loan
- **PATCH /api/loans/:id** - Update loan status or details (admin)
- **DELETE /api/loans/:id** - Delete a loan record (admin)

### User Management
- **GET /api/users** - Get all users (admin)
- **PATCH /api/users/:id** - Update user information
- **DELETE /api/users/:id** - Delete a user (admin)

## Contributing
Contributions are welcome! Please feel free to submit a pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.
