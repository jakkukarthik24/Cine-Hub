# 🎬 Cine-Hub

**Live Website**: [cine-hub69.netlify.app](https://cine-hub69.netlify.app)
**GitHub Repo**: [github.com/jakkukarthik24/Cine-Hub](https://github.com/jakkukarthik24/Cine-Hub)

Cine-Hub is a full-stack movie web application where users can browse trending films, manage a personalized watchlist, and save their favorites. Built with the **PERN stack (PostgreSQL, Express.js, React, Node.js)**, it showcases robust frontend development, secure backend integration, and RESTful API consumption.

---

## 🚀 Features

* 🔎 **Browse Trending Movies** using the TMDB API
* ✅ **User Authentication** (Login/Signup)
* ❤️ **Add to Favorites** and 🕒 **Watchlist** functionality
* 🔐 **Protected Routes** for authenticated users
* 🌐 **Deployed on Netlify (frontend)** and **Render (backend)**
* ⚙️ **CORS configured** for secure cross-origin requests
* 📱 Responsive design for desktop & mobile

---

## 🛠️ Tech Stack

| Tech         | Role                   |
| ------------ | ---------------------- |
| React.js     | Frontend Framework     |
| Tailwind CSS | Styling                |
| Express.js   | Backend Server         |
| Node.js      | Runtime Environment    |
| PostgreSQL   | Relational Database    |
| Render       | Backend Deployment     |
| Netlify      | Frontend Deployment    |
| TMDB API     | Movie Data Integration |

---

## 🧠 Learning Outcomes

* Integrated third-party APIs (TMDB) for real-world data usage
* Built secure backend APIs with authentication and protected routes
* Used `fetch`/`axios` and async/await effectively in React for state management
* Learned to troubleshoot and resolve CORS issues during deployment
* Experience deploying full-stack apps on Netlify and Render

---

## 🧑‍💻 Getting Started Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/jakkukarthik24/Cine-Hub.git
   ```

2. **Install dependencies**

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. **Set up environment variables**

   * Create a `.env` file in the `server/` directory:

     ```
     PORT=5000
     DB_URL=your_postgresql_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the app**

   ```bash
   cd server
   npm start

   cd ../client
   npm run dev
   ```

---

## 📌 Folder Structure

```
Cine-Hub/
├── client/               # React frontend
│   └── src/
│       └── components/
│       └── context/
│       └── pages/
├── server/               # Express backend
│   └── routes/
│   └── controllers/
│   └── models/
│   └── middleware/
```

---

## 📈 Future Improvements

* 🔐 OAuth with Google and GitHub
* 📊 User analytics dashboard
* 📝 User reviews and ratings
* 🌎 Multi-language support

---

## 📣 Acknowledgments

* [The Movie Database (TMDB)](https://www.themoviedb.org/) for the API
* [Render](https://render.com/) and [Netlify](https://www.netlify.com/) for free deployment platforms

---

## 👨‍💼 About Me

Hi, I'm **Jakku Sravana Venkata Karthik**, a passionate Computer Science student focused on building real-world, impactful full-stack applications. I'm constantly learning and experimenting with modern technologies to create elegant, scalable, and user-friendly software.

[📧 Email Me](jakkukarthik24@gmail.com) | [💼 LinkedIn](https://www.linkedin.com/in/jakkukarthik24)

---

Let me know if you'd like the image/screenshot embedded, or want to tweak this for a specific job role (e.g., frontend-heavy or full-stack-focused).
