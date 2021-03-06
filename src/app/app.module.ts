import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProyectosAddComponent } from './proyectos/proyectos-add/proyectos-add.component';
import { ProyectosEditComponent } from './proyectos/proyectos-edit/proyectos-edit.component';
import { ProyectosVerComponent } from './proyectos/proyectos-ver/proyectos-ver.component';
import { ProyectosActividadesAddComponent } from './proyectos/proyectos-actividades-add/proyectos-actividades-add.component';
import { ProyectosAlumnosAddComponent  } from './proyectos/proyectos-alumnos-add/proyectos-alumnos-add.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpresasAddComponent } from './empresas/empresas-add/empresas-add.component';
import { EmpresasEditComponent } from './empresas/empresas-edit/empresas-edit.component';
import { EmpresasverComponent } from './empresas/empresas-ver/empresas-ver.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AlumnosverComponent } from './alumnos-ver/alumnos-ver.component';
import { AlumnosevaluarComponent } from './alumnos-evaluar/alumnos-evaluar.component';
import { passComponent } from './pass/pass.component';
import { Alumnos } from './alumnos/alumnos.component';
import { RecaptchaModule } from "ng-recaptcha";
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';


import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';


import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    passComponent,
    Alumnos,
    
    AlumnosevaluarComponent,
    PerfilComponent,
    ProyectosAddComponent,
    ProyectosEditComponent,
    ProyectosVerComponent,
    ProyectosActividadesAddComponent,
    ProyectosAlumnosAddComponent,
    ConvocatoriasComponent,
    DashboardComponent,
    EmpresasAddComponent,
    EmpresasEditComponent,
    EmpresasverComponent,
    AlumnosverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    RecaptchaModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,NgxMaterialTimepickerModule
  ],
  providers: [CookieService,MatDatepickerModule,MatNativeDateModule,NgxMaterialTimepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

