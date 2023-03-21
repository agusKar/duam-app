import { useEffect, useState } from "react";
// Types
import { FormModelData, Modelo, ResultadoEcuacion, Semillas, StateProp } from "../types/dataTypes";
// Bootstrap
import { Alert, Button, Form } from 'react-bootstrap';
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
  tipo: "",
  velocidad: 0,
  ancho: 0,
  tasa: 0,
  valorObtenidoTest: 0,
  cantBajadas: 0,
  densidadSiembra: 0,
  distanciaBajadas: 0
};

const FormModel = ({ setState, modelo, semillas }: Props) => {
  const [formData, setFormData] = useState<FormModelData>(initialValues)
  const [resultado, setResultado] = useState<ResultadoEcuacion>({ title: '', numero: 0, estado: false })
  const [modalShow, setModalShow] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const valNum = name === "semilla" ? value : parseFloat(value) || 0;

    setFormData({
      ...formData,
      [name]: valNum,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    formData.tipo = modelo.tipo ? modelo.tipo : ''
    formData.cantBajadas = modelo.cantBajadas ? modelo.cantBajadas : 0
    setResultado(calculadora(formData))
  }
  useEffect(() => {
    return () => { setResultado({ title: '', numero: 0, estado: false }) }
  }, [])

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

      <Form onSubmit={e => handleSubmit(e)} >

        <Form.Group className="mb-4">
          <Form.Label>Material a aplicar</Form.Label>
          <Form.Control
            as="select"
            name="semilla"
            aria-label="Material a aplicar"
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
          <Form.Label>Velocidad (km/h)</Form.Label>
          <Form.Control onChange={handleInputChange} value={formData.velocidad || ''} name="velocidad" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
        </Form.Group>
        {
          modelo.tipo === "surcos" &&
          <>
            <Form.Group className="mb-4">
              <Form.Label>Densidad de siembra deseada</Form.Label>
              <Form.Control onChange={handleInputChange} value={formData.densidadSiembra || ''} name="densidadSiembra" type="number" lang="es" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Distancia entre bajadas</Form.Label>
              <Form.Control onChange={handleInputChange} value={formData.distanciaBajadas || ''} name="distanciaBajadas" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Cantidad bajadas</Form.Label>
              <Form.Control value={modelo.cantBajadas} name="cantBajadas" type="number" step="0.01" readOnly />
            </Form.Group>
          </>
        }
        {
          modelo.tipo === "voleo" &&
          <>
            <Form.Group className="mb-4">
              <Form.Label>Valor obtenido test (kg/min)</Form.Label>
              <Form.Control onChange={handleInputChange} value={formData.valorObtenidoTest || ''} name="valorObtenidoTest" type="number" lang="es" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
            </Form.Group>


            <Form.Group className="mb-4">
              <Form.Label>Ancho de trabajo (mts)</Form.Label>
              <Form.Control onChange={handleInputChange} value={formData.ancho || ''} name="ancho" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tasa de aplicación (kg/ha)</Form.Label>
              <Form.Control onChange={handleInputChange} value={formData.tasa || ''} name="tasa" type="number" step="0.01" placeholder="Separador decimal con punto. Ej.: 1.3" />
            </Form.Group>
          </>
        }

        {/* Buttons */}
        <div className="d-flex flex-column gap-4 mt-5">
          <div className="d-flex justify-content-between">
            <Button className="custom-btn light shadow" onClick={() => setState('modelos')}> &#x2190; Volver </Button>
            <Button className="custom-btn primary shadow" type="submit">Calcular</Button>
          </div>
          {
            resultado.title != '' &&
            <>
              {
                !resultado.estado ?
                  <Alert variant="danger" className="text-center"><b>{`${resultado.title}`}</b></Alert>
                  :
                  <>
                    <Alert variant="success" className="text-center">Resultado: <br /> <b>{`${resultado.title}`} {resultado.numero > 0 && resultado.numero}</b></Alert>
                    <Button variant="success" className="custom-btn w-100" onClick={() => setModalShow(true)}>
                      Guardar Valores
                    </Button>
                    <ModalCustom
                      show={modalShow}
                      modelo={modelo.name}
                      resultado={resultado}
                      formData={formData}
                      onHide={() => setModalShow(false)}
                    />
                  </>
              }
            </>
          }


        </div>
      </Form>
      <small className="mt-4 d-block text-muted">EL PG (PODER GERMINATIVO) NO ESTA CONTEMPLADO EN LOS CÁLCULOS de ESTE TEST. EL CLIENTE  DEBERÁ AGREGAR AL VALOR OBTENIDO LUEGO DE REALIZAR EL CÁLCULO, EL PORCENTUAL SUGERIDO POR EL PROVEEDOR DE LAS SEMILLAS O PRODUCTO A DISPERSAR.</small>
    </div>
  )
}

export default FormModel