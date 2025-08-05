import { RouterLink } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter, inject } from "@angular/core";
import { GeneroDto } from "../../../dtos/generoDto";
import { PacienteDto } from "../../../dtos/pacienteDto";
import { primeraLetraMayuscula, validatorCURP } from "../../../share/validations";
import { GenerosService } from "../../../services/generos.service";

@Component({
  selector: 'app-form-pacientes',
  imports: [MatButtonModule, RouterLink,  ReactiveFormsModule, MatInputModule,  MatSelectModule, MatFormFieldModule],
  templateUrl: './form-pacientes.component.html',
  styleUrl: './form-pacientes.component.css'
})

export class FormComponent implements OnInit{
    @Input()
    model?: PacienteDto;

    @Output()
    postForm = new EventEmitter<PacienteDto>();

    generoService = inject(GenerosService);

    generos?: GeneroDto[];

    //validaciones 54
    private formbuilder = inject(FormBuilder);
    form = this.formbuilder.group({
        nombre: ['', {validators : [
            Validators.required,
            primeraLetraMayuscula()
        ]}],
        curp: ['', {validators : [
            Validators.required,
            validatorCURP()
        ]}],
        nss: [0, {validators : [
            Validators.required,
            Validators.pattern('[0-9]{11}')
        ]}],
        generoid : 0,
        edad: 0
    })

    ngOnInit(): void {
        this.generoService.getAll().subscribe(res => {
            this.generos = res;
        });

        console.table(this.generos);
        if(this.model !== undefined){
            this.form.patchValue(this.model);
        }
    }

    saveFormChanges(){
        console.log(this.form.value);

        if(!this.form.valid){
            return;
        }

        const paciente = this.form.value as PacienteDto;
        this.postForm.emit(paciente);
    }

    getErrorsName():string{
        let nombre = this.form.controls.nombre;

        if(nombre.hasError('required')){
            return "el campo nombre es requerido";
        }

        if(nombre.hasError('primeraLetraMayuscula')){
            return nombre.getError('primeraLetraMayuscula').mensaje;
        }

        return "";
    }

    getErrorsNSS():string{
        let nss = this.form.controls.nss;

        if(nss.hasError('required')){
            return "el campo nombre es requerido";
        }

        if(nss.hasError('pattern')){
            return "El NSS es incorrecto"
        }

        return "";
    }

    getErrorsCURP():string{
        let curp = this.form.controls.curp;
       
        if(curp.hasError('required')){
            return "El campo CURP es requerido";
        }

        if(curp.hasError("validatorCURP")){
            return curp.getError('validatorCURP').mensaje;
        }

        return "";
    }
}