import { Modelo } from "../types/dataTypes"
import pdf from '../assets/img/pdf.svg'

interface Props{
  modelos: Modelo[]
}

const TablaManules = ({modelos}:Props) => {
  return (
    <>
    <h3 className="custom-title">Descarga el manual de usuario de cada modelo</h3>
    <div id='tablaManuales' className='d-inline-flex flex-wrap w-100'>
      {
        modelos.map((modelo, index)=>(
          <div key={index} className='shadow-sm'>
            <img src={pdf} alt="Duam" className="img-fluid mb-3" />
            {/* Aqui iria el PDF de cada maquina */}
            <a href={process.env.PUBLIC_URL + "/images/" + modelo.img} download>
              {modelo.name}
            </a>
          </div>
        ))
      }
    </div>
      </>
  )
}

export default TablaManules