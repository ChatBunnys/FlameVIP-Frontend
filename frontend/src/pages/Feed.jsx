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
      <form onSubmit={handlePost}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>

      <div>
        {posts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ border: '1px solid #ff8df2', padding: '10px', margin: '10px 0', borderRadius: '8px' }}>
              <strong>@{post.user}</strong> - {new Date(post.createdAt).toLocaleString()}
              <p>{post.content}</p>
              {post.media && <img src={post.media} style={{ maxWidth: '100%', borderRadius: '8px' }} />}
              <p>❤️ {post.likes || 0} likes</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
