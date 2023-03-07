import { ResultadoEcuacion } from '../types/dataTypes'

interface Params {
  ancho: number;
  velocidad: number;
  tasa: number;
  valorObtenidoTest: number;
}

const calculadora = (data: Params): ResultadoEcuacion => {
  const { ancho, velocidad, tasa, valorObtenidoTest } = data

  // Todos los datos estan completos
  if ((ancho !== undefined && ancho > 0) && (velocidad !== undefined && velocidad > 0) && (tasa !== undefined && tasa > 0) && (valorObtenidoTest !== undefined && valorObtenidoTest > 0)) {
    return { title: "Todos los datos estan completos.", numero: 0, estado: false };
  }

  // Faltan datos
  if ((ancho === undefined || ancho == 0) && (velocidad === undefined || velocidad == 0) && (tasa === undefined || tasa == 0) && (valorObtenidoTest === undefined || valorObtenidoTest == 0)) {
    return { title: "Faltan datos.", numero: 0, estado: false };
  }

  // Calcular velocidad
  if (velocidad === undefined || isNaN(velocidad) || velocidad === 0) {
    let resul = (valorObtenidoTest * 600) / (tasa * ancho);
    return { title: "Velocidad (km/h):", numero: resul, estado: true };
  }

  // Calcular tasa
  if (tasa === undefined || isNaN(tasa) || tasa === 0) {
    let resul = (valorObtenidoTest * 600) / (velocidad * ancho);
    return { title: "Tasa de aplicación (kg/ha):", numero: resul, estado: true };
  }

  // Calcular valor obtenido test
  if (valorObtenidoTest === undefined || isNaN(valorObtenidoTest) || valorObtenidoTest === 0) {
    let resul = (tasa * velocidad * ancho) / 600;
    return { title: "Valor obtenido test (kg/min):", numero: resul, estado: true };
  }

  return { title: '', numero: 0, estado: false };

}
export default calculadora