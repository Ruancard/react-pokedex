import styles from './card.module.css'
import { Link } from 'react-router-dom';

const card = (props) => {
  return (
    <Link to={`pokemon/${props.numero}`} className={styles.card}>
          <div className={styles.imagem}>
               <img src={props.img} alt="pikachu" />
          </div>
          <div className={styles.descricao}>
               <h1>{props.nome}</h1>
                {props.tipos.length != 0 ? <div className= {`types ${styles.types}`} >{props.tipos.map((tipo) => (<button id={tipo.type.name}>{tipo.type.name}</button>))} </div>: <h4>nenhum tipo disponivel</h4>}
          </div>
    </Link>
  )
}

export default card