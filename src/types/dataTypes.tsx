export type Semillas = string[]

export type StateProp = 'menu' | 'form' | 'modelos' | 'reportes' | 'tablaManuales';

export interface Modelo {
  name?: string;
  desc?: string;
  img?: string;
  tipo?: string;
  cantBajadas?: number;
  pdf?: string;
}

export interface ResultadoEcuacion {
  title: string;
  numero: number;
  estado: boolean
}

export interface FormModelData {
  semilla: string;
  tipo: string
  velocidad: number; //ambas
  ancho: number; //voleo
  tasa: number;//voleo
  valorObtenidoTest?: number;//voleo
  cantBajadas?: number//surco
  densidadSiembra?: number//surco
  distanciaBajadas?: number//surco
}