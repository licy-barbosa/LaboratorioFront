import { inject, Injectable } from '@angular/core';
import { AllPacienteDto, FilterPacienteDto, PacienteDto } from '../dtos/pacienteDto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { paginationDTO } from '../dtos/paginationDTO';
import { buildQueryParams } from '../share/buildQueryParams';

@Injectable({
  providedIn: 'root'
})

export class PacientesService {
    private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/pacientes'

    constructor() { }
   
    public getPage(pagination: paginationDTO): Observable<HttpResponse<AllPacienteDto[]>>{
        let queryParams = buildQueryParams(pagination);
        return this.http.get<AllPacienteDto[]>(this.urlBase, {params: queryParams, observe: 'response'});
    } 

    public getAll(): Observable<AllPacienteDto[]>{
        return this.http.get<AllPacienteDto[]>(this.urlBase);
    } 

    public getPacienteById(id: number): Observable<PacienteDto>{
        return this.http.get<PacienteDto>(`${this.urlBase}/${id}`);
    }

    public createPaciente(paciente : PacienteDto){
        return this.http.post(this.urlBase, paciente);
    }
    
    public updatePaciente(id: number, paciente: PacienteDto){
        return this.http.put(`${this.urlBase}/${id}`, paciente);
    }

    public delete(id: number){
        return this.http.delete(`${this.urlBase}/${id}`);
    }
}