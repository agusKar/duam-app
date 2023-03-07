import { useState } from 'react';
// Components
import FormModel from './FormModel';
import Layout from './Layout';
import Menu from './Menu';
import Modelos from './Modelos';
// Types
import { Modelo, Semillas, StateProp } from '../types/dataTypes';
// Data
import data from '../data/data.json';
import Reportes from './Reportes';
import TablaManules from './TablaManules';

const App = () => {
  const [modelos, setModelos] = useState<Modelo[]>(data.modelos)
  const [semillas, setSemillas] = useState<Semillas>(data.semillas)
  const [modelo, setModelo] = useState<Modelo>({})

  // Setea que componente renderizar
  const [state, setState] = useState<StateProp>("menu")

  const ENUM_STATES = {
    menu: <Menu setState={setState} />,
    modelos: <Modelos modelos={modelos} setModelo={setModelo} setState={setState} />,
    form: <FormModel modelo={modelo} semillas={semillas} setState={setState} />,
    reportes: <Reportes />,
    tablaManuales: <TablaManules modelos={modelos} />,
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