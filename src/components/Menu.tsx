// Img
import tool from '../assets/img/tool.svg'
import report from '../assets/img/report.svg'

// Bootstrap
import Button from 'react-bootstrap/Button';

// Data
import { StateProp } from '../types/dataTypes';

interface Props {
  setState: (arg0: StateProp) => void;
}

const Menu = ({ setState }: Props) => {
  return (
    <div id="menu" className='d-inline-flex flex-wrap w-100'>
      <Button className='shadow-sm' onClick={() => setState('modelos')}>
        <img src={tool} height="60" alt="Duam" />
        Seleccionar <br /> Máquina
      </Button>
      <Button className='shadow-sm'>
        <img src={report} height="60" alt="Duam" />
        Reportes
      </Button>
      <Button className='shadow-sm'>
        Tabla y manuales
      </Button>
      <Button className='shadow-sm'>
        Contáctenos
      </Button>
    </div>
  )
}

export default Menu