import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { AlumnoService } from '../services/alumno.service';
import { UniversidadService } from '../services/universidad.service';
import { CarreraService } from '../services/carrera.service';
import { FacultadService } from '../services/facultad.service';
import { Universidad } from "../models/universidad";
import { Carrera } from "../models/carrera";
import { Facultad } from "../models/facultad";
import { Alumno, AreasVidaUniversitaria, AlumnosAreasVidaUniversitariaParticipado, AlumnosAreasVidaUniversitariaActuales,AlumnoProyecto } from '../models/alumno';
import { DocumentosRequeridosAlumnos, DocumentosAlumno, Documentosfile } from "../models/documentosalumnos";

import { respuesta } from "../models/alumno";
import { OrganizationService } from '../services/organization.service';


import {Location} from '@angular/common';

import { CookieService } from "ngx-cookie-service";

import { Router,ActivatedRoute } from '@angular/router';
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

public uno="siempre";
public dos="siempre";
public tres="siempre";
public cuatro="siempre";
public cinco="siempre";
public seis="siempre";
public siete="siempre";
public ocho="siempre";
public listaAreasUniversidadParticipado: AlumnosAreasVidaUniversitariaParticipado[] = [];
public listaAreasUniversidadActuales: AlumnosAreasVidaUniversitariaActuales[] = [];
public listaAreasUniversidadParticipadoNew: AlumnosAreasVidaUniversitariaParticipado[] = [];
public listaAreasUniversidadActualesNew: AlumnosAreasVidaUniversitariaActuales[] = [];

  public idAlumno: string;
  public alumnoproyecto: AlumnoProyecto = new AlumnoProyecto("", "", "", 0, 0, 0);
  public respuestas: respuesta = new respuesta(1,1,"","");
  public respuestas2: respuesta = new respuesta(1,1,"","");
  public respuestas3: respuesta = new respuesta(1,1,"","");
  public respuestas4: respuesta = new respuesta(1,1,"","");
  public respuestas5: respuesta = new respuesta(1,1,"","");
  public respuestas6: respuesta = new respuesta(1,1,"","");
  public respuestas7: respuesta = new respuesta(1,1,"","");
  public respuestas8: respuesta = new respuesta(1,1,"","");
  public respuestas9: respuesta = new respuesta(1,1,"","");
  public respuestas10: respuesta = new respuesta(1,1,"","");
  public respuestas11: respuesta = new respuesta(1,1,"","");
  public respuestas12: respuesta = new respuesta(1,1,"","");
  public respuestas13: respuesta = new respuesta(1,1,"","");
  public alumno: Alumno = new Alumno("", "", "", "", 0, 0, 0, "", "", "", 0, 0, "", "", 0, "", "", "", "", "", "", "", "", "", 0, "", true,true, this.listaAreasUniversidadParticipadoNew, this.listaAreasUniversidadActualesNew,0,"","");

  constructor(private org: OrganizationService,private route: ActivatedRoute, public cookies: CookieService,   private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private universidadService: UniversidadService, private alumnoService: AlumnoService, private _location: Location) { }



  ngOnInit(): void {
    this.idAlumno = this.cookies.get("idalumno");
    this.alumnoService.getAlumno(this.idAlumno).subscribe((alumno: Alumno) => this.alumno = alumno);
    this.obtenerUniversidades();
    this.obtenerCarreras();
    this.obtenerFacultades();
    this.obtenerproyectoalumno();
    this.obtenerdocumentosRequeridos();
    console.log(this.alumno);
    this.onchage();
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

  abrirsubir(id) {

    console.log("dfdsfdsfds" + id);
    $('#abrirsubir-' + id).modal('show');

  }
  abrirsubirr() {


    $('#abrirsubirr').modal('show');

  }

  subirarchivo() {
    console.log("subir");

    this.documentosfile.file = this.documentoscadena.file;
    console.log(this.documentosfile);

    this.alumnoService.subirdocumentos(this.documentosfile).subscribe((res: any) => {
      console.log(res);

      this.documentoscadena.ruta = res.ruta;

      this.subirarchivoconcadena();

    }, error => {
      alert(error.error)
    })


  }

  subirarchivoconcadena() {

    this.alumnoService.subirdocumentoscadena(this.documentoscadena).subscribe((res: any) => {
      console.log(res);


    }, error => {
      alert(error.error)
    })


  }
  subeArchivoreporte() {


  
  }

  subeArchivo() {

    var selecttedFile = ($("#Imagen"))[0].files[0];
    var dataString = new FormData();
    dataString.append("file", selecttedFile);

    $.ajax({
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:4200,https://serviciosocial.gesdesapplication.com/api/DocumentosOrganizaciones/UploadFile',https://localhost:4200",
        "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
        "Access-Control-Allow-Methods": " POST",
        "Allow": " POST"
      },
      url: "https://serviciosocial.gesdesapplication.com/api/DocumentosAlumnos/UploadFile",
      type: "POST",
      data: dataString,
      contentType: false,
      processData: false,
      async: true,

      success: function (data) {
        if (parseInt(data.resultado)) {

          alert("archivo agregado " + data);
        }
      },
      error: function (data) {
        alert("Error al agregado archivo" + data);
      }

    });
  }
