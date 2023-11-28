import { Votos } from "./votos";

export interface Partida {
    idSesion: string;
    idPropuesta: string;
    fechaDeJuego: Date;
    actividad: string;
    votos: Votos[];
  }