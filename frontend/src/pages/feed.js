const API = "https://flamevip-backend.onrender.com";

function getToken() {
  return localStorage.getItem("token");
}

async function loadFeed(page = 1) {
  const token = getToken();

  const res = await fetch(`${API}/feed?page=${page}`, {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();
  renderFeed(data.data);
}

async function createPost() {
  const content = document.getElementById("newPost").value;
  const token = getToken();

  await fetch(`${API}/feed/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ content })
  });

  document.getElementById("newPost").value = "";
  loadFeed();
}

async function likePost(id) {
  const token = getToken();

  await fetch(`${API}/feed/${id}/like`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  });

  loadFeed();
}

async function commentOnPost(id) {
  const text = document.getElementById(`comment-${id}`).value;
  const token = getToken();

  await fetch(`${API}/feed/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ text })
  });

  loadFeed();
}

function renderFeed(posts) {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";

    div.innerHTML = `
      <div class="post-header">@${post.user}</div>
      <div class="post-time">${new Date(post.createdAt).toLocaleString()}</div>
      <div>${post.content}</div>

      <button class="like-btn" onclick="likePost(${post.id})">
        ❤️ ${post.likes}
      </button>

      <div class="comment-box">
        <input id="comment-${post.id}" placeholder="Write a comment...">
        <button class="like-btn" onclick="commentOnPost(${post.id})">Send</button>
      </div>

      ${post.comments.map(c => `
        <div class="comment">
          <strong>@${c.user}</strong>: ${c.text}
        </div>
      `).join("")}
    `;

    feed.appendChild(div);
  });
}

window.onload = loadFeed;
