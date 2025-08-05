import { GeneroDto } from "./generoDto";
import { PacienteDto } from "./pacienteDto";

export interface FilterEstudioDto{
    nameEstudio: string;
    // from: Date | null;
    // to: Date;
    pageNumber: number;
    recordsPage: number;
}

export interface AllEstudioDto{
    paciente : PacienteDto;
    birthdate: Date;
    date: Date;
    nameEstudio: string;
    resultado: number;
    genero: GeneroDto;
}