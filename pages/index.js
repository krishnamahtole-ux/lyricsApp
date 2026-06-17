import { useEffect, useState } from 'react';

export default function Home() {
  const [lyrics, setLyrics] = useState([]);

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
      <div>
        {lyrics.length === 0 && <div>No lyrics yet.</div>}
        {lyrics.map((l) => (
          <article key={l.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
            <h3>{l.title} {l.artist && <small>— {l.artist}</small>}</h3>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{l.content}</pre>
          </article>
        ))}
      </div>
    </div>
  );
}
