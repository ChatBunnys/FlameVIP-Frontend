const API = "https://flamevip-backend.onrender.com";

async function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    document.getElementById("error").innerText = data.error || "Registration failed";
    return;
  }

  // Auto-login after registration
  const loginRes = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const loginData = await loginRes.json();

  if (!loginRes.ok) {
    document.getElementById("error").innerText = loginData.error || "Login failed after registration";
    return;
  }

  // Save token
  localStorage.setItem("token", loginData.token);

  // Redirect to feed
  window.location.href = "feed.html";
}
