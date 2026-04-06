import { useState, useEffect } from 'react';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const API = 'https://flamevip-backend.onrender.com';

  const loadFeed = async () => {
    try {
      const res = await fetch(`${API}/feed`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data.data || []);
      }
    } catch (err) {
      console.error('Feed load error:', err);
    }
    setLoading(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/feed/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ content: newPost })
      });

      if (res.ok) {
        setNewPost('');
        loadFeed();
      }
    } catch (err) {
      console.error('Post error:', err);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  if (loading) return <h2>Loading feed...</h2>;

  return (
    <div>
      <h1>🔥 Flame VIP Feed</h1>
      
      <form onSubmit={handlePost} style={{ marginBottom: '20px' }}>
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <div id="feed">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="post-card" style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1d', borderRadius: '8px' }}>
              <div><strong>@{post.user}</strong> - {new Date(post.createdAt).toLocaleString()}</div>
              <div style={{ margin: '10px 0' }}>{post.content}</div>
              {post.media && <img src={post.media} style={{ maxWidth: '100%', borderRadius: '8px' }} />}
              <div>❤️ {post.likes || 0} likes</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default function Feed(){
  return (
    <div>
      <h1>🔥 Flame VIP Feed</h1>
      <p>Creator posts will appear here.</p>
    </div>
  );
}
