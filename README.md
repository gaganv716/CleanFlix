# 🎬 CleanFlix

> *"Ad-free streaming, Clean and Simple."*

CleanFlix is a movie and TV show streaming platform built for **educational purposes**. It offers a clean interface, a YouTube-powered trailer system, and integration with a third-party API (`vidsrc.cc`) to stream full movies and shows. Designed with a modern UI using **React+Vite**, **Node.js**, and **TMDB API**, it serves as a showcase of full-stack development in action.

---

## 🚨 Disclaimer

> This project uses **[vidsrc.cc](https://vidsrc.cc)** to fetch and stream movie and TV show content strictly for **educational and demonstration purposes only**.  
> **YouTube** is used exclusively for fetching trailers.

We do **not host or distribute any copyrighted content**. All content rights belong to their respective owners.

---

## 🔥 Features

- 🎞️ Browse trending movies and TV shows
- 🎥 Watch trailers from **YouTube**
- 🎬 Stream full content using **vidsrc.cc**
- 🔍 Search functionality
- 🌙 Dark-themed clean UI
- 💨 Ad-free experience (matches the CleanFlix name!)
- 🔐 Popup modals for content preview
- ⚡ Fast load with **Vite** and optimized backend API

---

## 🗂️ Folder Structure

📁 CLEANFLIX
├── Backend  
│   ├── middleware/  
│   ├── models/  
│   ├── node_modules/  
│   ├── routes/  
│   ├── .env  
│   ├── package-lock.json  
│   ├── package.json  
│   ├── proxy.js  
│   └── server.js  
├── Frontend  
│   ├── node_modules/  
│   ├── public/  
│   ├── src/  
│   │   ├── assets/  
│   │   ├── components/  
│   │   └── pages/  
│   ├── App.css  
│   ├── App.jsx  
│   ├── index.css  
│   ├── main.jsx  
│   ├── eslint.config.js  
│   ├── index.html  
│   ├── package-lock.json  
│   ├── package.json  
│   ├── README.md  
│   └── vite.config.js  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gaganv716/CleanFlix
cd CleanFlix
```

### 2. Start Backend Server

```bash
cd Backend
npm install
node server.js
```

> Make sure you have a `.env` file with your API key (like TMDB) if required.

### 3. Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 📺 APIs & Tools Used

- TMDB API  
- YouTube iFrame API  
- vidsrc.cc (used only for educational content streaming)  
- React.js, Node.js, Express.js, Vite, Axios, ReactPlayer

---

## 🧑‍💻 Developer

**Gagan V**  
GitHub: [@gaganv716](https://github.com/gaganv716)  
Email: [gaganvijaykumar14@gmail.com]

---

## 📌 Note to Recruiters or Reviewers

This project was made to explore full-stack development, media streaming integration, and frontend/backend coordination. I chose not to deploy due to the inclusion of third-party streaming services like vidsrc.cc, which may violate content policies on public platforms.

**The goal is to demonstrate:**

- Frontend skills (React, modals, clean UI)  
- Backend API handling and middleware  
- API integration (YouTube + TMDB + custom APIs)

---

## 📃 License

This project is not for commercial use. Educational purposes only.
