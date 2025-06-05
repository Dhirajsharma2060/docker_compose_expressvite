import { useEffect, useState } from 'react'
import './App.css'

// Use relative URL for production, absolute for development
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/posts'  // Will be proxied by nginx to backend
  : 'http://localhost:3000/api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', content: '', media: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    try {
      setLoading(true)
      const res = await fetch(API_URL)
      const data = await res.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const mediaArr = form.media.split(',').map(url => url.trim()).filter(Boolean)
    const payload = { ...form, media: mediaArr }
    let res
    if (editingId) {
      res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    const result = await res.json()
    setMessage(result.message)
    setForm({ title: '', content: '', media: '' })
    setEditingId(null)
    fetchPosts()
    setTimeout(() => setMessage(''), 2000)
  }

  function handleEdit(post) {
    setForm({
      title: post.title,
      content: post.content,
      media: post.media.join(', '),
    })
    setEditingId(post.id)
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this post?')) return
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  async function handleDeleteAll() {
    if (!window.confirm('Delete ALL posts?')) return
    await fetch(API_URL, { method: 'DELETE' })
    fetchPosts()
  }

  return (
    <div id="root">
      <h1>📋 Post Dashboard</h1>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          required
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          required
          onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Media URLs (comma separated)"
          value={form.media}
          onChange={e => setForm(f => ({ ...f, media: e.target.value }))}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'} Post</button>
        {editingId && (
          <button type="button" onClick={() => { setForm({ title: '', content: '', media: '' }); setEditingId(null) }}>
            Cancel
          </button>
        )}
      </form>
      {message && <div className="message">{message}</div>}
      <div className="dashboard-actions">
        <button onClick={handleDeleteAll} disabled={posts.length === 0}>Delete All Posts</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.media && post.media.length > 0 && (
                <div className="media-list">
                  {post.media.map((url, i) => (
                    <img key={i} src={url} alt="media" className="media-img" />
                  ))}
                </div>
              )}
              <div className="post-actions">
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
              <div className="created-at">
                {post.createdAt && <small>{new Date(post.createdAt).toLocaleString()}</small>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
