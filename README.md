# LibraLog

LibraLog is a modern web application for managing and tracking personal logs and activities. Built with React and Node.js, it provides a seamless experience for users to maintain their daily records.

## Features

- User authentication and authorization
- Secure data storage with MongoDB
- Modern and responsive UI with MaterialUI
- RESTful API architecture

## Tech Stack

### Frontend

- React 19
- Tailwind CSS
- Framer Motion
- Material UI
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn package manager

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LibraLog.git
cd LibraLog
```

2. Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create `.env` files in both client and server directories:

Client (.env):

```
VITE_API_URL=http://localhost:5000
```

Server (.env):

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the server:

```bash
cd server
npm start
```

2. Start the client development server:

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
LibraLog/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── package.json      # Backend dependencies
```

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries used in this project
