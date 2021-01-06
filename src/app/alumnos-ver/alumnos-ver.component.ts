import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { ProyectoService } from '../services/proyecto.service';

import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { Proyecto } from "../models/proyectos";

import { Alumno,AlumnoProyecto, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales,alumnohoras,alumnosactividades} from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile, DocumentosSubidosRequeridos } from "../models/documentosalumnos"
import { CookieService } from "ngx-cookie-service";
import { OrganizationService } from '../services/organization.service';
import { Estadosalumnos,Estadosalumnoscambio } from "../models/estadosalumnoss";
import { SessionService } from '../services/session.service';

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
  public mensajeh="Advertencia estas por agregarle horas al alumno ¿Estas seguro?";

  public alumnosactividades: alumnosactividades[] = [];
  public estadosalumnos: Estadosalumnos[] = [];
  public estadoalumnocambio: Estadosalumnoscambio = new Estadosalumnoscambio();
  public estadosalumnoslimitado: Estadosalumnos[] = [];
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
public idProyecto:string;
public Estado:string;
public validar=false;
public nohayfecha:boolean=true;
public plazasAutorizadas=0;
public plazasDisponibles=0;
public versiona = new Array(); 

  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public proyectoModel = new Proyecto(0,"", "", "", 0, "", "", "", "", "", "", "", "", 0, "", "", "", "", false, false, false, false, false, false, false, "", "", "", 0, "", 0, "", 0, "", 0, "", "", "", true, undefined,undefined);

  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0);
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", true, true, this.listaAreasUniversidadParticipadoNew, this.listaAreasUniversidadActualesNew, 0, "", "");
  public DocumentosSubidos: DocumentosSubidosRequeridos[];
  public idDocumento: string = "";
  public fileToUpload: File = null;
  public horastotales: number = 0;
  public noHoras: number = 0;

  public actividades: number = 0;
public fechaincr:string;
  constructor(private route: ActivatedRoute, private organizacionService: OrganizationService,
    public cookies: CookieService,  private router: Router, private facultadService: FacultadService,
     private carreraService: CarreraService, private universidadService: UniversidadService, 
     private alumnoService: AlumnoService, private _location: Location ,public session: SessionService,
     public proyect:ProyectoService) { }



  ngOnInit(): void {
    this.idProyecto=this.cookies.get("idProyectoa");
    this.cookies.set("version","0");

    this.idasignado=this.cookies.get("idasignado");
    this.idEstado =Number(this.cookies.get("idEstado"));
    this.idAlumno = this.cookies.get("idalumno");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) =>{ this.alumno = alumno;
    });
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    this.obtenerdocumentosRequeridos();
    this.obtenerdocumentosSubidosConRequeridos();
    this.horas();
    this.obtenerproyecto();

    this.obtenerrespuesta();

    this.obteneractividades();
  }

  obtenerUniversidades() {

    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }
  obtenerproyectoalumno() {

    return this.alumnoService.getProyectoAlumno(this.idAlumno).subscribe((alumnoproyecto: AlumnoProyecto) => {this.alumnoproyecto = alumnoproyecto;
      console.log(this.alumnoproyecto);

this.noHoras=this.alumnoproyecto['noHoras'];
console.log(this.noHoras);
var fe =this.alumnoproyecto['fechaInicioInstitucion'];
if(fe!=null){
var options = { year: 'numeric', month: 'long', day: 'numeric' };

var Fecha = new Date((fe.toString()));
this.fechaincr=Fecha.toLocaleDateString("es-ES", options);
this.nohayfecha=false;
}
    });

  }
  obtenerproyecto() {

    return this.proyect.getProyecto(this.idProyecto).subscribe((proyectoModel: Proyecto) =>{this.proyectoModel = proyectoModel;
  
    this.plazasDisponibles=this.proyectoModel.plazasDisponibles;
    this.obtenerestadoalumnos();

  });

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

      });
  }
  abrirsubir(id) {

    this.idDocumento = id;
    $('#abrirsubir-' + id).modal('show');

  }

  abrirmodalhoras(){
this.validar==false;
    $('#horasmodal').modal('show');


  }
  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  subeArchivo() {

    
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
      console.log(res);

      for(var i=0;i<res.length;i++){

        var version=res[i]['version'];
        if(i!=0){
        if(!this.versiona.includes(version)){
          this.versiona.push(version);

        }
      }else{
        this.versiona.push(version);


      }

      }
      console.log(this.versiona);
    });
  }

  regresar() {

    this._location.back();

  }

  reportedehoras() {
     this.mensajeh="Advertencia estas por agregarle horas al alumno ¿Estas seguro?";

document.getElementById("advertencia").style.display = "block";
if(this.validar){
  document.getElementById("advertencia").style.display = "display";

var nohoras=$('#nohoras').val();
console.log(nohoras);
if(Number(nohoras)>80){
  
  document.getElementById("advertencia").style.display = "block";
   this.mensajeh="Máximo 80 horas";

}else{
     this.alumnoService.agregarhoras(this.idasignado,nohoras).subscribe((res: any) => {
 location.reload();

     });

}


  }
  this.validar=true;
  }
  

  horas() {

        this.alumnoService.horas(this.idasignado).subscribe((res: any) => {
this.horasalumno=res;
          var a=0;
          var options = { year: 'numeric', month: 'long', day: 'numeric' };

        for(var i=0;i<this.horasalumno.length;i++){
          var Fecha = new Date((this.horasalumno[i]['fechaCreacion'].toString()));
          this.horasalumno[i]['fechaCreacion']=Fecha.toLocaleDateString("es-ES", options);

a+=this.horasalumno[i]['noHoras'];



        }

        this.horastotales=a;
              });
}

