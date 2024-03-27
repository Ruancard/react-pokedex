import styles from './home.module.css'
import axios from "axios";
import React, {useEffect, useState } from "react";
import Card from '../../components/card/card'


 const Home = (setPokemonData) => {
  var types = [];
  
  const [pokemons, setPokemons] = useState([]);
  const [tipos, setTipos] = useState([]);

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

  function arrayCompare(first, last)
{
    var result = first.filter(function(item){ return last.indexOf(item) > -1});   
    return result.length;  
}   

const pokemonFilterbytype = (type) => {
    var types = [];
    tipos.map((t) =>(types.push(t)))
    console.log(types)
      if (tipos.includes(type)){
        delete types[tipos.indexOf(type)]
        types = types.filter(function (i) {
          return i;
        });
        setTipos(types);
      }
      else{
        types.push(type)
        setTipos(types);
      }
    var filteredPokemonsbytype = [];
    if (types.length == 0 || types[0] == null) {
      getPokemons();
    }
    pokemons.map((pokemon) => {
      var ti = []
      pokemon.data.types.map((tipo) => {
        ti.push(tipo.type.name)
      });
      if(arrayCompare(types, ti) === types.length || types[arrayCompare(types, ti)] == null){
        if(!filteredPokemonsbytype.includes(pokemon))
          {filteredPokemonsbytype.push(pokemon)}        
      }
    });
    setPokemons(filteredPokemonsbytype);
  };

  return (
    <div>
      <header>
        <input type="search" name="search" id="search" onChange={(e) => pokemonFilter(e.target.value)} placeholder="Search" />
        <div className={styles.types}>
          <button id="normal" onClick={(e) =>  {pokemonFilterbytype("normal")}} >Normal</button>
          <button id="fighting" onClick={(e) => pokemonFilterbytype("fighting")} >Fighting</button>
          <button id="flying" onClick={(e) => pokemonFilterbytype("flying")} >Flying</button>
          <button id="poison" onClick={(e) => pokemonFilterbytype("poison")} >Poison</button>
          <button id="ground" onClick={(e) => pokemonFilterbytype("ground")} >Ground</button>
          <button id="rock" onClick={(e) => pokemonFilterbytype("rock")} >Rock</button>
          <button id="bug" onClick={(e) => pokemonFilterbytype("bug")} >Bug</button>
          <button id="ghost" onClick={(e) => pokemonFilterbytype("ghost")} >Ghost</button>
          <button id="steel" onClick={(e) => pokemonFilterbytype("stell")} >Steel</button>
          <button id="fire" onClick={(e) => pokemonFilterbytype("fire")} >Fire</button>
          <button id="water" onClick={(e) => pokemonFilterbytype("water")} >Water</button>
          <button id="grass" onClick={(e) => pokemonFilterbytype("grass")} >Grass</button>
          <button id="electric" onClick={(e) => pokemonFilterbytype("eletric")} >Electric</button>
          <button id="psychic" onClick={(e) => pokemonFilterbytype("psychic")} >Psychic</button>
          <button id="ice" onClick={(e) => pokemonFilterbytype("ice")} >Ice</button>
          <button id="dragon" onClick={(e) => pokemonFilterbytype("dragon")} >Dragon</button>
          <button id="fairy" onClick={(e) => pokemonFilterbytype("fairy")} >Fairy</button>
          <button id="dark" onClick={(e) => pokemonFilterbytype("dark")} >Dark</button>
        </div>
      </header>
      <main>
      {pokemons.length == 0 ? (<h1>Nenhum Pokemon encontrado</h1>)
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