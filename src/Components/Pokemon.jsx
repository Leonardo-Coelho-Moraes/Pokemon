import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import pokebola from '../imgs/poke_ball_icon_155925.svg';

function Pokemon() {
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const { isLoading, error, data: pokemons } = useQuery('pokemons', async () => {
    // Montando as URLs para buscar os dados dos pokemons
    const endpoints = [];
    for (let i = 1; i < 101; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    // Fazendo as requisições em paralelo usando o axios.all do React Query
    const response = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
    // Retornando somente os dados dos pokemons em um array
    return response.map((res) => res.data);
  });

  const memoizedPokemons = useMemo(() => pokemons, [pokemons]);

  const handleMouseEnter = (pokemon) => {
    setCurrentPokemon(pokemon);
  };

  const handleMouseLeave = () => {
    setCurrentPokemon(null);
  };

  if (isLoading) return <p>Carregando...</p>; // Renderizando uma mensagem de "Carregando" enquanto os dados são buscados
  if (error) return <p>Erro ao buscar os pokemons: {error.message}</p>; // Renderizando uma mensagem de erro caso ocorra algum problema

  return (
    <>
      <div className="corpo">
        <div className="pokemons">
          {memoizedPokemons.map((pokemon) => {
            const color = pokemon.types[0].type.name;

            return (
              <div
                className={`pokemon ${color}`}
                key={pokemon.id}
                onMouseEnter={() => handleMouseEnter(pokemon)}
                onMouseLeave={() => handleMouseLeave()}
              >
                <h3 className="pokeid">#{pokemon.id.toString().padStart(3, '0')}</h3>
                <div className="bola"></div>
                <img src={pokebola} alt="pokebola" className="pokebola" />
                <img
                  src={currentPokemon && currentPokemon.id === pokemon.id ? pokemon.sprites.versions['generation-v']['black-white'].animated.front_default : pokemon.sprites.front_default}
                  alt={`Pokemon ${pokemon.name}`}
                  className="img"
                />
                <p>{color}</p>
                <h2>{pokemon.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Pokemon;
