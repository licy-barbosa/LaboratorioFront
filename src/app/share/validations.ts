import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula():ValidatorFn{

    return (control: AbstractControl): ValidationErrors | null => {
        const valor =<string>control.value;
        
        if(!valor) return null;
        if(valor.length === 0) return null;

        const primeraLetra = valor[0];

        if(primeraLetra !== primeraLetra.toUpperCase()){

            return {
                primeraLetraMayuscula:{
                    mensaje : "La primera letra debe ser mayuscula"
                }
            }
        }

        return null;
    }
}

export function validatorCURP():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const valor =<string>control.value;
        if(!valor || valor.length === 0) return null;

        const regex = /^[A-Z]{4}\d{6}[H,M][A-Z]{5}[0-9,A-Z]{2}$/; 
        const isValid = regex.test(valor);

        if(isValid === false ){
            return {
                validatorCURP:{
                    mensaje : "CURP incorrecta"
                }
            }
        }

        return null;
    }
}