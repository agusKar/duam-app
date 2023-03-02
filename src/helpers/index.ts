interface Params {
  ancho: number;
  velocidad: number;
  tasa: number;
  valorObtenidoTest: number;
}

const calculadora = (data: Params) => {
  const {ancho, velocidad, tasa, valorObtenidoTest} = data

  if (ancho == undefined || isNaN(ancho) || ancho == 0) {
    // return (valorObtenidoTest*600)/(velocidad*ancho);
    console.log("Faltante de ecuacion")

  } else if (velocidad == undefined || isNaN(velocidad) || velocidad == 0) {
    return (valorObtenidoTest*600)/(tasa*ancho);

  } else if (tasa == undefined || isNaN(tasa) || tasa == 0) {
    return (valorObtenidoTest*600)/(velocidad*ancho);

  } else if (valorObtenidoTest == undefined || isNaN(valorObtenidoTest) || valorObtenidoTest == 0) {
    return (tasa*velocidad*ancho)/600;

  } else {
    console.log("Todos los datos estas ingresados")
  }
}
export default calculadora