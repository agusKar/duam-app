import { FormModelData, ResultadoEcuacion } from '../types/dataTypes'

const calculadora = (data: FormModelData): ResultadoEcuacion => {
  const { ancho, velocidad, tasa, valorObtenidoTest, tipo, cantBajadas, densidadSiembra, distanciaBajadas } = data

  // Todos los datos ingresados 
  if (velocidad > 0 && ancho > 0 && tasa > 0 && valorObtenidoTest && valorObtenidoTest > 0) {
    return { title: 'Error, todos los datos fueron ingresados.', numero: 0, estado: false };
  }

  if (tipo === "surcos" && velocidad > 0 && cantBajadas && densidadSiembra && densidadSiembra > 0 && distanciaBajadas && distanciaBajadas > 0) {
    let hectarea = 10000;
    let espacioDosificadores = cantBajadas-1;
    let resultado = densidadSiembra / (hectarea / ((distanciaBajadas * espacioDosificadores) * (velocidad * 1000) / 60)) / cantBajadas;
    
    return { title: 'Resultado:', numero: parseFloat(resultado.toFixed(4)) , estado: true };
  }

  if (tipo === "voleo") {
    // Todos los datos vacios
    if (velocidad === 0 && ancho === 0 && tasa === 0 && valorObtenidoTest === 0) {
      return { title: 'Error, faltan datos.', numero: 0, estado: false };
    }
    // Calcular velocidad
    if (velocidad === 0) {
      let resul = (valorObtenidoTest! * 600) / (tasa * ancho);
      return { title: "Velocidad (km/h):", numero: resul, estado: true };
    }

    // Calcular tasa
    if (tasa === 0) {
      let resul = (valorObtenidoTest! * 600) / (velocidad * ancho);
      return { title: "Tasa de aplicación (kg/ha):", numero: resul, estado: true };
    }

    // Calcular valor obtenido test
    if (valorObtenidoTest === 0) {
      let resul = (tasa * velocidad * ancho) / 600;
      return { title: "Valor obtenido test (kg/min):", numero: resul, estado: true };
    }
  }

  return { title: 'Error, vuelva a intentarlo.', numero: 0, estado: false };

}
export default calculadora