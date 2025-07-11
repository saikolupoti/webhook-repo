# 🚀 GitPulse – GitHub Webhook Dashboard

**GitPulse** is a real-time dashboard that listens to GitHub webhooks and visually displays push, pull request, and merge events. It’s a simple yet effective way to monitor your repository's activity as it happens.

---

## 📌 Features

- 🔁 **Real-time GitHub webhook handling**
- 📦 Stores events in **MongoDB**
- 💬 Displays events in a user-friendly dashboard
- 🎯 Supports:
  - `push`
  - `pull_request`
  - `merge` events
- 🌐 Clean UI with toggleable themes (light/dark)
- 🌟 Animated background with stars and clouds for a visual touch

---

## 🛠 Tech Stack

- **Backend**: Flask (Python)  
- **Database**: MongoDB Atlas  
- **Frontend**: HTML, CSS, JavaScript  

---

## 📤 How It Works

1. GitHub triggers a webhook event (e.g., push, pull request).
2. Flask receives and parses the webhook payload.
3. The event is stored in MongoDB.
4. The frontend fetches new events every 15 seconds and updates the UI.

---

## 🔧 Setup Instructions

### Backend (Flask)

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/webhook-repo.git
   cd webhook-repo
