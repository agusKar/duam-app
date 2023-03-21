import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// Types
import { FormModelData, Modelo, ResultadoEcuacion } from "../types/dataTypes";

import { SECRET_TOKEN } from '../config'

interface Props {
  show?: boolean;
  modelo: Modelo['name'];
  resultado: ResultadoEcuacion;
  formData: FormModelData;
  onHide: () => void;
}

const ModalCustom = ({ show, modelo, resultado, formData, onHide }: Props) => {
  const [email, setEmail] = useState(
    localStorage.getItem("email") ?
      JSON.parse(localStorage.getItem("email") as string)
      : '')
  const [emailValid, setEmailValid] = useState<boolean>(localStorage.getItem("email") ? true : false)
  const [alert, setAlert] = useState<boolean>(false);

  const handleEmail = () => {
    setEmail('');
    setEmailValid(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailValid(true);
    localStorage.setItem('email', JSON.stringify(email));

  }
  const handleCSV = () => {
    const csvFileData = { "email": email, "modelo": modelo, "semilla": formData.semilla, "ancho": formData.ancho, "velocidad": formData.velocidad, "tasa": formData.tasa, "valorObtenidoTest": formData.valorObtenidoTest, "tipo": formData.tipo, "cantBajadas": formData.cantBajadas, "resultadoNum": resultado.numero, "resultadoTitulo": resultado.title };

    // Guardar en BD la data
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': SECRET_TOKEN },
      body: JSON.stringify(csvFileData)
    };
    const saveReporte = () => {
      console.log(csvFileData)
      fetch(`https://www.duam.ar/api/items/create`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            if (!result.status) {
              throw new Error("Not 200 response", { cause: result.message });
            } else {
              setAlert(false)
              onHide()
            }
          }
        )
        .catch(error => {
          setAlert(true)
          console.log(error)
        })
    }
    saveReporte()
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Guardar valores
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Tu email: </h5>
          <div className='w-100 d-flex justify-content-between align-items-center'>
            <h6 className='pr-2'>{email}</h6>
            {
              emailValid &&
              <Button variant='danger' onClick={handleEmail}>X</Button>
            }
          </div>
          {
            !emailValid &&
            <Form onSubmit={handleSubmit}>
              <hr />
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su email" />
                <Button className='mt-2' type="submit" variant="info">Guardar Email</Button>
              </Form.Group>
            </Form>
          }
        </Modal.Body>
        {
          alert && <Alert variant='danger'>Hubo un error.</Alert>
        }
        <Modal.Footer className='justify-content-center'>
          {
            emailValid &&
            <Button variant="success" onClick={() => handleCSV()}>Guardar</Button>
          }
          <Button variant="danger" onClick={onHide}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCustom