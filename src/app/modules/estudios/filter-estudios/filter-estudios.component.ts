import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { paginationDTO } from '../../../dtos/paginationDTO';
import { AllEstudioDto, FilterEstudioDto } from '../../../dtos/estudioDto';
import { ResultadosService } from '../../../services/resultados.service';
import { ListEstudiosComponent } from "../list-estudios/list-estudios.component";
import { debounceTime } from 'rxjs';
import { SecurityService } from '../../../services/security.service';

@Component({
  selector: 'app-filtro-estudios',
  imports: [MatFormFieldModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, ListEstudiosComponent, MatDatepickerModule, MatPaginatorModule], 
  templateUrl: './filter-estudios.component.html',
  styleUrl: './filter-estudios.component.css'
})

export class FiltroEstudiosComponent implements OnInit {
    private location = inject(Location);
    private formbuilder = inject(FormBuilder);
    private activatedRoute = inject(ActivatedRoute);
    resultadoService = inject(ResultadosService);
    securityService = inject(SecurityService);

    paginationDto :paginationDTO = {pageNumber:1, recordsPage:10};
    totalRecords!:number;
    
    estudios !: AllEstudioDto[];

    form = this.formbuilder.group({
        nameEstudio: '',
        //from: new FormControl<Date|null>(null),
        //to: new FormControl<Date|null>(null),
    })

    ngOnInit(): void {
        this.readURLvalues();
        this.searchEstudios(this.form.value as FilterEstudioDto);

        this.form.valueChanges
        .pipe(debounceTime(400))
        .subscribe(values => {
            this.searchEstudios(values as FilterEstudioDto);
            this.whriteParameterSearchURL(values as FilterEstudioDto);
        });
    }

      isAuthorized(): boolean {
            return this.securityService.isAuthenticated();
      }

    searchEstudios(values: FilterEstudioDto){ //buscar peliculas 
        values.pageNumber = this.paginationDto.pageNumber;
        values.recordsPage = this.paginationDto.recordsPage;

        this.resultadoService.filter(values).subscribe(response => {
            this.estudios = response.body as AllEstudioDto[];
            const head = response.headers.get("records-total") as string;
			this.totalRecords = parseInt(head, 10);
            console.table(this.estudios);
        });
    }

    onPageChange(data: PageEvent){
		this.paginationDto = {pageNumber : data.pageIndex +1, recordsPage: data.pageSize};
        this.searchEstudios(this.form.value as FilterEstudioDto);
	}

    whriteParameterSearchURL(valores: FilterEstudioDto){
        let queryStrings = [];

        //video 64
        if(valores.nameEstudio){
            queryStrings.push(`nameEstudio=${encodeURIComponent(valores.nameEstudio)}`);
        }

        // if(valores.from){
        //     //queryStrings.push(`from=${valores.estudio.toISOString().split('T')[0]}`);
        // }

        this.location.replaceState('estudios', queryStrings.join('&'));
    }

    readURLvalues(){
        this.activatedRoute.queryParams.subscribe((params: any) => {
            let objectData : any = {};
            if(params.nameEstudio){
                objectData.nameEstudio = params.nameEstudio;
            }

            this.form.patchValue(objectData);
        });
    }

    limpiar(){
        this.form.patchValue({
            nameEstudio :'',
            //from : null, 
            //to: null
        });
    }
}