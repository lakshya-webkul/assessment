# Project Setup Guide

## Frontend Setup

1. Navigate to the front directory:
2. Install dependencies: (npm install)
3. Start the frontend server: (npm start)

## Backend Setup

1. Navigate to the server directory:
2. Install dependencies: (npm install)
3. Start the backend server: (npm start)

## Admin User Setup

- You can use the following admin credentials:

```json
{
 "email": "admin@gmail.com",
 "password": "admin",
}

- Or create a new admin user using:
POST http://localhost:5000/auth/register

payload
{
  "email": "",
  "password": "",
  "name": ""
}
