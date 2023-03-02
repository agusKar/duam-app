// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//Types
import { Modelo, StateProp } from '../types/dataTypes';
// Data

interface Props {
  modelos?: Modelo[];
  setModelo: (modelo: Modelo) => void;
  setState: (arg0: StateProp) => void;
}

const Modelos = ({ setState, modelos, setModelo }: Props) => {

  const selectModelo = (modelo: Modelo) => {
    setModelo(modelo);
    setState('form');
  };

  return (
    <>
      <h2 className='mb-4'>Seleccioná tu modelo</h2>
      <ListGroup>
        {
          modelos?.map((modelo, i) => (
            <div
              key={i}
              className='d-flex modelos align-items-center'
              onClick={() => selectModelo(modelo)}>
              <div>
                <img src={process.env.PUBLIC_URL + "/images/" + modelo.img} className='img-fluid' height="50" />
              </div>
              <div>
                {modelo.name}
              </div>
            </div>
          ))
        }
      </ListGroup>
    </>
  )
}

export default Modelos