import styles from './home.module.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from '../../components/card/card'

const Home = (setPokemonData) => {
  
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 152; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon-form/${i}/`);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  return (
    <div>
      <header>
        <input type="search" name="search" id="search" />
        <div className={styles.types}>
          <button id="normal">Normal</button>
          <button id="fighting">Lutador</button>
          <button id="flying">Voador</button>
          <button id="poison">Venenoso</button>
          <button id="ground">Terrestre</button>
          <button id="rock">Pedra</button>
          <button id="bug">Inseto</button>
          <button id="ghost">Fantasma</button>
          <button id="steel">Aço</button>
          <button id="fire">Fogo</button>
          <button id="water">Água</button>
          <button id="grass">Planta</button>
          <button id="electric">Elétrico</button>
          <button id="psychic">Psíquico</button>
          <button id="ice">Gelo</button>
          <button id="dragon">Dragão</button>
          <button id="fairy">Fada</button>
          <button id="dark">Noturno</button>
        </div>
      </header>
      <main>
      {pokemons.length == 0 ? (<h1>Carregando</h1>)
      :
      (
        pokemons.map((pokemon) => (
          <Card img={pokemon.data.sprites.front_default} nome={pokemon.data.name} tipos={pokemon.data.types} numero={pokemon.data.id}/>
        )
        ))}
      </main>
    </div>
  )
}

export default Home