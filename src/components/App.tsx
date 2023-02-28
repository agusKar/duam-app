import { useEffect, useState } from 'react'
// Components
import Layout from './Layout';
// Types
import { Modelo, Semillas } from '../types/dataTypes'
// Data
import data from '../data/data.json'
import Modelos from './Modelos';
import Form from './Form';
import Resultado from './Resultado';

const App = () => {
  const [modelos, setModelos] = useState<Modelo[]>(data.modelos)
  const [semillas, setSemillas] = useState<Semillas>(data.semillas)
  const [modelo, setModelo] = useState<Modelo>({})
  const [isModelo, setIsModelo] = useState<boolean>(false)
  const [isResultado, setIsResultado] = useState<boolean>(false)

  return (
    <Layout>
      <>
        {
          !isResultado ?
            (
              isModelo ?
                (
                  <Form modelo={modelo} semillas={semillas} setIsModelo={setIsModelo} setIsResultado={setIsResultado} />
                )
                :
                (
                  <Modelos modelos={modelos} setIsModelo={setIsModelo} setModelo={setModelo} />
                )
            )
            :
            (<Resultado />)
        }
      </>
    </Layout>
  )
}

export default App
