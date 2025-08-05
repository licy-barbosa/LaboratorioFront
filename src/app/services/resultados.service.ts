import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { AllEstudioDto } from '../dtos/estudioDto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
    constructor() { }
    private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/estudios'

    public filter(filter: any): Observable<HttpResponse<AllEstudioDto[]>>{
        const params = new HttpParams({fromObject: filter});
        console.table(params.toString());
        return this.http.get<AllEstudioDto[]>(this.urlBase, {params, observe: 'response'});
    } 

    public getAll(): Observable<AllEstudioDto[]>{
        return this.http.get<AllEstudioDto[]>(`${this.urlBase}`);
    } 
}