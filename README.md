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

## Security Notes

- Passwords are hashed before storage.
- JWT tokens are issued for authenticated sessions.
- Protected routes require valid authentication.
- System-level financial operations require a dedicated system authorization check.

## Example Workflow

```bash
# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

## Environment Variables

Create a `.env` file in the project root with values such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

## Architecture Overview

The backend follows a modular Express architecture with separate responsibilities for routing, controllers, middleware, models, and services:

- `app.js` boots the Express server and mounts the main route groups.
- `auth.routes.js` handles registration, login, and logout.
- `account.routes.js` manages account creation and balance queries.
- `transaction.routes.js` processes user and system transactions.
- `auth.middleware.js` validates JWT tokens and access restrictions.
- Models store persistent account, user, transaction, and ledger data.
- `email.service.js` sends transactional email notifications.

This separation keeps the API easier to extend and maintain as the banking platform grows.

## Common Workflow

A typical flow in the application looks like this:

1. A user registers with email, name, and password.
2. The server creates the user and returns a signed JWT.
3. The client stores the token and includes it for authenticated requests.
4. The user creates an account and performs deposits or transfers.
5. Ledger entries are written to maintain an auditable record of balances.
6. Transaction notifications are sent via email when relevant events occur.

## Project Notes

- The project uses MongoDB for persistent storage.
- Balance logic is derived from ledger entries instead of storing a single mutable balance value.
- System-funded transactions use additional middleware to restrict privileged access.
- Cookie-based authentication is used for the web flow, while JWT tokens can also be passed in headers when needed.

## Example Authenticated Request

```bash
curl -X GET http://localhost:3000/api/accounts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Example Transaction Request

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "fromAccountId": "ACCOUNT_ID_1",
    "toAccountId": "ACCOUNT_ID_2",
    "amount": 250,
    "description": "Monthly transfer"
  }'
```

## Development Notes

- Run the project with `npm run dev` for live reload during development.
- Use `node --check` or similar syntax validation when debugging route or controller issues.
- Keep `.env` out of version control using the project ignore rules.
- Ensure MongoDB is available before starting the server.

## License

This project is for educational and demonstration purposes.
