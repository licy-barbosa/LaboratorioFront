import { Observable, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { authenticationResponseDto, credentialsUserDto, userDto } from '../dtos/securityDto';
import { buildQueryParams } from '../share/buildQueryParams';
import { paginationDTO } from '../dtos/paginationDTO';

@Injectable({
  providedIn: 'root'
})

export class SecurityService {
    private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/users'
    private readonly tokenKey = 'authToken';
    private readonly keyExpiration = 'token-expiration';
    
    public getPage(pagination: paginationDTO): Observable<HttpResponse<userDto[]>>{
        let queryParams = buildQueryParams(pagination);
        return this.http.get<userDto[]>(this.urlBase, {params: queryParams, observe: 'response'});
    } 

    public addClaimAdmin(email: string)  {
        return this.http.post(`${this.urlBase}/addClaimAdmin`, {email});
    }
    
    public removeClaimAdmin(email: string){
        return this.http.post(`${this.urlBase}/removeClaimAdmin`, {email});
    }

    public register(credentials: credentialsUserDto): Observable<authenticationResponseDto>{
        return this.http.post<authenticationResponseDto>(`${this.urlBase}/register`, credentials)
        .pipe(
            tap(response =>  this.saveToken(response))
        )
    } 

    public login(credentials: credentialsUserDto): Observable<authenticationResponseDto>{
        return this.http.post<authenticationResponseDto>(`${this.urlBase}/login`, credentials)
            .pipe(tap(response =>  this.saveToken(response))
        );
    }

    public logout(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.keyExpiration);
        //return this.http.post<void>(`${this.urlBase}/logout`, {});
    }

    public getUserInfo(): Observable<authenticationResponseDto> {
        return this.http.get<authenticationResponseDto>(`${this.urlBase}/info`);
    }

    public saveToken(response: authenticationResponseDto): void {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.keyExpiration, response.expiration.toString());
    }

    isAuthenticated(): boolean {
       // return !!localStorage.getItem('authToken');
        const token = localStorage.getItem(this.tokenKey);
        
        if (!token) {
            return false;       
        }

        const expiration = localStorage.getItem(this.keyExpiration);
        const expirationDate = expiration ? new Date(expiration) : null;

        if (!expirationDate || expirationDate <= new Date()) {
            this.logout(); // Token expired, clear it
            return false;
        }

       return true; // Placeholder for actual authentication check
    }

    getUserRole(): string | null {
        const isadmin = this.getClaimValue('isadmin');

        if(isadmin === 'true') {
            return 'admin';
        }
        else {
            return 'user';
        }
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getClaimValue( claimSearch: string): string  {
        const token = localStorage.getItem(this.tokenKey);

        if (!token) {
            return '';
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        // Buscar la clave que contenga el texto buscado (insensible a mayúsculas)
        const claimKey = Object.keys(payload).find(k =>
            k.toLowerCase().includes(claimSearch.toLowerCase())
        );
        
        console.table(claimKey);
        if(claimKey && claimKey==='isadmin'){
            return claimKey ? payload[claimKey][0].toString() : 'user';
        }
        return claimKey ? payload[claimKey].toString() : '';
    }
}