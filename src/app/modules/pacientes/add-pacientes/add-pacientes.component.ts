import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getErrors } from '../../../share/GetErrors';
import { PacienteDto } from '../../../dtos/pacienteDto';
import { PacientesService } from '../../../services/pacientes.service';
import { FormComponent } from "../form-pacientes/form-pacientes.component";
import { ShowErroresComponent } from '../../../template/show-errores/show-errores.component';

@Component({
  selector: 'app-add',
  imports: [ShowErroresComponent, FormComponent],
  templateUrl: './add-pacientes.component.html',
  styleUrl: './add-pacientes.component.css'
})

export class AddComponent {
    private router = inject(Router);
    private pacienteServices = inject(PacientesService);
    errores: string[] = [];

    saveChanges(paciente: PacienteDto){
        this.pacienteServices.createPaciente(paciente).subscribe({
            next:()=> {
                this.router.navigate(['/pacientes']);
            },
            error: err => {
                this.errores = getErrors(err);
            }
        });
    }
}