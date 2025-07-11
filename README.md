# 🚀 GitPulse – GitHub Webhook Dashboard

**GitPulse** is a real-time dashboard that listens to GitHub webhooks and visually displays push, pull request, and merge events. It’s a simple yet effective way to monitor your repository's activity as it happens.


## 📌 Features

- 🔁 Real-time GitHub webhook handling  
- 📦 Stores events in **MongoDB**  
- 💬 Displays events in a user-friendly dashboard  
- 🎯 Supports:
  - `push`
  - `pull_request`
  - `merge` events  
- 🌐 Clean UI with toggleable themes (light/dark)  
- 🌟 Animated background with stars and clouds for a visual touch  


## 🛠 Tech Stack

- **Backend**: Flask (Python)  
- **Database**: MongoDB Atlas  
- **Frontend**: HTML, CSS, JavaScript  



## 📤 How It Works

1. GitHub triggers a webhook event (e.g., push, pull request).
2. Flask receives and parses the webhook payload.
3. The event is stored in MongoDB.
4. The frontend fetches new events every 15 seconds and updates the UI.



## 🔧 Setup Instructions

### 🔙 Backend (Flask)

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/webhook-repo.git
   cd webhook-repo
2. **Create and activate virtual environment**
   python -m venv venv
  # On Windows:
  venv\Scripts\activate
  # On macOS/Linux:
  source venv/bin/activate
3.**Install dependencies**
  pip install -r requirements.txt
4. **Set MongoDB connection string in app.py**
  MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority"
5. **Run the app**
  Python app.py

  ## 🌐 Frontend

The frontend is located inside the `/frontend` folder.

- It fetches events from the `/events` endpoint.
- Includes filters (**All**, **Push**, **PR**, **Merge**) and a toggleable light/dark theme with animated background.



## 🚀 Deployment

### ✅ Backend (Render)

Deployed on **Render**  
URL: `https://webhook-repo-xxxx.onrender.com`  
_Replace `xxxx` with your actual subdomain._

### ✅ Frontend (Vercel or any static host)

To deploy frontend:

- Upload the `frontend/` folder.
- On **Vercel**, set the project root to `frontend`.

#### Optional: Add `vercel.json` inside `frontend/` folder:
```json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
```



## 📄 API Endpoints

| Endpoint   | Method | Description                      |
|------------|--------|----------------------------------|
| `/webhook` | POST   | Receives GitHub webhook payloads |
| `/events`  | GET    | Returns last 10 stored events    |
| `/`        | GET    | Serves the frontend dashboard    |



## 📸 Preview

_Replace this with an actual screenshot or recording of your app._



## ✨ Author

**Kolupoti Sai Prakash**  
[GitHub](https://github.com/saikolupoti)


   
