export default function CharacterForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());

    console.log(formData);

    const res = await fetch('/api/character', {
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input name="name" type="text" className="form-control" />

      <label htmlFor="player" className="form-label">
        Player
      </label>
      <input name="player" type="text" className="form-control" />

      <label htmlFor="character_type" className="form-label">
        Character Type
      </label>
      <input name="character_type" type="text" className="form-control" />

      <label htmlFor="description" className="form-label">
        Description
      </label>
      <textarea name="description" type="text" className="form-control" />

      <button className="btn btn-primary" type="submit">
        Create Character
      </button>
    </form>
  );
}
