const BACKEND_URL = "https://webhook-repo-i33a.onrender.com";

function formatToIST(utcDateString) {
  const date = new Date(utcDateString);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

async function fetchEvents() {
  try {
    const res = await fetch(`${BACKEND_URL}/events`);
    const events = await res.json();

    const ul = document.getElementById("events");
    ul.innerHTML = "";

    if (events.length === 0) {
      ul.innerHTML = `<li style="opacity: 0.6;">No webhook events found.</li>`;
      return;
    }

    events.forEach(e => {
      const li = document.createElement("li");
      const istTime = formatToIST(e.timestamp);

      let message = "";
      if (e.action === "push") {
        message = `🚀 ${e.author} pushed to <b>${e.to_branch}</b>`;
      } else if (e.action === "pull_request") {
        message = `🔀 ${e.author} opened PR: <b>${e.from_branch}</b> → <b>${e.to_branch}</b>`;
      } else if (e.action === "merge") {
        message = `✅ ${e.author} merged <b>${e.from_branch}</b> → <b>${e.to_branch}</b>`;
      }

      li.innerHTML = `
        <div>${message}</div>
        <div class="timestamp">🕒 ${istTime} (IST)</div>
      `;

      ul.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }
}

fetchEvents();
setInterval(fetchEvents, 15000);
