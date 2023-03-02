interface Params {
  ancho: number;
  velocidad: number;
  tasa: number;
  valorObtenidoTest: number;
}

const calculadora = (data: Params) => {
  const {ancho, velocidad, tasa, valorObtenidoTest} = data

  if((ancho !== undefined && ancho > 0) && (velocidad !== undefined && velocidad > 0) && (tasa !== undefined && tasa > 0) && (valorObtenidoTest !== undefined && valorObtenidoTest > 0)){
    return "Todos los datos estan completos.";
  }

  if (ancho === undefined || isNaN(ancho) || ancho === 0) {
    // return (valorObtenidoTest*600)/(velocidad*ancho);
    return "Faltante de ecuacion";

  } if (velocidad === undefined || isNaN(velocidad) || velocidad === 0) {
    return "Velocidad (km/h): "+(valorObtenidoTest*600)/(tasa*ancho);

  } if (tasa === undefined || isNaN(tasa) || tasa === 0) {
    return "Tasa de aplicación (kg/ha): "+(valorObtenidoTest*600)/(velocidad*ancho);

  } if (valorObtenidoTest === undefined || isNaN(valorObtenidoTest) || valorObtenidoTest === 0) {
    return "Valor obtenido test (kg/min): "+(tasa*velocidad*ancho)/600;

  }

}
export default calculadora