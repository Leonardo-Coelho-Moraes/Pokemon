import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import pokebola from '../imgs/poke_ball_icon_155925.svg'

function Pokemon() {
  const colors ={
    fire: '#f87171',
	grass: '#4ade80',
	electric: '#fbbf24',
	water: '#60a5fa',
	ground: '#f4e7da',
	rock: '#a8a29e',
	fairy: '#fceaff',
	poison: '#4ade80',
	bug: '#fdba74',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#38bdf8',
	fighting: '#a8a29e',
	normal: '#38bdf8'
  };
  const [pokemons, setPokemons] = useState([]);
    useEffect(() =>
    {
      getPokemons();
    },[] );
    
  const getPokemons = () =>{
    let endpoints = []
    for(let i = 1;i <100 ; i++){
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    let response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res))
    .catch(error =>  console.log(error))
  }
  const divs = document.getElementsByClassName("pokemon");
  for (let i = 0; i < divs.length; i++) { // percorre todos os elementos "div" com a classe "myDiv"
    const div = divs[i];
    const p = div.getElementsByTagName("p")[0]; // seleciona o primeiro elemento "p" dentro da "div"
    const color = p.innerHTML.trim(); // obtém o valor dentro do "p" e remove espaços em branco desnecessários
  
    if (color in colors) { // verifica se o valor está dentro da constante "colors"
      div.style.backgroundColor = colors[color]; // define a cor de fundo da "div" para corresponder ao valor correspondente na constante "colors"
    }
  
    
  }  
  
  return (
    <>
    <header >
      <h1>Pokémons</h1>
    </header>
    <div className='corpo'>
      <div className='pokemons'>
      {pokemons.map((pokemon) =>  {
            return (
              <div className='pokemon'  key={pokemon.data.id} >
              <h3 className='pokeid'>#0{pokemon.data.id}</h3>
              <div className='bola'></div>
              <img src={pokebola} alt="pokebola" className='pokebola'/>
              <img src={pokemon.data.sprites.front_default} alt={`Pokemon ${pokemon.data.name}`} className='img'/>
            
              <p>{pokemon.data.types[0].type.name}</p>
             
              <h2>{pokemon.data.name}</h2>
            </div>
            );
          })}
       
      </div>
    </div>
    </>
  )


}

export default Pokemon;