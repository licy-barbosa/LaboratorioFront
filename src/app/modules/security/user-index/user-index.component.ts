import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { paginationDTO } from '../../../dtos/paginationDTO';
import { userDto } from '../../../dtos/securityDto';
import { SecurityService } from '../../../services/security.service';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-index',
  imports: [ MatIconModule, MatButtonModule, RouterLink, MatPaginatorModule,  MatTableModule, SweetAlert2Module],
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent {
	constructor() { 
		this.loadRecords();
	}

    securityService = inject(SecurityService);
    showColumns =['email', 'Acciones'];
    users !: userDto[];
    paginationDto :paginationDTO = {pageNumber:1, recordsPage:10};
    totalRecords!:number;

    loadRecords(){
        this.securityService.getPage(this.paginationDto).subscribe(res=> {
			const head = res.headers.get("records-total") as string;
			this.totalRecords = parseInt(head, 10);
			this.users = res.body as userDto[];
			console.table(this.users);
		});
    }


    onPageChange(data: PageEvent){
		this.paginationDto = {pageNumber : data.pageIndex +1, recordsPage: data.pageSize};
		this.loadRecords();
	}

    addAdmin(email: string){
        this.securityService.addClaimAdmin(email).subscribe(() => 
            Swal.fire('Listo', 'El usuario ahora es administrador', 'success').then(() => this.loadRecords())
        );
    }

    removeAdmin(email: string){
        this.securityService.removeClaimAdmin(email).subscribe(() => 
            Swal.fire('Listo', 'El usuario ya no es administrador', 'success').then(() => this.loadRecords())
        );
    }
}