import { Routes } from '@angular/router';
import { IndexComponent } from './modules/pacientes/index/index.component';
import { isAdminGuard } from './share/guards/is-admin.guard';
import { LoginComponent } from './modules/security/login/login.component';
import { AddComponent } from './modules/pacientes/add-pacientes/add-pacientes.component';
import { FiltroEstudiosComponent } from './modules/estudios/filter-estudios/filter-estudios.component';
import { EditPacientesComponent } from './modules/pacientes/edit-pacientes/edit-pacientes.component';
import { RegisterComponent } from './modules/security/register/register.component';
import { UserIndexComponent } from './modules/security/user-index/user-index.component';

export const routes: Routes = [
    {path:'pacientes', component:IndexComponent, canActivate: [isAdminGuard]},
    {path:'pacientes/add', component:AddComponent, canActivate: [isAdminGuard]},
    {path:'pacientes/edit/:id', component:EditPacientesComponent, canActivate: [isAdminGuard]},

    {path:'users', component:UserIndexComponent},

    {path:'estudios', component:FiltroEstudiosComponent, canActivate: [isAdminGuard]},
    
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path: '**', component:IndexComponent}
];