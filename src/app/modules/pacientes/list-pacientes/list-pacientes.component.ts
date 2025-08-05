import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PacientesService } from '../../../services/pacientes.service';
import { LoadingComponent } from "../../../template/loading/loading.component";

@Component({
  selector: 'app-list-pacientes',
  imports: [MatButtonModule, MatIconModule, RouterLink, SweetAlert2Module, LoadingComponent],
  templateUrl: './list-pacientes.component.html',
  styleUrl: './list-pacientes.component.css'
})

export class ListPacientesComponent {
    pacienteService = inject(PacientesService);
    
    @Input({required:true})
    pacientes!: any[];

    @Input({required:true})
    columns!: any[];

    @Output()
    deleted = new EventEmitter<void>();

    delete(id:number) {
      	this.pacienteService.delete(id).subscribe(()=> {
            this.deleted.emit();
		});
    }
}