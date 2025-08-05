export interface PacienteDto{
    pacienteId : number;
    nombre: string;
    nss: number;
    edad: number;
    generoid: number;
    CURP: string;
}

export interface FilterPacienteDto{
    pacienteId: number;
    nombre: string;
    NSS: number;
    edad: number;
    genero: string;
}

export interface AllPacienteDto{
    id: number;
    nombre: string;
    nss: number;
    edad: number;
    genero: string;
}