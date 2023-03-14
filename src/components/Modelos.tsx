// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
//Types
import { Modelo, StateProp } from '../types/dataTypes';
// Images
import label from '../assets/img/label.svg';

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
      <h3 className="custom-title">Seleccioná tu modelo</h3>
      <ListGroup>
        {
          modelos?.map((modelo, i) => (
            <div
              key={i}
              className='d-flex modelos shadow-sm gap-2 align-items-center cursor-pointer'
              onClick={() => selectModelo(modelo)}>
              <div>
                <img src={process.env.PUBLIC_URL + "/images/" + modelo.img} className='img-fluid' height="50" alt={modelo.name} />
              </div>
              <div className='titulo'>
                {modelo.name}
                <span><img src={label} alt="Label - Duam" />{modelo.tipo}</span>
              </div>
            </div>
          ))
        }
      </ListGroup>
    </>
  )
}

export default Modelos