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
     <div class="post-header" onclick="goToProfile('${post.user}')" style="cursor:pointer;">
  @${post.user}
</div>

      <div class="post-time">${new Date(post.createdAt).toLocaleString()}</div>
      <div>${post.content}</div>

      ${post.media ? `<img src="${post.media}" style="width:100%;border-radius:10px;margin-top:10px;">` : ""}

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
  });const API = "https://flamevip-backend.onrender.com";

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
     <div class="post-header" onclick="goToProfile('${post.user}')" style="cursor:pointer;">
  @${post.user}
</div>

      <div class="post-time">${new Date(post.createdAt).toLocaleString()}</div>
      <div>${post.content}</div>

      ${post.media ? `<img src="${post.media}" style="width:100%;border-radius:10px;margin-top:10px;">` : ""}

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
  function goToProfile(user) {
  window.location.href = `profile.html?user=${user}`;
}

window.onload = loadFeed;

}

window.onload = loadFeed;
