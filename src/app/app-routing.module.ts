
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectosAddComponent } from './proyectos/proyectos-add/proyectos-add.component';
import { ProyectosEditComponent } from './proyectos/proyectos-edit/proyectos-edit.component';
import { ProyectosVerComponent } from './proyectos/proyectos-ver/proyectos-ver.component';
import { ProyectosActividadesAddComponent } from './proyectos/proyectos-actividades-add/proyectos-actividades-add.component';
import { ProyectosAlumnosAddComponent } from './proyectos/proyectos-alumnos-add/proyectos-alumnos-add.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { LoginComponent } from './login/login.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';

import { EmpresasverComponent } from './empresas/empresas-ver/empresas-ver.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AlumnosverComponent } from './alumnos-ver/alumnos-ver.component';
import { AlumnosevaluarComponent } from './alumnos-evaluar/alumnos-evaluar.component';
EmpresasverComponent
const routes: Routes = [
{ path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'proyectos/add', component: ProyectosAddComponent },
  { path: 'proyectos/edit/:id', component: ProyectosEditComponent },
  { path: 'proyectos/ver/:id', component: ProyectosVerComponent },
  { path: 'proyectos/actividades/:id', component: ProyectosActividadesAddComponent },
  { path: 'proyectos/alumnos/:id', component: ProyectosAlumnosAddComponent },
  { path:'convocatorias',component:ConvocatoriasComponent},
  { path:'perfil',component:PerfilComponent},
  { path:'alumnosver/:id',component:AlumnosverComponent},
  { path:'alumnosevaluar/:id',component:AlumnosevaluarComponent},

  {path:'empresas/add',component:EmpresasAddComponent},
  {path:'empresas/ver/:id',component:EmpresasverComponent},
  {path:'empresas/Edit/:id',component:EmpresasEditComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

