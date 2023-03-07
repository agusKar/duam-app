// Img
import tool from '../assets/img/tool.svg'
import report from '../assets/img/report.svg'
import manual from '../assets/img/manual.svg'
import wpp from '../assets/img/wpp.svg'

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
      <Button className='shadow-sm' onClick={() => setState('reportes')}>
        <img src={report} height="60" alt="Duam" />
        Reportes
      </Button>
      <Button className='shadow-sm' onClick={() => setState('tablaManuales')}>
        <img src={manual} height="60" alt="Duam" />
        Tabla y manuales
      </Button>
      <Button className='shadow-sm' target='_blank' href="https://api.whatsapp.com/send?phone=5492235061204">
        <img src={wpp} height="60" alt="Duam" />
        Contáctenos
      </Button>
    </div>
  )
}

export default Menu