import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import duamLogo from '../assets/img/duam-logo.svg';

import { StateProp } from '../types/dataTypes';

interface Props {
  setState: (arg0: StateProp) => void;
}

const NavBar = ({ setState }: Props) => {
  return (
    <Navbar bg="dark" variant="dark" className='w-100'>
      <Container
        className="justify-content-center cursor-pointer"
        onClick={() => setState('menu')}
      >
            <img
              alt="Duam - Logo"
              src={duamLogo}
              className="d-inline-block align-top"
            />
      </Container>
    </Navbar>
  )
}

export default NavBar