crearform(){
  var model1=this.respuestas;
  var model2=this.respuestas2;
  var model3=this.respuestas3;
  var model4=this.respuestas4;
  var model5=this.respuestas5;
  var model6=this.respuestas6;
  var model7=this.respuestas7;
  var model8=this.respuestas8;
  var model9=this.respuestas9;
  var model10=this.respuestas10;
  var model11=this.respuestas11;
  var model12=this.respuestas12;
  var model13=this.respuestas13;


  model1.idPregunta=1;
  model1.idAlumno=Number(this.idAlumno);
  model1.respuesta=this.uno;
  model1.pregunta="1.- El alumno mostro compromiso en tiempo y forma con las actividades y responsabilidades encomendadas.";

  model2.idPregunta=2;
  model2.idAlumno=Number(this.idAlumno);
  model2.respuesta=this.dos;
  model2.pregunta="2.- El alumno estableció relaciones interpersonales que favorecieron el trabajo en equipo y el desarrollo de su liderazgo de servicio, de una forma empática y respetuosa en diferentes ambientes sociales y culturales, comprometiéndose en el desarrollo social sustentable y eficiente de su entorno.";

  model3.idPregunta=3;
  model3.idAlumno=Number(this.idAlumno);
  model3.respuesta=this.tres;
  model3.pregunta="3.- El alumno mostro habilidad para hacer frente al cambio y buscar alternativas de acción.";

  model4.idPregunta=4;
  model4.idAlumno=Number(this.idAlumno);
  model4.respuesta=this.cuatro;
  model4.pregunta="4.- El alumno resolvió de forma satisfactoria las actividades desarrolladas, aun ante circunstancias totalmente adversas.";

  model5.idPregunta=5;
  model5.idAlumno=Number(this.idAlumno);
  model5.respuesta=this.cinco;
  model5.pregunta="5.- El alumno mostro interés y entusiasmo en el trabajo, reaccionó constructivamente a la retroalimentación y mantuvo una actitud positiva.";

  model6.idPregunta=6;
  model6.idAlumno=Number(this.idAlumno);
  model6.respuesta=this.seis;
  model6.pregunta="6.- El alumno asistió de manera regular y puntual a sus labores.";

  model7.idPregunta=7;
  model7.idAlumno=Number(this.idAlumno);
  model7.respuesta=this.siete;
  model7.pregunta="7.- El alumno mostro capacidad para generar nuevas ideas.";

  model8.idPregunta=8;
  model8.idAlumno=Number(this.idAlumno);
  model8.respuesta=this.ocho;
  model8.pregunta="8.- El alumno mostro apego en actividades de interés social.";

  model9.idPregunta=9;
  model9.idAlumno=Number(this.idAlumno);
  model9.respuesta=$('#nueve').val();
  model9.pregunta="9.- ¿Cuál fue tu experiencia con el alumno durante su servicio social en tu Institución";

  model10.idPregunta=10;
  model10.idAlumno=Number(this.idAlumno);
  model10.respuesta=$('#diez').val();
  model10.pregunta="10.- ¿Te gustaría seguir recibiendo alumnos de la Universidad Anáhuac para la prestación del servicio social en tu Institución?";

  model11.idPregunta=11;
  model11.idAlumno=Number(this.idAlumno);
  model11.respuesta=$('#once').val();
  model11.pregunta="11.- ¿Recomendarías el Programa de Servicio Social de la Universidad Anáhuac a otras Instituciones? ";

  model12.idPregunta=12;
  model12.idAlumno=Number(this.idAlumno);
  model12.respuesta=$('#doce').val();
  model12.pregunta="12.- Comentarios generales";

  model13.idPregunta=13;
  model13.idAlumno=Number(this.idAlumno);
  model13.respuesta=$('#trece').val();
  model13.pregunta="13.- ¿Cuál fue tu experiencia con el alumno durante su servicio social en tu Institución?  ";
var arreglo=[model1,model2,model3,model4,model5,model6,model7,model8,model9,model10,model11,model12,model13];

console.log(arreglo);

this.org.respuestapreguntas(arreglo).subscribe(() => {

   this._location.back();


 })

}
onchage(){
  // the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
    if($box.attr("name")=="uno[1][]"){
    this.uno=  $box.val();
    console.log(this.uno);
    }
    if($box.attr("name")=="dos[1][]"){
      this.uno=  $box.val();
      console.log(this.uno);
      }
      if($box.attr("name")=="tres[1][]"){
        this.uno=  $box.val();
        console.log(this.uno);
        }
        if($box.attr("name")=="cuatro[1][]"){
          this.uno=  $box.val();
          console.log(this.uno);
          }
          if($box.attr("name")=="cinco[1][]"){
            this.uno=  $box.val();
            console.log(this.uno);
            }
            if($box.attr("name")=="seis[1][]"){
              this.uno=  $box.val();
              console.log(this.uno);
              }
              if($box.attr("name")=="siete[1][]"){
                this.uno=  $box.val();
                console.log(this.uno);
                }
                if($box.attr("name")=="ocho[1][]"){
                  this.uno=  $box.val();
                  console.log(this.uno);
                  }

  } else {
    $box.prop("checked", false);
  }


});

}
check(){
  console.log($('#uno[1][]').val());
}

}
