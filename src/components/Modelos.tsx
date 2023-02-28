// Bootstrap
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
//Types
import { Modelo, StateProp } from '../types/dataTypes'
// Data
import duamLogo from '../assets/img/duam-logo.svg';

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
    <ListGroup>
      {
        modelos?.map((modelo, i) => (
          <Row
          className='modelos'
          onClick={() => selectModelo(modelo)}>
            <Col>
                <img src={duamLogo} className='img-fluid' height="50" />
            </Col>
            <Col>
                {modelo.name}
            </Col>
        </Row>
        ))
      }
    </ListGroup>
  )
}

export default Modelos