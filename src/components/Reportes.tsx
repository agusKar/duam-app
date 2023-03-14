import { useEffect, useState } from 'react'
import { Alert, Table } from 'react-bootstrap'

const mock = [{
  "email": "agustin@agustin.com",
  "modelo": "SEMBRADORA NEUMÁTICA SN-250",
  "semilla": "Trigo",
  "ancho": "6",
  "velocidad": "66",
  "tasa": "44",
  "valorObtenidoTest": "0",
  "resultado": "0.14"
}, {
  "email": "agustin@agustin.com",
  "modelo": "SEMBRADORA NEUMÁTICA SN-250",
  "semilla": "Trigo",
  "ancho": "6",
  "velocidad": "66",
  "tasa": "44",
  "valorObtenidoTest": "0",
  "resultado": "0.14"
}, {
  "email": "agustin@agustin.com",
  "modelo": "SEMBRADORA NEUMÁTICA SN-250",
  "semilla": "Trigo",
  "ancho": "6",
  "velocidad": "66",
  "tasa": "44",
  "valorObtenidoTest": "0",
  "resultado": "0.14"
}]

const Reportes = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("email") ? 
      JSON.parse(localStorage.getItem("email") as string) 
      : '')
  const [alert, setAlert] = useState<boolean>(false);
  const [reportes, setReportes] = useState();

  useEffect(() => {
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: 'a@a.com' })
    // };
    const loadReportes = () => {
      fetch(`https://www.duam.ar/api/items/read?email=${email}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            setAlert(false)
            setReportes(result)
          },
          (error) => {
            setAlert(true)
            console.log(error)
          }
        )
    }
    loadReportes()
  }, [])

  return (
    <>
      <h3 className="custom-title">Reportes para el email: <span>{email}</span></h3>
      {
        alert ?
          <Alert variant='danger'>No se encontraron resultados para tu busqueda</Alert>
          :
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
      }
    </>

  )
}

export default Reportes