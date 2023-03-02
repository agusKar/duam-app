import homeSvg from '../assets/img/home.svg';
import { StateProp } from '../types/dataTypes';

interface Props {
  setState: (arg0: StateProp) => void;
}
const Footer = ({ setState }: Props) => {
  return (
    <footer
      className='bg-dark d-flex alignt-items-center justify-content-center py-2'
      onClick={() => setState('menu')}
    >
      <div className='home-logo'>
        <img
          alt="Duam - Logo"
          src={homeSvg}
          width="30"
          className="d-inline-block align-top"
        />
      </div>
    </footer>
  )
}

export default Footer