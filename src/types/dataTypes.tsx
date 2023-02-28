export interface Modelo {
    name?: string;
    desc?: string;
    img?: string;
}
export type Semillas = string[]

export type StateProp = 'menu' |  'form' |  'modelos' |  'resultado';