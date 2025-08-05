import { MatButtonModule } from '@angular/material/button';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accions',
  imports: [MatButtonModule],
  templateUrl: './accions.component.html',
  styleUrl: './accions.component.css'
})
export class AccionsComponent {
  router = inject(Router);
  
    saveChanges(){
        this.router.navigate(['/pacientes']);
    }
}
