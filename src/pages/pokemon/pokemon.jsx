import styles from './pokemon.module.css'
import React, {useEffect, useState } from "react";
import { useParams, Link} from 'react-router-dom'
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const Pokemon = () => {
     const id = useParams().id;
     const [pokemons, setPokemons] = useState([]);
     
     useEffect(() => {
          getPokemons();
        }, []);

     const getPokemons = () => {
          var pokemons = [];
          for (var i = 1; i < 2; i++) {
               pokemons.push(`https://pokeapi.co/api/v2/pokemon-form/${id}/`);
             }
          axios.all(pokemons.map((pokemon) => axios.get(pokemon))).then((res) => setPokemons(res));
     }
     const pokemon = pokemons[0]
     return (
     <div>
          <header>
               <Link to={`/`}><FaArrowLeft/></Link>
          </header>
          <div className={styles.poke}>    
               {pokemon == null ? 
                    (<h1>Nenhum Pokemon encontrado</h1>)
                    :
                    (
                         <main>
                         <div className={styles.imagem}>
                         <img src={pokemon.data.sprites.front_default} alt="imagem do pokemon" />
                         </div>
                         <div className={styles.descricao}>
                         <h1>{pokemon.data.name}</h1>
                         {pokemon.data.types.length != 0 ? <div className= {`types ${styles.types}`} >{pokemon.data.types.map((tipo) => (<button id={tipo.type.name} >{tipo.type.name}</button>))} </div>: <h4>nenhum tipo disponivel</h4>}
                         </div>
                         </main>
                         )}
          </div>
     </div>
     )
     
}
export default Pokemon