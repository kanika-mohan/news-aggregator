# 📰 NewsHub — Personalized News Aggregator

A full-stack personalized news aggregation platform that allows users to discover, search, bookmark, and track news articles based on their interests.

## 🚀 Features

* 🔐 User Registration & Login
* 📰 Latest News Aggregation
* 🔎 News Search
* 🏷️ Category-based News Filtering
* ⭐ Personalized News Preferences
* 🔖 Bookmark Articles
* 🕒 Reading History
* 📊 Reading Analytics
* 👤 User Profile
* 🌙 Dark / Light Mode
* 📱 Responsive Design
* 🔒 JWT-based Authentication
* 🗄️ MongoDB Data Storage

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Lucide React
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST API

### Tools

* VS Code
* Git
* GitHub
* Postman
* MongoDB

## 📂 Project Structure

```text
news-aggregator/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── package.json
│   └── server.js
│
├── postman/
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/kanika-mohan/news-aggregator.git
cd news-aggregator
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
```

> Never upload your `.env` file to GitHub.

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🔑 Authentication

The application uses JWT-based authentication.

After successful login:

1. The backend generates a JWT token.
2. The frontend stores the token in local storage.
3. Protected API requests use the token.
4. Users can access personalized features such as bookmarks, history, profile, and analytics.

## 📊 Analytics

The analytics dashboard provides insights into the user's reading activity, including:

* Total articles read
* Reading history
* Category-based reading activity
* User engagement information

## 🎨 User Preferences

Users can select preferred news categories from their profile.

These preferences are stored in MongoDB and used to personalize the news feed.

## 🔖 Bookmarks & History

Users can:

* Save articles for later reading
* Remove saved articles
* Track articles they have opened
* View their reading history

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

## 🔮 Future Improvements

* AI-powered personalized recommendations
* Intelligent news summarization
* Trending news detection
* Multi-language news support
* Push notifications
* Advanced reading analytics
* Recommendation engine based on reading behavior

## 👩‍💻 Developer

**Kanika Mohan**

B.Tech — Artificial Intelligence & Data Science

GitHub: https://github.com/kanika-mohan

## 📄 License

This project is developed for educational and portfolio purposes.
