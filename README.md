# Vector - Real-Time Chat Application

![Vector Chat](https://github.com/n1shan1/STATIC-REPO/blob/master/images/vector-ong.png)  
*A modern real-time chat application built with React, Node.js, and Socket.io.*

## ✨ Features
- **Real-time messaging** with Socket.io
- **User authentication** (JWT & cookies)
- 32 DaisyUI themes built into the app, navigate to *Settings* on the navbar.
- **Cloudinary integration** for image uploads
- Responsive UI powered by **Tailwind CSS + DaisyUI**
- Toast notifications via `react-hot-toast`
- State management with **Zustand**
- RESTful API with Express.js
- MongoDB for database storage

## 🛠 Tech Stack
**Frontend**  
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary)

**Tools**  
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss)

## 🚀 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/n1shan1/vector-fullstack.git
   cd vector-chat
   ```

2. **Set up backend**
   ```bash
   cd server
   npm install
   ```

3. **Set up frontend**
   ```bash
   cd ../client
   npm install
   ```

## ⚙ Configuration
Create `.env` files in both directories:

**Backend (chat-app-backend/.env)**
```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV-""production/developement"
```

**Frontend (client/.env)**
```env
VITE_API_URL=http://localhost:4000
```

## ▶ Running the App
1. **Start backend**
   ```bash
   cd chat-app-backend
   npm run dev
   ```

2. **Start frontend** (in separate terminal)
   ```bash
   cd client
   npm run dev
   ```

3. Access app at `http://localhost:5173`

## 📄 License
Distributed under the ISC License. See `LICENSE` for more information.

## 🙏 Acknowledgements
- React & Vite teams
- Express.js community
- Cloudinary for media management
- Socket.io for real-time magic
- DaisyUI for beautiful components
