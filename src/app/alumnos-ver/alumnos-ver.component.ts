import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { Alumno,AlumnoProyecto, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales,alumnohoras,alumnosactividades} from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile, DocumentosSubidosRequeridos } from "../models/documentosalumnos"
import { CookieService } from "ngx-cookie-service";

import {Location} from '@angular/common';


import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './alumnos-ver.component.html',
  styleUrls: ['./alumnos-ver.component.scss']
})
export class AlumnosverComponent implements OnInit {
  activo = true;
  
  public alumnosactividades: alumnosactividades[] = [];

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public documentos: DocumentosRequeridosAlumnos[] = [];
  public documentoscadena = new DocumentosAlumno();
  public documentosfile = new Documentosfile()
  public idAlumno: string;
  public respuestas: string=""  ;
  public horasalumno: alumnohoras[] = [];
  public idasignado: string;
public idEstado:number;
  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0);
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", true, true, this.listaAreasUniversidadParticipadoNew, this.listaAreasUniversidadActualesNew, 0, "", "");
  public DocumentosSubidos: DocumentosSubidosRequeridos[];
  public idDocumento: string = "";
  public fileToUpload: File = null;
  public horastotales: number = 0;
  public actividades: number = 0;

  constructor(private route: ActivatedRoute,public cookies: CookieService,  private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private _location: Location) { }



  ngOnInit(): void {
   
    this.idasignado=this.cookies.get("idasignado");
    this.idEstado =Number(this.cookies.get("idEstado"));
console.log(this.idEstado);
    this.idAlumno = this.cookies.get("idalumno");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    this.obtenerdocumentosRequeridos();
    this.obtenerdocumentosSubidosConRequeridos();
    this.horas();
    this.obtenerrespuesta();

    this.obteneractividades();
    console.log(this.alumno);
  }

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerproyectoalumno() {

    return this.alumnoService.getProyectoAlumno(this.idAlumno).subscribe((alumnoproyecto: AlumnoProyecto) => this.alumnoproyecto = alumnoproyecto);

  }

  obtenerCarreras() {

    return this.carreraService
      .getCarreras()
      .subscribe((carreras: Carrera[]) => this.carreras = carreras);

  }

  obtenerFacultades() {
     
    return this.facultadService
      .getFacultades()
      .subscribe((facultades: Facultad[]) => this.facultades = facultades);

  }

  obtenerdocumentosRequeridos() {
    return this.alumnoService
      .getdocumentosRequeridos()
      .subscribe((documentos: DocumentosRequeridosAlumnos[]) => this.documentos = documentos);
  }

  //TODO SERGIO
  obtenerdocumentosSubidosConRequeridos() {
    return this.alumnoService
      .obtenerDocumentosSubidosConRequeridos(this.idAlumno)
      .subscribe((documentosS: DocumentosSubidosRequeridos[]) => {
        this.DocumentosSubidos = documentosS;
        //console.log("iddocumentos subidos "+this.idDocumentosSubidos);
        console.log("requeridos " + this.DocumentosSubidos);

      });
  }
  abrirsubir(id) {

    console.log("dfdsfdsfds" + id + " alumno " + this.idAlumno);
    this.idDocumento = id;
    $('#abrirsubir-' + id).modal('show');

  }

  abrirmodalhoras(){
    $('#horasmodal').modal('show');


  }
  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  subeArchivo() {
    console.log("iddocumento" + this.idDocumento + " alumno " + this.idAlumno);

    
    this.alumnoService.postFileAlumno(this.fileToUpload, this.idDocumento, this.idAlumno).subscribe(data => {
      if (data.resultado == 1) {
        $('#abrirsubir-' + this.idDocumento).modal('hide');
        $('#success-modal-preview-file').modal('show');
        location.reload();
      }
    }, error => {
      console.log(error);
    });
  }
  //TODO SERGIO
  obtenerrespuesta() {

    this.alumnoService.getrespuesta(this.idAlumno).subscribe((res: any) => {
this.respuestas=res[0]['fechaCreacion'];
    });
  }

  regresar() {

    this._location.back();

  }

  reportedehoras() {

var nohoras=$('#nohoras').val();
console.log(nohoras);
    this.alumnoService.agregarhoras(this.idasignado,nohoras).subscribe((res: any) => {
location.reload();

    });
  }

  horas() {

        this.alumnoService.horas(this.idasignado).subscribe((res: any) => {
this.horasalumno=res;
console.log(res);
          var a=0;
        for(var i=0;i<this.horasalumno.length;i++){
a+=this.horasalumno[i]['noHoras'];
        }

        console.log(a);
        this.horastotales=a;
              });
}

obteneractividades() {

  this.alumnoService.activadades(this.idasignado).subscribe((res: any) => {
    this.actividades=res;
    console.log(res);
            
    

  });
}

mostraractualizarestado(id){
  var idact=Number(id);
  console.log("dfdsfdsfds"+ idact);

      $('#act-'+idact).modal('show');
  
}
cambiarestado(id){
  console.log(id);
  this.alumnoService.validaractivadades(id).subscribe((res: any) => {
    console.log(res);
            
    location.reload();


  });
}
}
