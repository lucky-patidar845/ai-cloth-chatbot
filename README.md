AI Cloth Chatbot – Full Stack Project

A production-deployed full-stack web application that provides an AI-style conversational chatbot for a clothing store, along with a secure admin panel to manage products dynamically.

This project demonstrates real-world full-stack skills including backend APIs, database integration, frontend deployment, cloud hosting, and CI/CD workflows.

🔗 Live Deployment

• Frontend (Netlify)
🌐 https://ai-cloth-chatbot.netlify.app

• Backend API (Render)
⚙️ https://ai-cloth-chatbot.onrender.com

• Admin Panel
🔐 https://ai-cloth-chatbot.netlify.app/admin.html

🎯 Project Objective

The goal of this project is to simulate a real retail assistant chatbot that:

• Answers customer queries about products (availability, price, material, size, etc.)

• Allows admins to manage inventory without redeploying code

• Works across desktop and mobile devices

• Is deployed on real cloud platforms

✨ Key Features
👤 User (Chatbot)

• AI-style conversational responses

• Product-aware answers (from MongoDB)

• Fast and lightweight UI

• Mobile-responsive design

• Dark / Light mode support

🧑‍💼 Admin Panel

• Secure product management using admin key

• Add products dynamically (no restart required)

• Manage category, size, color, price & stock

• Responsive admin UI (desktop + mobile)

🛠️ Tech Stack
Frontend

• HTML5

• CSS3 (Responsive Design + Dark Mode)

• JavaScript (Vanilla)

• Netlify (Deployment)

Backend

• Node.js

• Express.js

• MongoDB Atlas

• Mongoose

• dotenv

• CORS

• Render (Deployment)

🧩 System Architecture

Frontend (Netlify)
      │
      │  REST API (fetch)
      ▼
Backend (Render – Express.js)
      │
      ▼
MongoDB Atlas (Cloud Database)

📂 Project Structure

ai-cloth-chatbot/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── index.html        # Chatbot UI
│   ├── admin.html        # Admin Panel
│   ├── style.css
│   ├── script.js
│   ├── admin.js
│
├── package-lock.json
└── README.md

⚙️ Environment Variables

Create a .env file inside backend/:

PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

ADMIN_KEY=your_secure_admin_key


🔒 .env is excluded from GitHub for security.

▶️ Run Locally

1️⃣ Clone Repository
git clone https://github.com/lucky-patidar845/ai-cloth-chatbot.git
cd ai-cloth-chatbot

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend runs on:

http://localhost:5000

3️⃣ Frontend

Open directly:

frontend/index.html

🔐 API Overview

Chat API

POST /chat
Content-Type: application/json

{
  "message": "Do you have cotton shirts?"
}

Admin API

POST /admin/add-product
Headers:
x-admin-key: YOUR_ADMIN_KEY

📱 Mobile Responsiveness

• Mobile-first CSS design

• Optimized input & buttons for touch

• Responsive layout for all screen sizes

• Dark mode works seamlessly on mobile

🚀 Deployment Details

• Backend deployed on Render with auto-deploy from GitHub

• Frontend deployed on Netlify with CI/CD

• MongoDB hosted on MongoDB Atlas

• Secure environment variables handling

🧠 What This Project Demonstrates (For Interviewers)

• REST API design

• Database schema & CRUD operations

• Frontend–backend integration

• Cloud deployment (Netlify + Render)

• Debugging real production issues

• Clean project structure & version control

• Understanding of security basics (env variables, admin key)

🔮 Future Enhancements

• AI model integration (OpenAI / Gemini)

• Admin authentication with JWT

• Product update & delete features

• Image upload for products

• Order & cart system

• Progressive Web App (PWA)

👨‍💻 Developer

Lucky Patidar

🎓 Junior Engineer | Full Stack Developer (Learning & Building)

🔗 GitHub: https://github.com/lucky-patidar845

⭐ Feedback & Support

If this project helped you:

⭐ Star the repository

🍴 Fork it

🧠 Use it to learn full-stack deployment

📌 Note for Recruiters

This project is fully deployed, database-driven, and maintained with clean architecture, reflecting real-world development practices rather than tutorial-only code
