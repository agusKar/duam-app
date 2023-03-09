import { useState } from 'react'
import { Table } from 'react-bootstrap'

const mock = [{
  "email": "agustin@agustin.com", 
  "modelo": "SEMBRADORA NEUMÁTICA SN-250", 
  "semilla":"Trigo", 
  "ancho":"6", 
  "velocidad":"66", 
  "tasa":"44", 
  "valorObtenidoTest":"0", 
  "resultado":"0.14"
},{
  "email": "agustin@agustin.com", 
  "modelo": "SEMBRADORA NEUMÁTICA SN-250", 
  "semilla":"Trigo", 
  "ancho":"6", 
  "velocidad":"66", 
  "tasa":"44", 
  "valorObtenidoTest":"0", 
  "resultado":"0.14"
},{
  "email": "agustin@agustin.com", 
  "modelo": "SEMBRADORA NEUMÁTICA SN-250", 
  "semilla":"Trigo", 
  "ancho":"6", 
  "velocidad":"66", 
  "tasa":"44", 
  "valorObtenidoTest":"0", 
  "resultado":"0.14"
}]

const Reportes = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") ? localStorage.getItem("email") : '')
  return (
    <>
    <h3 className="custom-title">Reportes para el email: <span>{email}</span></h3>
    <Table bordered striped hover responsive variant='light' className='mt-3 text-center'>
      <thead>
        <tr>
          <th>Modelo</th>
          <th>Semilla</th>
          <th>Ancho</th>
          <th>Velocidad</th>
          <th>Tasa</th>
          <th>Valor Obt.</th>
          <th>Resultado</th>
        </tr>
      </thead>
      <tbody>
        
          {
            mock.map((valueMock, index) => (
              <tr key={index}>
                <td>{valueMock.modelo}</td>
                <td>{valueMock.semilla}</td>
                <td>{valueMock.ancho}</td>
                <td>{valueMock.velocidad}</td>
                <td>{valueMock.tasa}</td>
                <td>{valueMock.valorObtenidoTest}</td>
                <td>{valueMock.resultado}</td>
              </tr>
            ))
          }
      </tbody>
    </Table>
    </>

  )
}

export default Reportes