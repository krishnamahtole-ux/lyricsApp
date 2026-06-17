import { useEffect, useState } from 'react';

export default function Home() {
  const [lyrics, setLyrics] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/lyrics')
      .then((r) => r.json())
      .then(setLyrics)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Lyrics — Public</h1>
      <p>
        Browse lyrics. To manage lyrics, open the <a href="/admin">admin panel</a>.
      </p>
      <div style={{ marginBottom: 16 }}>
        <input
          placeholder="Search by title, artist, or content"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: '100%', maxWidth: 600, boxSizing: 'border-box' }}
        />
      </div>

      <div>
        {lyrics.length === 0 && <div>No lyrics yet.</div>}

        {(() => {
          const q = query.trim().toLowerCase();
          const filtered = q
            ? lyrics.filter((l) => {
                return (
                  (l.title || '').toLowerCase().includes(q) ||
                  (l.artist || '').toLowerCase().includes(q) ||
                  (l.content || '').toLowerCase().includes(q)
                );
              })
            : lyrics;

          if (filtered.length === 0) return <div>No results.</div>;

          return filtered.map((l) => (
            <article key={l.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
              <h3>{l.title} {l.artist && <small>— {l.artist}</small>}</h3>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{l.content}</pre>
            </article>
          ));
        })()}
      </div>
    </div>
  );
}
