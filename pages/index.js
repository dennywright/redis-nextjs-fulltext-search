import CharacterForm from '../lib/CharacterForm';
import SearchForm from '../lib/SearchForm';

export default function Home(props) {
  return (
    <main>
      <h1>Create a Character</h1>
      <CharacterForm />
      <hr />
      <h1>Find a Character</h1>
      <SearchForm />
    </main>
  );
}
