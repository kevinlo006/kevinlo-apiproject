import React, { useState } from 'react';

function fetchDataFromApi(pokemonName) {
  return new Promise((resolve, reject) => {
    if (!pokemonName.trim()) {
      reject('Please enter a Pokémon name');
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const fetchData = () => {
    setError(null);

    fetchDataFromApi(pokemonName)
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleClear = () => {
    setPokemonName('');
    setPokemonData(null);
    setError(null);
  };

  return (
    <div>
      <h1>PokeAPI React App</h1>
      <label>
        Enter Pokémon Name:
        <input type="text" value={pokemonName} onChange={handleInputChange} />
      </label>
      <button onClick={fetchData}>Fetch Pokémon Data</button>
      <button onClick={handleClear}>Clear</button>

      {error && <p>Error: {error}</p>}

      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height * 10} centimeters</p>
          <p>Weight: {pokemonData.weight / 10} kilograms</p>
          <h3>Abilities:</h3>
          <ul>
            {pokemonData.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
