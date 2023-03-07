import { useState } from 'react';
import { Form } from 'react-bootstrap';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// Types
import { FormModelData, Modelo, ResultadoEcuacion } from "../types/dataTypes";

interface Props {
  show?: boolean;
  modelo: Modelo['name'];
  resultado: ResultadoEcuacion['numero'];
  formData: FormModelData;
  onHide: () => void;
}

const ModalCustom = ({ show, modelo, resultado, formData, onHide }: Props) => {
  const [email, setEmail] = useState(localStorage.getItem("email") ? localStorage.getItem("email") : '')
  const [emailValid, setEmailValid] = useState<boolean>(localStorage.getItem("email") ? true : false)

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
    const csvFileData = {"email": email, "modelo": modelo, "semilla":formData.semilla, "ancho":formData.ancho, "velocidad":formData.velocidad, "tasa":formData.tasa, "valorObtenidoTest":formData.valorObtenidoTest, "resultado":resultado};
    console.log(csvFileData)
    // Guardar en BD la data
    onHide()
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