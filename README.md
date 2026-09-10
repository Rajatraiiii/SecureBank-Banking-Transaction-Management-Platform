# SecureBank

SecureBank is a banking transaction management platform built with Node.js, Express, and MongoDB. It provides user authentication, account management, transaction processing, and protected banking flows for both personal and system-funded transfers.

## Overview

This project is designed to support a secure backend for a financial application. It includes:

- User registration and login
- JWT-based authentication
- Protected account routes
- Transaction creation and balance tracking
- System-funded transactions
- Email notifications for registration and transaction events

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add the required environment variables.
4. Start the server:

```bash
npm run dev
```

The application runs on port `3000` by default.

## API Endpoints

### Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token
- `POST /api/auth/logout` — Logout and clear the auth cookie

### Accounts

- `POST /api/accounts` — Create a new bank account
- `GET /api/accounts` — Get accounts for the authenticated user
- `GET /api/accounts/balance/:accountId` — Get balance for a specific account

### Transactions

- `POST /api/transactions` — Create a user transaction
- `POST /api/transactions/system/initial-funds` — Create initial system-funded balance entries

## Features

- Secure user registration with password hashing
- Login flow with JWT issuance
- Logout support that clears the auth cookie
- Account creation and account listing
- Balance retrieval using transaction ledger data
- Debits and credits tracked through an immutable ledger model
- Transaction processing with validation and balance checks
- Role-aware system funding endpoints

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email notifications
- Dotenv for environment configuration

## Project Structure

```text
.
├── src/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── account.model.js
│   │   ├── ledger.model.js
│   │   └── transaction.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   ├── services/
│   │   └── email.service.js
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Environment Variables

Create a `.env` file in the project root with values such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## License

This project is for educational and demonstration purposes.
