import { useState } from "react";
// Types
import { Modelo, Semillas, StateProp, ResultadoEcuacion, FormModelData } from "../types/dataTypes";
// Bootstrap
import { Alert, Form, Button } from 'react-bootstrap';
// Helpers
import calculadora from '../helpers';
import ModalCustom from "./ModalCustom";

interface Props {
  modelo: Modelo;
  semillas: Semillas;
  setState: (arg0: StateProp) => void;
}

const initialValues: FormModelData = {
  semilla: "",
  ancho: 0,
  velocidad: 0,
  tasa: 0,
  valorObtenidoTest: 0
};

const FormModel = ({ setState, modelo, semillas }: Props) => {
  const [formData, setFormData] = useState<FormModelData>(initialValues)
  const [resultado, setResultado] = useState<ResultadoEcuacion>()
  const [modalShow, setModalShow] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valNum = name === "semilla" ? value : parseFloat(value);

    setFormData({
      ...formData,
      [name]: valNum,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setResultado(calculadora(formData))
  }

  return (
    <div className="mb-4">
      <div className="position-relative">
        <h3 className='custom-title'>{modelo.name}</h3>
        <img
          src={process.env.PUBLIC_URL + "/images/" + modelo.img}
          alt="Duam"
          className="position-absolute"
          style={{ "width": "260px", "right": "-90px", "bottom": "-90px" }}
        />
      </div>

      <Form
        onSubmit={e => handleSubmit(e)}
      >

        <Form.Group className="mb-4">
          <Form.Label>Material a aplicar</Form.Label>
          <Form.Control
            as="select"
            name="semilla"
            aria-label="Default select example"
            onChange={handleInputChange}
          >
            <option>Seleccionar semilla</option>
            {
              semillas?.map((semilla, i) => (
                <option key={i}>
                  {semilla}
                </option>
              ))
            }
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Ancho de trabajo (mts)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.ancho || ''} name="ancho" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Velocidad (km/h)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.velocidad || ''} name="velocidad" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tasa de aplicación (kg/ha)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.tasa || ''} name="tasa" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Valor obtenido test (kg/min)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.valorObtenidoTest || ''} name="valorObtenidoTest" type="number" lang="es" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
        </Form.Group>

        {
          resultado && <Alert variant="success" className="text-center">Resultado: <br /> <b>{`${resultado.title}`} {resultado.numero > 0 && resultado.numero}</b></Alert>
        }

        <div className="d-flex flex-column gap-4 mt-5">
          <div className="d-flex justify-content-between">
            <Button className="custom-btn light shadow" onClick={() => setState('modelos')}> &#x2190; Volver </Button>
            <Button className="custom-btn primary shadow" type="submit">Calcular</Button>
          </div>
          {
            resultado && <div>
              <Button variant="success" className="custom-btn w-100" onClick={() => setModalShow(true)}>
                Guardar Valores
              </Button>
              <ModalCustom
                show={modalShow}
                modelo={modelo.name}
                resultado={resultado.numero}
                formData={formData}
                onHide={() => setModalShow(false)}
              />
            </div>
          }

        </div>
      </Form>
    </div>
  )
}

export default FormModel