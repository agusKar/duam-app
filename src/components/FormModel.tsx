import { useState } from "react";
// Types
import { Modelo, Semillas, StateProp } from "../types/dataTypes";
// Bootstrap
import { Alert, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// Helpers
import calculadora from '../helpers'

interface Props {
  modelo: Modelo;
  semillas: Semillas;
  setState: (arg0: StateProp) => void;
}
interface FormModelData {
  semilla: string;
  ancho: number;
  velocidad: number;
  tasa: number;
  valorObtenidoTest: number;
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
  const [resultado, setResultado] = useState<number>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valNum = name == "semilla" ? value : parseFloat(value);

    setFormData({
      ...formData,
      [name]: valNum,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setResultado(calculadora(formData))
  }

  return (
    <div className="mb-4">
      <h2 className='mb-4'>{modelo.name}</h2>
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
          <Form.Control onChange={handleInputChange} value={formData.ancho || ''} name="ancho" type="number" step="0.01" placeholder="Ingrese su valor" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Velocidad (km/h)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.velocidad || ''} name="velocidad" type="number" step="0.01" placeholder="Ingrese su valor" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Tasa de aplicación (kg/ha)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.tasa || ''} name="tasa" type="number" step="0.01" placeholder="Ingrese su valor" />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Valor obtenido test (kg/min)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.valorObtenidoTest || ''} name="valorObtenidoTest" type="number" step="0.01" placeholder="Ingrese su valor" />
        </Form.Group>

        {
          resultado && <Alert variant="success">Resultado: <b>{resultado}</b></Alert>
        }

        <div className="d-flex justify-content-between align-items-center mt-5">
          <Button variant="info" className="text-white" onClick={() => setState('modelos')}>Volver</Button>
          <Button variant="success" type="submit">Calcular Valores</Button>
        </div>
      </Form>
    </div>
  )
}

export default FormModel