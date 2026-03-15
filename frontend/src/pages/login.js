const API = "https://flamevip-backend.onrender.com";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("error").innerText = data.error || "Login failed";
    return;
  }

  localStorage.setItem("token", data.token);

  window.location.href = "feed.html";
}
