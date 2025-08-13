import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { credentialsUserDto } from '../../../dtos/securityDto';
import { SecurityService } from '../../../services/security.service';
import { getErrorsIdentity } from '../../../share/GetErrors';
import { FormLoginComponent } from "../form-login/form-login.component";

@Component({
  selector: 'app-register',
  imports: [FormLoginComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   securityService = inject(SecurityService);
    router = inject(Router);
    errores : string[] = [];

    login(credentials: credentialsUserDto): void {
        console.log("Login credentials: ", credentials);
        this.securityService.register(credentials)
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