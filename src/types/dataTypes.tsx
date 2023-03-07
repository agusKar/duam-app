export interface Modelo {
    name?: string;
    desc?: string;
    img?: string;
}
export type Semillas = string[]

export type StateProp = 'menu' | 'form' | 'modelos' | 'reportes' | 'tablaManuales';

export interface ResultadoEcuacion {
    title: string;
    numero: number;
    estado: boolean
}

export interface FormModelData {
  semilla: string;
  ancho: number;
  velocidad: number;
  tasa: number;
  valorObtenidoTest: number;
}