import { useEffect, useState } from 'react';

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

export default function Admin() {
  const [lyrics, setLyrics] = useState([]);
  const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('token') : null));
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({ title: '', artist: '', content: '' });

  useEffect(() => {
    fetch('/api/lyrics')
      .then((r) => r.json())
      .then(setLyrics)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      const j = await res.json();
      setToken(j.token);
      setPassword('');
    } else {
      alert('login failed');
    }
  };

  const create = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/lyrics', { method: 'POST', headers: authHeaders(token), body: JSON.stringify(form) });
    if (res.ok) {
      const item = await res.json();
      setLyrics((s) => [item, ...s]);
      setForm({ title: '', artist: '', content: '' });
    } else {
      alert('create failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this lyric?')) return;
    const res = await fetch(`/api/lyrics/${id}`, { method: 'DELETE', headers: authHeaders(token) });
    if (res.ok) {
      setLyrics((s) => s.filter((x) => x.id !== id));
    } else {
      alert('delete failed');
    }
  };

  const startEdit = (item) => {
    setForm({ title: item.title, artist: item.artist, content: item.content, id: item.id });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!form.id) return create(e);
    const res = await fetch(`/api/lyrics/${form.id}`, { method: 'PUT', headers: authHeaders(token), body: JSON.stringify(form) });
    if (res.ok) {
      const updated = await res.json();
      setLyrics((s) => s.map((x) => (x.id === updated.id ? updated : x)));
      setForm({ title: '', artist: '', content: '' });
    } else {
      alert('update failed');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Admin Panel</h1>
      <section style={{ marginBottom: 20 }}>
        {!token ? (
          <form onSubmit={login}>
            <label>
              Admin password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <div style={{ marginBottom: 8 }}>Logged in. <button onClick={() => setToken(null)}>Logout</button></div>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>{form.id ? 'Edit' : 'Create'} lyric</h2>
        <form onSubmit={saveEdit}>
          <div>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <input placeholder="Artist" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} />
          </div>
          <div>
            <textarea placeholder="Content" rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div>
            <button type="submit">{form.id ? 'Save' : 'Create'}</button>
            {form.id && <button type="button" onClick={() => setForm({ title: '', artist: '', content: '' })}>Cancel</button>}
          </div>
        </form>
      </section>

      <section>
        <h2>Existing lyrics</h2>
        {lyrics.length === 0 && <div>No lyrics</div>}
        {lyrics.map((l) => (
          <div key={l.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
            <strong>{l.title}</strong> {l.artist && <em>— {l.artist}</em>}
            <div style={{ marginTop: 6 }}>
              <button onClick={() => startEdit(l)}>Edit</button>
              <button onClick={() => remove(l.id)} style={{ marginLeft: 8 }}>Delete</button>
            </div>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{l.content}</pre>
          </div>
        ))}
      </section>
    </div>
  );
}
