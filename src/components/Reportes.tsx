import { useEffect, useState } from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { SECRET_TOKEN } from '../config'

// const mock = [{
//     "email": "c@c.com",
//     "modelo": "APLICADORA POR SURCOS AS-60",
//     "semilla": "",
//     "ancho": 0,
//     "velocidad": 4,
//     "tasa": 0,
//     "valorObtenidoTest": 0,
//     "tipo": "surcos",
//     "cantBajadas": 6,
//     "densidadSiembra": 20,
//     "distanciaBajadas": 0.2,
//     "resultadoNum": 0.0222,
//     "resultadoTitulo": "Resultado:"
// }]

const Reportes = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email") as string) : '')
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const [reportes, setReportes] = useState([]);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);

    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  useEffect(() => {
    const loadReportes = () => {
      fetch(`https://www.duam.ar/api/items/read?email=${email}`, {
        headers: { 'Authorization': SECRET_TOKEN }
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (!result.status) {
              throw new Error("Not 200 response", { cause: result.message });
            } else {
              setAlert(false)
              setReportes(result.items)
            }
          }
        )
        .catch(error => {
          setAlert(true)
          console.log(error)
        })
    }
    loadReportes()
  }, [email])

  const handleClick = () => {
    fetch(`https://www.duam.ar/api/items/send?email=${email}`, {
      headers: { 'Authorization': SECRET_TOKEN }
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.status) {
            throw new Error("Not 200 response", { cause: result.message });
          } else {
            setAlertMsg(result.message)
          }
        }
      )
      .catch(error => {
        setAlertMsg('')
        console.log(error)
      })
  }

  return (
    <>
      <h3 className="custom-title">Reportes para el email: <span>{email}</span></h3>
      {
        alert ?
          <Alert variant='danger'>No se encontraron resultados para tu busqueda.</Alert>
          :
          <>
            <Table bordered striped hover responsive variant='light' className='my-4 text-center'>
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Semilla</th>
                  <th>Ancho (Mts.)</th>
                  <th>Velocidad (km/h)</th>
                  <th>Tasa (kg/ha)</th>
                  <th>Valor Obt. (kg/min)</th>
                  <th>Tipo</th>
                  <th>Cantidad Bajadas</th>
                  <th>Densidad siembra</th>
                  <th>Distancia bajadas</th>
                  <th><b>Resultado</b></th>
                </tr>
              </thead>
              <tbody>
                {
                  reportes?.map((value, index) => (
                    <tr key={index}>
                      <td>{value[1]}</td>
                      <td>{value[2]}</td>
                      <td>{value[3] === 0 ? "-" : value[3]}</td>
                      <td>{value[4] === 0 ? "-" : value[4]}</td>
                      <td>{value[5] === 0 ? "-" : value[5]}</td>
                      <td>{value[6] === 0 ? "-" : value[6]}</td>
                      <td>{value[7]}</td>
                      <td>{value[8] === 0 ? "-" : value[8]}</td>
                      <td>{value[9] === 0 ? "-" : value[9]}</td>
                      <td>{value[10] === 0 ? "-" : value[10]}</td>
                      <td>{value[12]} <b>{value[11]}</b></td>
                    </tr>
                  ))
                }
                {/* {
                reportes?.map((value, index) => (
                  <tr key={index}>
                    <td>{value[1]}</td>
                    <td>{value[2]}</td>
                    <td>{value[3] == 0 ? "-" : value[3]}</td>
                    <td>{value[4] == 0 ? "-" : value[4]}</td>
                    <td>{value[5] == 0 ? "-" : value[5]}</td>
                    <td>{value[6] == 0 ? "-" : value[6]}</td>
                    <td>{value[7]}</td>
                    <td>{value[8] == 0 ? "-" : value[8]}</td>
                    <td>{value[9] == 0 ? "-" : value[9]}</td>
                    <td>{value[10] == 0 ? "-" : value[10]}</td>
                    <td>{`${value[12]} <b>${value[11]}</b>`}</td>
                  </tr>
                ))
              } */}
              </tbody>
            </Table>
            {isOnline ? (
              <Button onClick={() => handleClick()}>Enviar reporte</Button>
            ) : (
              <Alert variant='warning'>No tenés conexión a internet. Volvé a intentarlo nuevamente mas tarde.</Alert>
            )}
            {
              alertMsg != '' &&
              <Alert variant='success'>El email se envio correctamente.</Alert>
              
            }

          </>
      }
    </>

  )
}

export default Reportes