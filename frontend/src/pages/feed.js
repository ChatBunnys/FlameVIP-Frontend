const API = "https://flamevip-backend.onrender.com";

function getToken() {
  return localStorage.getItem("token");
}

// Load feed from backend
async function loadFeed(page = 1) {
  const token = getToken();

  const res = await fetch(`${API}/feed?page=${page}`, {
    headers: { "Authorization": "Bearer " + token }
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Feed load error:", data);
    return;
  }

  renderFeed(data.data);
}

// Create a new post (supports media upload)
async function createPost() {
  const content = document.getElementById("newPost").value;
  const file = document.getElementById("mediaUpload")?.files[0];
  const token = getToken();

  let mediaUrl = null;

  // Upload media if selected
  if (file) {
    const form = new FormData();
    form.append("file", file);

    const uploadRes = await fetch(`${API}/upload`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token },
      body: form
    });

    const uploadData = await uploadRes.json();
    mediaUrl = uploadData.url;
  }

  // Create post with media
  await fetch(`${API}/feed/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ content, media: mediaUrl })
  });

  document.getElementById("newPost").value = "";
  if (document.getElementById("mediaUpload")) {
    document.getElementById("mediaUpload").value = "";
  }

  loadFeed();
}

// Like a post
async function likePost(id) {
  const token = getToken();

  await fetch(`${API}/feed/${id}/like`, {
    method: "POST",
    headers: { "Authorization": "Bearer " + token }
  });

  loadFeed();
}

// Comment on a post
async function commentOnPost(id) {
  const text = document.getElementById(`comment-${id}`).value;
  const token = getToken();

  if (!text.trim()) return;

  await fetch(`${API}/feed/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ text })
  });

  document.getElementById(`comment-${id}`).value = "";
  loadFeed();
}

// Render posts into the feed
function renderFeed(posts) {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post-card";

    div.innerHTML = `
      <div style="display: flex; justify-content: space-between;">
        <span onclick="goToProfile('${post.user}')" style="cursor: pointer; color: #ff8df2;">@${post.user}</span>
        <span>${new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <div style="margin: 10px 0;">${post.content}</div>
      ${post.media ? `<img src="${post.media}" style="max-width: 100%; border-radius: 8px;">` : ""}
      <div style="margin: 10px 0;">
        <button onclick="likePost('${post._id}')">❤️ ${post.likes}</button>
      </div>
      <div style="margin: 10px 0; display: flex;">
        <input id="comment-${post._id}" placeholder="Comment..." style="flex: 1;">
        <button onclick="commentOnPost('${post._id}')">Send</button>
      </div>
      <div style="margin-top: 10px; padding: 10px; background: #2a2a2d; border-radius: 4px;">
        ${post.comments.map(c => `
          <div><strong>@${c.user}</strong>: ${c.text}</div>
        `).join("")}
      </div>
    `;

    feed.appendChild(div);
  });
}

function goToProfile(user) {
  window.location.href = `profile.html?user=${user}`;
}

window.onload = loadFeed;
