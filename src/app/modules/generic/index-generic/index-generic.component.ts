import { Component, inject, Input } from '@angular/core';
import { paginationDTO } from '../../../dtos/paginationDTO';
import { SERVICE_CRUD_TOKEN } from '../../../share/suppliers';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ListGenericComponent } from "../list-generic/list-generic.component";
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-index-generic',
  imports: [RouterLink, MatPaginatorModule, ListGenericComponent, MatTableModule, SweetAlert2Module],
  templateUrl: './index-generic.component.html',
  styleUrl: './index-generic.component.css'
})
export class IndexGenericComponent<TDTO, TCreacionDTO>{
    constructor() { 
		 this.loadRecords();
	}

    @Input({required: true})
    title!: string;

    @Input({required: true})
    newRoute!: string;

    @Input({required: true})
    editRoute!: string;

    @Input()
    showColumns = [ 'id', 'nombre', 'acciones'];

    serviceCRUD = inject(SERVICE_CRUD_TOKEN) as any;

    paginationDto :paginationDTO = {pageNumber:1, recordsPage:10};
    totalRecords!:number;    
    items!: TDTO[];

	loadRecords(){
		this.serviceCRUD.getPage(this.paginationDto).subscribe((res : HttpResponse<TDTO[]>)=> {
			const head = res.headers.get("records-total") as string;
			this.totalRecords = parseInt(head, 10);
			this.items = res.body as TDTO[];
			console.table(this.items);
		});
	}

	onPageChange(data: PageEvent){
		this.paginationDto = {pageNumber : data.pageIndex +1, recordsPage: data.pageSize};
		this.loadRecords();
	}

	recordDelete(id: number){
        this.serviceCRUD.delete(id).subscribe(() => {
            console.log(`Record with id ${id} deleted`);      
            this.paginationDto.pageNumber = 1; // Reset to first page after deletion
            this.loadRecords();       
        });    
	}
}