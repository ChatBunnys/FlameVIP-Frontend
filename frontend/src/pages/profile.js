const API = "https://flamevip-backend.onrender.com";

function getToken() {
  return localStorage.getItem("token");
}

function getQueryUser() {
  const params = new URLSearchParams(window.location.search);
  return params.get("user");
}

async function loadProfile() {
  const username = getQueryUser();
  const token = getToken();

  if (!username) {
    document.body.innerHTML = "<h2>No user specified.</h2>";
    return;
  }

  document.getElementById("usernameHeader").innerText = `@${username}`;

  const res = await fetch(`${API}/users/${username}`, {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  if (!res.ok) {
    document.body.innerHTML = "<h2>User not found.</h2>";
    return;
  }

  document.getElementById("profileUser").innerText = data.username;
  document.getElementById("profileBio").innerText = data.bio || "No bio yet.";

  renderPosts(data.posts);
}

function renderPosts(posts) {
  const container = document.getElementById("userPosts");
  container.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";

    div.innerHTML = `
      <div class="post-header">@${post.user}</div>
      <div class="post-time">${new Date(post.createdAt).toLocaleString()}</div>
      <div>${post.content}</div>
      ${post.media ? `<img src="${post.media}" style="width:100%;border-radius:10px;margin-top:10px;">` : ""}
    `;

    container.appendChild(div);
  });
}

window.onload = loadProfile;
