console.log("✅ script.js is loaded and running");

function formatToIST(utcDateString) {
  const date = new Date(utcDateString);

  // Convert to IST (UTC+5:30)
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  return date.toLocaleString('en-IN', options);
}

async function fetchEvents() {
  try {
    const res = await fetch("/events");
    console.log("📡 /events response status:", res.status);
    const events = await res.json();
    console.log("📦 Events received:", events);

    const ul = document.getElementById("events");
    ul.innerHTML = "";

    events.forEach(e => {
      const li = document.createElement("li");
      const istTime = formatToIST(e.timestamp);

      let message = "";

      if (e.action === "push") {
        message = `${e.author} pushed to ${e.to_branch} on ${istTime} (IST)`;
      } else if (e.action === "pull_request") {
        message = `${e.author} submitted a pull request from ${e.from_branch} to ${e.to_branch} on ${istTime} (IST)`;
      } else if (e.action === "merge") {
        message = `${e.author} merged branch ${e.from_branch} to ${e.to_branch} on ${istTime} (IST)`;
      }

      li.textContent = message;
      ul.appendChild(li);
    });
  } catch (err) {
    console.error("❌ Failed to fetch events:", err);
  }
}

fetchEvents();
setInterval(fetchEvents, 15000);
