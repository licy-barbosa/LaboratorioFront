import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { GeneroDto } from '../dtos/generoDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {
    private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/generos'
    constructor() { }

    public getAll(): Observable<GeneroDto[]>{
        return this.http.get<GeneroDto[]>(this.urlBase);
    }    
}