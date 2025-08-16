import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthenticationComponent } from "../../modules/security/authentication/authentication.component";
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, AuthenticationComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    securityService = inject(SecurityService);

    profileImage = 'https://via.placeholder.com/40'; // Cambia por imagen real
}