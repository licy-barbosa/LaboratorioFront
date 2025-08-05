import { Router } from '@angular/router';
import { getErrors } from '../../../share/GetErrors';
import { PacienteDto } from '../../../dtos/pacienteDto';
import { PacientesService } from '../../../services/pacientes.service';
import { LoadingComponent } from '../../../template/loading/loading.component';
import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ShowErroresComponent } from '../../../template/show-errores/show-errores.component';
import { FormComponent } from "../form-pacientes/form-pacientes.component";

@Component({
  selector: 'app-edit-pacientes',
  imports: [LoadingComponent, ShowErroresComponent, FormComponent],
  templateUrl: './edit-pacientes.component.html',
  styleUrl: './edit-pacientes.component.css'
})
export class EditPacientesComponent implements OnInit{
    ngOnInit(): void {
      this.pacienteService.getPacienteById(this.id).subscribe(paciente => {
        this.paciente = paciente;
        console.table(paciente);
      });
    }

    private router = inject(Router);
    pacienteService = inject(PacientesService);

    @Input({transform: numberAttribute})
    id!:number;

    errores: string[] = [];
    paciente?: PacienteDto;

    saveChanges(paciente: any){
        this.pacienteService.updatePaciente(this.id, paciente).subscribe({
            next: () => {
                this.router.navigate(['/pacientes']);
            },
            error: err => {
                const errores = getErrors(err);
                this.errores = errores;
            }
        });
    }
}