// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//Types
import {Modelo} from '../types/dataTypes'

interface Props {
  modelos?: Modelo[];
  setModelo: (modelo: Modelo)=>void;
  setIsModelo: (arg0: boolean) => void;
}

const Modelos = ({modelos, setModelo, setIsModelo}:Props) => {
  
  const selectModelo = (modelo: Modelo) => {
    setModelo(modelo);
    setIsModelo(true);
  };

  return (    
    <ListGroup>
    {
      modelos?.map((modelo, i) => (
        <ListGroup.Item
          key={i}
          variant='primary'
          action
          onClick={() => selectModelo(modelo)} >
          {modelo.name}
        </ListGroup.Item>
      ))
    }
  </ListGroup>
  )
}

export default Modelos