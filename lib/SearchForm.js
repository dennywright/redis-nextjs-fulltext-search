import { useState } from 'react';

export default function CharacterForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result);
      setHits(result['characters']);
    }
  };

  return (
    <div>
      <input
        onChange={search}
        type="text"
        placeholder="search characters..."
        className="form-control"
      />

      <ul className="list-group">
        {
          hits.map((hit) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start"
              key={hit.entityId}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  {hit.name} {hit.player} {hit.character_type}
                </div>
                {hit.description}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
