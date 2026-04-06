const API = "https://flamevip-backend.onrender.com";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

const username = document.getElementById("username").value; // ✅ CORRECT
body: JSON.stringify({ username, password })               // ✅ Sends 'username'

  localStorage.setItem("token", data.token);
  window.location.href = "feed.html";
}
