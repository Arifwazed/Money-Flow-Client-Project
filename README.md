# 💰 Money Flow — Expense Tracker (Client)

 A modern, full‑stack personal finance management application that helps users track income, manage expenses, and gain insights through interactive dashboards and charts.

---

## 🚀 Project Overview

**Money Flow** is a full‑stack expense tracker built with **React** on the client side and **Node.js/Express** on the server side. The application allows users to securely authenticate, record income and expenses, and visualize their financial data in real time.

This repository contains the **client (frontend)** of the application. It communicates with a RESTful backend API to handle data persistence, business logic, and secure access.

---

## 🧠 System Architecture

```
React Client (Vite)
   ↓ Axios
Express REST API
   ↓
Database (Server Side)
```

Authentication is handled on the client using **Firebase Authentication**, while the server manages transaction data via secure API endpoints.

---

## 🧰 Tech Stack (Client)

* React (Vite)
* Tailwind CSS
* React Router DOM
* Firebase Authentication
* Axios
* Chart.js / Recharts
* React Icons

---

## ✨ Core Features

* 🔐 Secure authentication (Email/Password & Google Sign‑In)
* ➕ Add income and expense transactions
* 🗂️ Category‑based transaction tracking
* 📊 Dashboard showing total income, expenses, and balance
* 📈 Interactive charts (Pie & Bar)
* ✏️ Edit and delete transactions
* 🌙 Light / Dark mode support
* 📱 Fully responsive UI

---

## 🔗 Backend Integration

This client application connects to a dedicated backend server:

* **Backend Repository:** [https://github.com/Arifwazed/Money-Flow-Server-Project](https://github.com/Arifwazed/Money-Flow-Server-Project)
* **Backend Tech:** Node.js, Express.js, REST API

The backend is responsible for:

* Handling CRUD operations for transactions
* Managing secure API endpoints
* Processing and storing financial data

---

## 📦 Dependencies

Main dependencies used in this client project:

* `react`
* `react-dom`
* `react-router-dom`
* `firebase`
* `axios`
* `chart.js` / `recharts`
* `tailwindcss`
* `react-icons`

📌 See `package.json` for the full list of dependencies.

---

## ⚙️ Run the Client Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Arifwazed/Money-Flow-Client-Project.git
cd Money-Flow-Client-Project
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add your Firebase credentials:

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_sender_id
VITE_APPID=your_app_id
VITE_SERVER_URL=http://localhost:5000
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The client will run at **[http://localhost:5173](http://localhost:5173)**

---

## 🌐 Live Links & Resources

* 🌍 **Live Client App:** [https://money-flow-bc928.web.app/](https://money-flow-bc928.web.app/)
* 👨‍💻 **Client Repo:** [https://github.com/Arifwazed/Money-Flow-Client-Project](https://github.com/Arifwazed/Money-Flow-Client-Project)
* 🛠️ **Server Repo:** [https://github.com/Arifwazed/Money-Flow-Server-Project](https://github.com/Arifwazed/Money-Flow-Server-Project)
* 🔥 **Firebase Docs:** [https://firebase.google.com/docs](https://firebase.google.com/docs)

---

## 👤 Author

**Arif Hamim**
Frontend & Full‑Stack Developer

* GitHub: [https://github.com/Arifwazed](https://github.com/Arifwazed)

