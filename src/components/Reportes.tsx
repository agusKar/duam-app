import { useEffect, useRef, useState } from 'react'
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

interface Captcha {
  text: string;
  userText: string;
  status: Boolean;
}
interface Alert {
  text: string;
  status: string;
}

const Reportes = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("email") ? JSON.parse(localStorage.getItem("email") as string) : '')
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<Alert>({ text: '', status: '' });
  const [reportes, setReportes] = useState([]);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [captcha, setCaptcha] = useState<Captcha>({ text: '', userText: '', status: false });
  const canvasRef = useRef(null);

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

  useEffect(() => {
      let text = generateCaptcha()
      setCaptcha({ ...captcha, text })
  }, [])

  const generateCaptcha = (): string => {
    let uniquechar: string = "";
    if(canvasRef.current){
      const canvas: HTMLCanvasElement = canvasRef.current;
      const randomchar: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (let i = 1; i < 8; i++) {
        uniquechar += randomchar.charAt(Math.random() * randomchar.length)
      }
      
      let ctx = canvas.getContext("2d");
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      ctx!.font = "30px Arial";
      ctx!.fillStyle = "white";
      ctx!.fillText(uniquechar, 25, 35);

    }    
    return uniquechar
  }

  const handleClick = () => {
    if (captcha.text === captcha.userText) {
      setCaptcha({ ...captcha, status: true })
      fetch(`https://www.duam.ar/api/items/send?email=${email}`, {
        headers: { 'Authorization': SECRET_TOKEN }
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (!result.status) {
              throw new Error("Not 200 response", { cause: result.message });
            } else {
              setAlertMsg({ text: result.message, status: 'success' })
              setCaptcha({ ...captcha, userText: '', status: false })
            }
          }
        )
        .catch(error => {
          setAlertMsg({ text: error, status: 'danger' })
          console.log(error)
        })
    } else {
      setAlertMsg({ text: 'Error al ingresar el captcha', status: 'danger' })
    }
  }

  return (
    <>
      <h3 className="custom-title">Reportes para el email: <span>{email}</span></h3>
      {
        alert ?
          <Alert variant='danger'>No se encontraron resultados para tu búsqueda.</Alert>
          :
          <>
            <Table bordered striped hover responsive variant='light' className='mt-3 text-center'>
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
            {isOnline ?
                <div className='text-center'>
                  <canvas ref={canvasRef} id="valicode" width="200" height="50" style={{ "backgroundColor": "#f1701f", "borderRadius": "15px" }}></canvas>
                  <input type="text" className='form-control bg-white mt-2' placeholder='Ingrese captcha para enviar reporte' value={captcha.userText} onChange={(e) => setCaptcha({ ...captcha, userText: e.target.value })} />
                  <Button className='text-white mt-4' onClick={() => handleClick()}>Enviar reporte</Button>
                </div>
              : (
                <Alert variant='warning' className='mt-4'>No tenés conexión a internet. Volvé a intentarlo nuevamente más tarde.</Alert>
              )
            }
            {
              alertMsg.text !== '' &&
              <Alert variant={alertMsg.status} className='mt-4'>{alertMsg.text}</Alert>
            }
          </>
      }
    </>

  )
}

export default Reportes