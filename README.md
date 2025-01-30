# Shopping - E-commerce Website

[![Website](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen)](https://shopping-sand.vercel.app/)
[![GitHub](https://img.shields.io/github/stars/kaaado/Shopping?style=social)](https://github.com/kaaado/Shopping)
[![Issues](https://img.shields.io/github/issues/kaaado/Shopping)](https://github.com/kaaado/Shopping/issues)

## Overview

**Shopping** is a modern e-commerce web application designed to provide a seamless shopping experience. Built with **React for the frontend and Laravel for the backend**, it ensures a smooth user experience with robust API integration and security features.

## 🚀 Live Demo
🔗 **[Visit Shopping Website](https://shopping-sand.vercel.app/)**

## 📌 Features

### ✅ Current Features:
- User Authentication
- Fully Dashboard
- Responsive Website
- Product Listing
- Shopping Cart
- Order Placement
- Secure API Integration

### 🔜 Upcoming Features:
- 🔍 **Search Products & Categories**
- 👤 **User Profile & Payment Integration**
- 💬 **Comments & Ratings System**
- 🚀 **Performance & UI  Enhancements & Adding AI**

## 🛠️ Tech Stack

### **Frontend:**
- **React.js** – Client-side rendering & SSR for fast performance
- **Bootstrap CSS** – Responsive and modern UI styling
- **Redux & Hooks** – State management

### **Backend:**
- **Laravel** – RESTful API with authentication & business logic
- **MySQL** – Database for storing products, users, and orders
- **Railway** – Cloud backend hosting

### **Deployment & DevOps:**
- **Vercel** – Frontend hosting
- **Railway** – Backend hosting (currently experiencing an image upload issue)
- **GitHub** – Version control and open-source collaboration

## ⚠️ Known Issues
- 🖼️ **Image Upload Issue**: Images fail to upload from the backend hosted on Railway. (Fix pending)

## 📦 Installation & Setup

### Prerequisites:
- Node.js & npm/yarn
- PHP & Composer
- MySQL

### **Clone the repository:**
```sh
 git clone https://github.com/kaaado/Shopping.git
 cd Shopping
```

### **Backend Setup (Laravel API):**
```sh
 cd backend
 composer install
 cp .env.example .env
 php artisan key:generate
 php artisan migrate --seed
 php artisan serve
```

### **Frontend Setup (Next.js):**
```sh
 cd frontend
 npm install
 npm start
```

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit pull requests.

## 📜 License
This project is licensed under the **MIT License**.

## 📧 Contact
For any questions or suggestions, feel free to reach out:
- **GitHub**: [kaaado](https://github.com/kaaado)
- **Website**: [Shopping](https://shopping-sand.vercel.app/)
