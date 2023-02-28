import { useState } from 'react';
// Components
import Form from './Form';
import Layout from './Layout';
import Menu from './Menu';
import Modelos from './Modelos';
import Resultado from './Resultado';
// Types
import { Modelo, Semillas, StateProp } from '../types/dataTypes';
// Data
import data from '../data/data.json';

const App = () => {
  const [modelos, setModelos] = useState<Modelo[]>(data.modelos)
  const [semillas, setSemillas] = useState<Semillas>(data.semillas)
  const [modelo, setModelo] = useState<Modelo>({})

  // Setea que componente renderizar
  const [state, setState] = useState<StateProp>("menu")

  const ENUM_STATES = {
    menu: <Menu setState={setState} />,
    modelos: <Modelos modelos={modelos} setModelo={setModelo} setState={setState} />,
    form: <Form modelo={modelo} semillas={semillas} setState={setState} />,
    resultado: <Resultado />
  };

  return (
    <Layout setState={setState}>
      <>
        {ENUM_STATES[state]}
      </>
    </Layout>
  )

}

export default App