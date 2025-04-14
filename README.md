# Thao Truong Art Website

A modern website for Thao Truong Art, built with React and FastAPI.

## Project Structure

- `frontend/`: React frontend application
- `backend/`: FastAPI backend server

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- npm or yarn

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   SMTP_EMAIL=your-email@gmail.com
   SMTP_PASSWORD=your-app-specific-password
   ```

5. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

The backend API will be available at `http://localhost:8000`

## Features

- Modern, responsive design
- Contact form with email notifications
- Collections gallery
- FAQ section
- About the artist
- Social media integration

## Development

- Frontend: React with TypeScript, Material-UI
- Backend: FastAPI, Python
- Email: SMTP for contact form notifications

## Deployment

For production deployment, you'll need to:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Configure environment variables for production
3. Set up a production-grade web server (e.g., Nginx)
4. Configure SSL certificates
5. Set up a production email service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
