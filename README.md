# 🌱 **Diet FAQ Chat Application**

### 🚀 A Smart Diet Assistant powered by Google Gemini + Firebase Auth + MongoDB

---

## ✨ **Live Demo**

### 🌐 **Frontend (Vercel):**

👉 [https://diet-faq-chat-app.vercel.app](https://diet-faq-chat-app.vercel.app/)

### 🔗 **Backend (Render):**

👉 [https://diet-faq-chat-app.onrender.com](https://diet-faq-chat-app.onrender.com)

---

# 🎯 **Project Overview**

A user-friendly chat application where users can:

- ✔️ Login using **Google Authentication**
- ✔️ Ask **diet-related questions**
- ✔️ Receive answers powered by **Google Gemini LLM**
- ✔️ Backend matches the question to **50 Diet FAQs** stored in MongoDB
- ✔️ LLM answers using ONLY the FAQ context
- ✔️ Provides a reference like **(Ref: Question #12)**

---

# 🖼️ **Screenshots**

<img width="1919" height="910" alt="Screenshot 2025-12-09 142145" src="https://github.com/user-attachments/assets/86c1d39f-e222-4dfa-8a01-5742f4f3490e" />
<img width="1919" height="910" alt="Screenshot 2025-12-09 152454" src="https://github.com/user-attachments/assets/7761009a-f755-4eff-8f53-675d94a890a9" />


📌 **Login Page**
📌 **Chat Interface**
📌 **Backend API Response**

---

# 🧩 **Tech Stack**

## 🖥️ **Frontend**

* ⚛️ React (Vite)
* 🔥 Firebase Authentication (Google Login)
* 🎨 Tailwind CSS
* 🔄 React Firebase Hooks
* 🔀 React Router DOM
* 🚀 Deployed on **Vercel**

## 🛠️ **Backend**

* 🟢 Node.js + Express.js
* 🍃 MongoDB + Mongoose
* 🤖 Google Gemini API (`@google/generative-ai`)
* 🔐 dotenv
* 🔄 CORS
* 🚀 Deployed on **Render**

---

# 🗂️ **Project Structure**

```
📦 diet-faq-chat-app
├── 📁 frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Login.jsx
│   │   │   └── Chat.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── firebase.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── 📁 backend
    ├── index.js
    ├── models/Faq.js
    ├── package.json
    └── .env
```

---

# 🔐 **Authentication Flow**

1️⃣ User clicks **Login with Google**

2️⃣ Firebase Auth signs in using Google OAuth

3️⃣ Redirects user → `/chat`

4️⃣ Chat shows **profile picture + name**

5️⃣ User can now chat with the bot

---

# 🤖 **LLM Workflow**

### ✔️ Step 1 — User asks a question

### ✔️ Step 2 — Backend finds **best matching FAQ** using keyword scoring

### ✔️ Step 3 — Sends FAQ → Gemini as **context**

### ✔️ Step 4 — Gemini generates STRICT 1–2 line answer

### ✔️ Step 5 — Ends with:

```
(Ref: Question #X)
```

---

# 🗄️ **API Endpoints**

## 📌 **GET /faqs**

Returns all 50 diet FAQs stored in MongoDB.

### 📤 Example Response:

```json
[
  {
    "number": 1,
    "question": "What is the ideal diet for weight loss?",
    "answer": "A calorie-deficit diet…"
  }
]
```

---

## 📌 **POST /query**

Ask a diet question → backend finds relevant FAQ → Gemini responds.

### 📥 Request:

```json
{
  "question": "How do I lose belly fat?"
}
```

### 📤 Response:

```json
{
  "answer": "Eat fewer calories, increase protein, reduce sugar… (Ref: Question #12)"
}
```

---

# ⚙️ **Run Locally**

## 🟣 **Backend Setup**

```bash
cd backend
npm install
npm run dev
```

Create `.env` in backend:

```
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_gemini_key
PORT=5000
```

---

## 🔵 **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```
VITE_FIREBASE_APIKEY=your_firebase_web_key
```

---

# 🚀 **Deployments**

## 🟢 **Backend Deployment — Render**

* Create a **Web Service**
* Set `build command` → `npm install`
* Set `start command` → `npm start`
* Add env variables:

  * `MONGO_URI`
  * `GEMINI_API_KEY`

---

## 🔵 **Frontend Deployment — Vercel**

📌 Settings:

* **Root Directory:** `frontend`
* **Build Command:** `npm run build`
* **Output Directory:** `dist`
* Add env:

  * `VITE_FIREBASE_APIKEY=xxxxxx`

Add `vercel.json` inside `/frontend`:

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

# 🌟 **Features Implemented**

✅ Google Login (Firebase Auth)
✅ Chat UI with styled bubbles
✅ Gemini LLM integration
✅ MongoDB with all 50 FAQs seeded
✅ Backend API (`/faqs`, `/query`)
✅ CORS enabled + secure deployment
✅ Frontend deployed on Vercel
✅ Backend deployed on Render
✅ Mobile-friendly design

---

# 🛠️ **Improvements Possible**

✨ Add loading animations
✨ Add message persistence
✨ Add dark mode
✨ Add voice input
✨ Add typing indicator for bot

---

# ❤️ **Author**

**Rohan Shete**
Full-Stack Developer | React | Node.js | AI Integrations

---
