import { Component, inject, Input } from '@angular/core';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-authentication',
  imports: [],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
    segurityService = inject(SecurityService);
    @Input()
    rol?: string;

    isAuthorized(): boolean {
        if (this.rol) {
            return this.segurityService.getUserRole() === this.rol;
        }

        return this.segurityService.isAuthenticated();
    }
}
