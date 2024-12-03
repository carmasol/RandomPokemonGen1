import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


  type pokemon = {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
  };

  const PokemonComponent: React.FC = () => {
    const [pokemon, setPokemon] = useState<pokemon | null>(null);

    const changePokemon = async () => {
      let randomNumber = Math.floor(Math.random() * 151) + 1;
      let requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;

      try {
        let { data } = await axios.get<pokemon>(requestString);
        setPokemon(data);
      } catch (error) { 
        console.error("Error fetching the Pokémon data:", error);
    }
  };

    useEffect(() => {
      changePokemon();
    }, []);

  return (
    <>
      <div id='cadre'>
        {pokemon && (
          <div>
            <img id="image" src={pokemon.sprites.front_default} alt={pokemon.name} />
            <div id="number">#{pokemon.id}</div>
            <div id="name">{pokemon.name}</div>
            <button onClick={changePokemon}>Change de Pokemon</button>
          </div>
        )}
      </div>
      
    </>
  );
};


export default PokemonComponent;
