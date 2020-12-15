import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
import { count } from 'rxjs-compat/operator/count';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConstantPool } from '@angular/compiler';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { alumnosasignados } from "../models/alumno"
import { CookieService } from "ngx-cookie-service";
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class Alumnos implements OnInit {
  public empresa: Empresa[] = [  ];

  public alumnos: alumnosasignados[] = [  ];

  public empresacantidad: number;
  public empresaactiva: Empresa[] = [  ];
  public empresadesaciva: Empresa[] = [  ];
  public d: Date = new Date(); 
  public tipoModel = new Tipo(1);
  public convocatorias:Convocatoria [] = [ ];
  public convocatoriasalumnos:Convocatoria [] = [ ];
  public proyectos: Proyecto[] = [];
  public proyectosrechazados: Proyecto[] = [];
  public proyectosactivos: Proyecto[] = [];
  public proyectospendientes: Proyecto[] = [];


  public options = { year: 'numeric', month: 'long', day: 'numeric' };

  public convocatoriasf:Convocatoria [] = [ ];
  public convocatoriasalumnosf:Convocatoria [] = [ ];

  constructor(  public cookies: CookieService, private proyectoService: ProyectoService,
    private router: Router,public session: SessionService) { 
  
  }


  ngOnInit(): void {


    this.proyectos=[];
    this.proyectosactivos=[];
    this.proyectosrechazados=[];
    this.proyectospendientes=[];
     this.empresa=[];
     this.empresacantidad=0;
     this.empresaactiva = [  ];
     this.empresadesaciva = [  ];
  
     this.tipoModel = new Tipo(1);
     this.convocatorias = [ ];
     this.convocatoriasalumnos = [ ];
     this.convocatoriasf = [ ];
     this.convocatoriasalumnosf = [ ];
this.alumnoproyectos();



  }

  ngAfterViewInit() {
    Feather.replace();

  }



alumnoproyectos() {

  this.proyectoService.alumnosempresa(this.session.getToken()).subscribe((res: any[])=>{
    this.alumnos=res;
   
    console.log(res);
  
    
    })

}
mostrarmodal() {
  console.log("adentro");
  $('#warning-modal-preview').modal('show');




}
veralumno(idasignado,idalumno,idEstado,idProyecto,fechaInicioInstitucion){

  this.cookies.set("idasignado", idasignado);
  this.cookies.set("idalumno", idalumno);
  this.cookies.set("idEstado", idEstado);
  this.cookies.set("idProyectoa", idProyecto);
  this.cookies.set("fechaInicioInstitucion", fechaInicioInstitucion);

console.log(idasignado+" "+idalumno);
  this.router.navigate(['/alumnosver',idalumno]);

}

}
