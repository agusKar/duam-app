import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { StateProp } from '../types/dataTypes';

interface Props {
  setState: (arg0: StateProp) => void;
}

const Menu = ({setState}:Props) => {
  const [isOpen, setIsOpen] = useState(true)
  return (    
    <div className="d-grid gap-2" >
      <Button variant='outline-primary' className='py-3 btn-radius' color="white" size="lg" onClick={() => setState('modelos')}>
        Seleccionar Máquina
      </Button>
      <Button variant="primary" className='py-3 btn-radius text-white' size="lg">
        Reportes
      </Button>
      <Button variant="primary" className='py-3 btn-radius text-white' size="lg">
        Tabla y manuales
      </Button>
      <Button variant="primary" className='py-3 btn-radius text-white' size="lg">
        Contáctenos
      </Button>
    </div>
  )
}

export default Menu