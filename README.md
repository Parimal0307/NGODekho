# NGODekho

A full-stack web application that connects NGOs with individuals who want to contribute, volunteer, or benefit from the services offered by NGOs. This project includes separate interfaces for users and NGOs, managed by a centralized backend.

## 🌟 Features
* User registration and login
* NGO registration and service listing
* Browsing and connecting with NGOs
* Volunteer signups and service participation
* Admin panel (optional/future enhancement)

## 🏗️ Project Structure
├── backend/         # Node.js/Express backend API
├── ngo-frontend/    # Frontend for NGOs to manage their profiles and services
└── user-frontend/   # Frontend for users to explore and connect with NGOs

## 🚀 Getting Started

### Prerequisites
* Node.js (v14 or higher)
* React
* MongoDB
* Git

### 1. Clone the repository
    git clone https://github.com/Parimal0307/NGODekho.git
    cd your-repo-name

### 2. Setup the Backend
    cd backend
    npm install
    npm start

    The backend will start on http://localhost:4000 by default.

### 3. Run NGO Frontend
    cd ../ngo-frontend
    npm install
    npm run dev

### 4. Run User Frontend
    cd ../user-frontend
    npm install
    npm run dev

Each frontend typically runs on a separate port like localhost:3000, localhost:3001, etc.

## 📂 Future Improvements
* Role-based authentication (Admin/NGO/User)
* Service request history
* Feedback and rating system
* Search and filter options

## 🙌 Contribution Guidelines
* Fork the repository
* Create a new branch (git checkout -b feature-name)
* Commit your changes (git commit -m 'Add feature')
* Push to the branch (git push origin feature-name)
* Open a Pull Request

## 📄 License
This project is licensed under the MIT License.

===============

Made with ❤️ for community service!