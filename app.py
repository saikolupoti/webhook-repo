from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection URI (ensure password is encoded)
MONGO_URI = "mongodb+srv://saikolupoti:123%40123Abc@cluster0.7lpbhvp.mongodb.net/?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true"
client = MongoClient(MONGO_URI)
db = client["github_events"]
collection = db["events"]

# ✅ GitHub Webhook Receiver
@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.get_json(silent=True)
    event_type = request.headers.get("X-GitHub-Event")

    if not data or not event_type:
        return jsonify({"status": "ignored", "reason": "no data or event type"}), 200

    entry = parse_github_event(event_type, data)
    if entry:
        print("✅ Webhook Event Received:", entry)
        collection.insert_one(entry)
        return jsonify({"status": "stored"}), 200

    return jsonify({"status": "ignored", "reason": "unsupported event"}), 200

# ✅ Fetch Stored Events
@app.route("/events", methods=["GET"])
def get_events():
    events = list(collection.find().sort("timestamp", -1).limit(10))
    for e in events:
        e["_id"] = str(e["_id"])  # Convert ObjectId to string for JSON
    print("📦 Events Fetched:", events)
    return jsonify(events)

# ✅ Serve Frontend HTML
@app.route("/")
def serve_index():
    return send_from_directory("frontend", "index.html")

# ✅ Serve Frontend JS
@app.route("/script.js")
def serve_script():
    return send_from_directory("frontend", "script.js")

# ✅ Event Parser
def parse_github_event(event_type, data):
    timestamp = datetime.utcnow()

    if event_type == "push":
        return {
            "author": data["pusher"]["name"],
            "action": "push",
            "from_branch": None,
            "to_branch": data["ref"].split("/")[-1],
            "timestamp": timestamp
        }

    elif event_type == "pull_request":
        action = data["action"]
        user = data["pull_request"]["user"]["login"]
        from_branch = data["pull_request"]["head"]["ref"]
        to_branch = data["pull_request"]["base"]["ref"]

        if action == "opened":
            return {
                "author": user,
                "action": "pull_request",
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": timestamp
            }

        elif action == "closed" and data["pull_request"].get("merged"):
            return {
                "author": user,
                "action": "merge",
                "from_branch": from_branch,
                "to_branch": to_branch,
                "timestamp": timestamp
            }

    return None

# ✅ Start the Flask Server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)