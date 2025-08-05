import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ListPacientesComponent } from '../list-pacientes/list-pacientes.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PacientesService } from '../../../services/pacientes.service';
import { AllPacienteDto } from '../../../dtos/pacienteDto';
import { paginationDTO } from '../../../dtos/paginationDTO';

@Component({
	selector: 'app-index',
	imports: [ListPacientesComponent, MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule],
	templateUrl: './index.component.html',
	styleUrl: './index.component.css'
})

export class IndexComponent {
	constructor() { 
		 this.loadRecords();
	}

	pacienteService = inject(PacientesService);
	pacientes !: AllPacienteDto[];
	columns =['NSS', 'Nombre','Edad', 'Género', 'Acciones'];
	
	paginationDto :paginationDTO = {pageNumber:1, recordsPage:10};
	totalRecords!:number;

	loadRecords(){
		this.pacienteService.getPage(this.paginationDto).subscribe((res : HttpResponse<AllPacienteDto[]>)=> {
			const head = res.headers.get("records-total") as string;
			this.totalRecords = parseInt(head, 10);
			this.pacientes = res.body as AllPacienteDto[];
			console.table(this.pacientes);
		});
	}

	onPageChange(data: PageEvent){
		this.paginationDto = {pageNumber : data.pageIndex +1, recordsPage: data.pageSize};
		this.loadRecords();
	}

	recordDelete(){
		this.loadRecords();
	}
}