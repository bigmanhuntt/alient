import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
      setError('');
    } catch (error) {
      setError('Pokemon not found');
      setPokemonData(null);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Pokédex</h1>
      <div className="search-container">
        <input
          type="text"
          value={pokemonName}
          onChange={handleInputChange}
          placeholder="Enter Pokémon name"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {pokemonData && (
        <div className="pokemon-data">
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="pokemon-image" />
          <p className="pokemon-info">Height: {pokemonData.height}</p>
          <p className="pokemon-info">Weight: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default App;