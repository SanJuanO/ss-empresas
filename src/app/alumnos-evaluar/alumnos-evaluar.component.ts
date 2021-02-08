import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { Alumno, AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales, AlumnoProyecto, RespuestasOrganizacion } from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile } from "../models/documentosalumnos";

import { respuesta, Preguntas } from "../models/alumno";
import { OrganizationService } from '../services/organization.service';


import { Location } from '@angular/common';

import { CookieService } from "ngx-cookie-service";

import { Router, ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './alumnos-evaluar.component.html',
  styleUrls: ['./alumnos-evaluar.component.scss']
})
export class AlumnosevaluarComponent implements OnInit {
  activo = true;

  public universidades: Universidad[] = [];
  public carreras: Carrera[] = [];
  public facultades: Facultad[] = [];
  public documentos: DocumentosRequeridosAlumnos[] = [];
  public documentoscadena = new DocumentosAlumno();
  public documentosfile = new Documentosfile()

  public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
  public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
  public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];
  public idp = 0;
  public version = 0;
  public idAlumno: string;
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0);
  public preguntasevaluacion: [] = [];
  public evaluada = false;


  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", true, true, this.listaAreasUniversidadParticipadoNew, this.listaAreasUniversidadActualesNew, 0, "", "");
  public ocultar = "";
  constructor(private org: OrganizationService, private route: ActivatedRoute, public cookies: CookieService, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private _location: Location) { }



  ngOnInit(): void {
    this.idAlumno = this.cookies.get("idalumno");
    this.version = Number(this.cookies.get("version"));
    this.idp = Number(this.cookies.get("idasignado"));
    console.log(this.idp);
    console.log(this.version);
    this.obtenerpreguntas();

    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => {
    this.alumno = alumno;
      console.log(this.alumno);

    });
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    this.resetPosition();
  }
  obtenerpreguntas() {

    return this.alumnoService.getPreguntasEvaluacionAlumnoWhitAnswers(this.idp, this.version).subscribe((res: any) => {
      this.preguntasevaluacion = res;
      console.log(this.preguntasevaluacion);
      var i = 0;
      for (i = 0; i < this.preguntasevaluacion.length; i++) {
        if (this.preguntasevaluacion[i]['respuesta'] == null) {
          this.evaluada = true;
        }
      }

    });

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

  crearform() {

    var respuestas: RespuestasOrganizacion[] = [];
    var i = 0;
    var res: RespuestasOrganizacion;
    var valor: any;
    for (i = 0; i < this.preguntasevaluacion.length; i++) {

      if (this.preguntasevaluacion[i]["tipo"] == 'valor') {
        valor = $('input:radio[name=estrellas' + this.preguntasevaluacion[i]["id"] + ']:checked').val();
        if (valor == undefined) {
          alert("Faltan preguntas por contestar");
          return;
        }
      } else {
        valor = $('#estrellas' + this.preguntasevaluacion[i]["id"]).val();
      }

      res = new RespuestasOrganizacion(Number(this.idp), this.alumnoproyecto.idAlumno, Number(this.preguntasevaluacion[i]["id"]), true, valor, Number(this.version), "");
      respuestas.push(res);
    }

    console.log(respuestas);

    this.alumnoService.addRespuestasPreguntas(respuestas).subscribe((res) => {

      //this._location.back();
      if (res == true) {
        this.router.navigate(['/alumnosver/', this.idAlumno]);
      } else {
        alert("Error al agregar respuestas ");
      }
    }, error => {
      alert(error.error)
    })

  }


  resetPosition() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
