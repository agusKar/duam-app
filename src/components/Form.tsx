// Types
import { Modelo, Semillas, StateProp } from "../types/dataTypes"
// Bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  modelo: Modelo;
  semillas: Semillas;
  setState: (arg0: StateProp) => void;
}
const Form = ({ setState, modelo, semillas }: Props) => {
  return (
    <div>
      <h1>{modelo.name}</h1>
      
      <ListGroup>
        {
          semillas?.map((semilla, i) => (
            <ListGroup.Item
              key={i}
              variant='warning'>
              {semilla}
            </ListGroup.Item>
          ))
        }
      </ListGroup>

      <Button variant="warning" onClick={()=>setState('resultado')} >Completar formulario</Button>
      <Button variant="danger" onClick={()=>setState('menu')}>Volver</Button>
    </div>
  )
}

export default Form