obteneractividades() {

  this.alumnoService.activadades(this.idasignado).subscribe((res: any) => {
    this.alumnosactividades=res;
    console.log(res);

    var options = { year: 'numeric', month: 'long', day: 'numeric' };

    for(var i=0;i<this.alumnosactividades.length;i++){
      var Fecha = new Date((this.alumnosactividades[i]['fechaCreacion'].toString()));
      this.alumnosactividades[i]['fechaCreacion']=Fecha.toLocaleDateString("es-ES", options);



    }
 
    

  });
}

mostraractualizarestado(id){
  var idact=Number(id);

      $('#act-'+idact).modal('show');
  
}
mostrarreporte(id){
this.cookies.set("version",id);

 this.router.navigate(['/alumnosevaluar', this.idAlumno]);

  
}
actualizarestado(){

      $('#mostareditaralumno').modal('show');
  
  
    }
    obtenerestadoalumnos() {
      return this.organizacionService
        .getestadosalumnos()
        .subscribe((estadosalumnos: Estadosalumnos[]) => {this.estadosalumnos = estadosalumnos;
  
          for(var i=0;i<this.estadosalumnos.length;i++){

            if(this.idEstado==this.estadosalumnos[i]['id']){
              this.Estado=this.estadosalumnos[i]['estado'];
            }

            if(this.plazasDisponibles==0 ){

if(i==6 ){
              this.estadosalumnoslimitado.push(this.estadosalumnos[6]);}
            }else{
            if(i<3 || i==6 ){
              this.estadosalumnoslimitado.push(this.estadosalumnos[i]);
  
            }
          }
        }
        });
  
        
    }
    

cambiarestado(id){
  this.alumnoService.validaractivadades(id).subscribe((res: any) => {
            
    location.reload();


  });
}

cambiarestatusalumno(){


  this.estadoalumnocambio.idProyecto = Number(this.idProyecto);
  this.estadoalumnocambio.idAlumno = Number(this.idAlumno);   

 
  this.estadoalumnocambio.idEstado =Number(this.idEstado);


this.estadoalumnocambio.observacions=$('#observacionescambio').val();


   this.organizacionService.updateestadoalumno(this.estadoalumnocambio).subscribe((res) => {

    location.reload();


   }, error => {
  alert(error.error)
  })

}

actualizarfecha(){

      $('#mostrarfecha').modal('show');
  
  
    }

cambiarfecha(){


  var fecharegistro= $("#fechadeinicio").val();


   this.organizacionService.actualizarfechaalumno(fecharegistro,this.idAlumno).subscribe((res) => {
    location.reload();

  })

}

descargarCartaEnded(archivo) {

  let pdfWindow = window.open("")
  pdfWindow.document.write(
    "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
    encodeURI(archivo) + "'></iframe>"
  )
}



}
