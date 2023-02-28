// Types
import { Modelo, Semillas } from "../types/dataTypes"
// Bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
  modelo: Modelo;
  semillas: Semillas;
  setIsResultado: (arg0: boolean) => void;
  setIsModelo: (arg0: boolean) => void;
}
const Form = ({modelo, semillas, setIsModelo, setIsResultado}:Props) => {
  return (
    <div>
      {modelo.name}

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

      <Button variant="warning" onClick={()=>setIsResultado(true)}>Completar formulario</Button>
      <Button variant="danger" onClick={()=>setIsModelo(false)}>Volver</Button>
    </div>
  )
}

export default Form