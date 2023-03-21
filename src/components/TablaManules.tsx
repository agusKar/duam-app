import { Modelo } from "../types/dataTypes"
import pdf from '../assets/img/pdf.svg'
import { Row, Col } from "react-bootstrap"

interface Props {
  modelos: Modelo[]
}

const TablaManules = ({ modelos }: Props) => {
  return (
    <>
      <h3 className="custom-title">Descargá el manual de usuario de cada modelo</h3>
      <Row id='tablaManuales'>
        {
          modelos.map((modelo, index) => {
            if (modelo.pdf && modelo.pdf !== '') {
              return (
                <Col xs={12} md={4} key={index}>
                  <div className="shadow-sm my-2 d-flex flex-column p-4 bg-white text-center">
                    <img src={pdf} alt="Duam" className="img-fluid mb-3" />
                    <a href={modelo.pdf} target="_blank">
                      {modelo.name}
                    </a>
                  </div>
                </Col>
              )
            }
          }

          )
        }
      </Row>
    </>
  )
}

export default TablaManules