import { Component, Input } from '@angular/core';
import { AllEstudioDto } from '../../../dtos/estudioDto';
import { LoadingComponent } from "../../../template/loading/loading.component";

@Component({
    selector: 'app-list-estudios',
    imports: [LoadingComponent],
    templateUrl: './list-estudios.component.html',
    styleUrl: './list-estudios.component.css'
})

export class ListEstudiosComponent {
    @Input({required:true})
    estudios!: AllEstudioDto[];
    constructor(){
        if(this.estudios !== undefined){
            //console.table(this.estudios.values);

        }
    }   
}