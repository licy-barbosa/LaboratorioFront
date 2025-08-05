import { Routes } from '@angular/router';
import { IndexComponent } from './modules/pacientes/index/index.component';
import { AddComponent } from './modules/pacientes/add-pacientes/add-pacientes.component';
import { FiltroEstudiosComponent } from './modules/estudios/filter-estudios/filter-estudios.component';
import { EditPacientesComponent } from './modules/pacientes/edit-pacientes/edit-pacientes.component';

export const routes: Routes = [
    {path:'pacientes', component:IndexComponent},
    {path:'pacientes/add', component:AddComponent},
    {path:'pacientes/edit/:id', component:EditPacientesComponent},
    {path:'estudios', component:FiltroEstudiosComponent},
    {path: '**', component:IndexComponent}
];