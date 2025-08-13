import { Component, inject } from '@angular/core';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { credentialsUserDto } from '../../../dtos/securityDto';
import { getErrorsIdentity } from '../../../share/GetErrors';
import { FormLoginComponent } from "../form-login/form-login.component";

@Component({
  selector: 'app-login',
  imports: [FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    securityService = inject(SecurityService);
    router = inject(Router);
    errores : string[] = [];

    login(credentials: credentialsUserDto): void {
        console.log("Login credentials: ", credentials);
        this.securityService.login(credentials)
            .subscribe({
                next: response => {
                    this.router.navigate(['/']);
                },
                error: error => {
                    const errores = getErrorsIdentity(error);
                    this.errores = errores;
                }
            });
    }
}