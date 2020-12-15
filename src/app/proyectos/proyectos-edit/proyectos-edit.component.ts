import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto, EstadosProyectosModel, ProyectosCompetencias, ProyectosCarreras, ODS, PeriodosModel } from "../../models/proyectos" ;
import { Empresa } from "../../models/empresa";
import { OrganizationService } from '../../services/organization.service';
import { Universidad } from "../../models/universidad";
import { UniversidadService } from '../../services/universidad.service';
import { ConvocatoriaServices } from '../../services/convocatoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../../services/session.service';

declare var $: any;
let now = new Date();

@Component({
  selector: 'app-proyectos-add',
  templateUrl: './proyectos-edit.component.html',
  styleUrls: ['./proyectos-edit.component.scss']
})
export class ProyectosEditComponent implements OnInit {
  public idobtenido: number;
  public fechaMinima: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 90);
  public idOrganizacion="";
  public Organizacion="";
  public listaProyectosCompetencias = new Array<ProyectosCompetencias>();
  public listaProyectosCarreras = new Array<ProyectosCarreras>();
  
  public listaProyectosCarrerasA = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasB = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasC = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasD = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasE = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasF = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasG = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasH = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasI = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasJ = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasK = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasL = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasM = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasN = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasNN = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasO = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasP = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasQ = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasR = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasS = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasT = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasU = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasV = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasX = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasW = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasY = new Array<ProyectosCarreras>();
  public listaProyectosCarrerasZ = new Array<ProyectosCarreras>();
  public proyectoModel = new Proyecto("", "", "", 0, "", "", "", "", "", "", "", "", 0, "", "", "", "", false, false, false, false, false, false, false, "", "", "", 0, "", 0, "", 0, "", 0, "", "", "", true, 0,  this.listaProyectosCompetencias, this.listaProyectosCarreras);

  public validar = false;
  public organizaciones: Empresa[] = [];
  public proyectosCompetencias: ProyectosCompetencias[] = [];
  public proyectosCarreras: ProyectosCarreras[] = [];
  public ods: ODS[] = [];
  public universidades: Universidad[] = [];
  public periodos: PeriodosModel[] = [];
  public estadosProyectos: EstadosProyectosModel[] = [];
  public mensajevalidacion = "";
  public idsCarreras :any
  public idsCompetencias:any
  public periodo="";

  public idPeriodorecibido="";
  constructor(private proyectoService: ProyectoService,
    private organizacionService: OrganizationService,
    private universidadService: UniversidadService,
    private convocatoriaService: ConvocatoriaServices,
    private router: Router, private activatedRoute: ActivatedRoute,
    private _location: Location,
    public session: SessionService) {
      
  }

  ngOnInit(): void {
    this.idPeriodorecibido = <any>(this.activatedRoute.snapshot.paramMap.get("id"));
    
    this.idOrganizacion= this.session.getToken();
    this.Organizacion= this.session.getnombre();
    this.idobtenido = <number><any>(this.activatedRoute.snapshot.paramMap.get("id"));
    //this.proyectoService.getProyecto(this.idobtenido).subscribe((proyectoModel: Proyecto) => this.proyectoModel = proyectoModel);
    this.getProyecto(this.idobtenido);
    this.obtenerOrganizaciones();
    this.obtenerCompetencias();
    this.obtenerCarreras();
    this.obtenerODS();
    this.obtenerUniversidades();
    this.obtenerEstadosProyectos();
    this.obtenerPeriodos();

    console.log(this.proyectoModel);
    console.log(this.idsCarreras);
  }
  
  ngAfterViewInit() {
    Feather.replace();
  }
  
  getProyecto(id) {

    
    this.proyectoService.getProyecto(id).subscribe((res: any[]) => {
      
      this.proyectoModel = <Proyecto><any>res;
      this.listaProyectosCarreras = res['carrerasList'];
      this.listaProyectosCompetencias = res['competenciasList'];

      //console.log(this.apoyos);
      //console.log(this.listaLineasTrabajo);

      this.idsCarreras = this.listaProyectosCarreras.map(({ idCarrera }) => idCarrera);
      this.idsCompetencias = this.listaProyectosCompetencias.map(({ idCompetencia }) => idCompetencia);
      //console.log(this.idApoyo);
      //console.log(this.idLineasTrabajo);
      
      
    })
  }
  obtenerOrganizaciones() {
    return this.organizacionService
      .getAll()
      .subscribe((organizaciones: Empresa[]) => this.organizaciones = organizaciones);
  }
  obtenerCompetencias() {
    return this.proyectoService
      .getCompetencias()
      .subscribe((competencias: ProyectosCompetencias[]) => this.listaProyectosCompetencias = competencias);
  }
  obtenerCarreras() {
    return this.proyectoService
      .getCarreras()
      .subscribe((carreras: ProyectosCarreras[]) => { 
        
        
        this.listaProyectosCarreras = carreras; 

      for(var i=0;i<carreras.length;i++){

        if(carreras[i]['carrera'].substr(0,1)=="A"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasA.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="B"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasB.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="C"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasC.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="D"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasD.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="E"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasE.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="F"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasF.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="G"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasG.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="H"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasH.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="I"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasI.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="J"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasJ.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="K"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasK.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="L"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasL.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="M"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasM.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="N"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasN.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="Ñ"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasNN.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="O"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasO.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="P"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasP.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="Q"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasQ.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="R"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasR.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="S"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasS.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="T"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasT.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="U"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasU.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="V"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasV.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="W"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasW.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="X"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasX.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="Y"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasY.push(carreras[i]);
        }
        if(carreras[i]['carrera'].substr(0,1)=="Z"){

          console.log(carreras[i]['carrera'].substr(0,1));
this.listaProyectosCarrerasZ.push(carreras[i]);
        }
      }
  


      });
  }
  obtenerODS() {
    return this.proyectoService
      .getODS()
      .subscribe((odss: ODS[]) => { this.ods = odss; });
  }

  obtenerUniversidades() {
    return this.universidadService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);
  }
  obtenerEstadosProyectos() {
    return this.proyectoService
      .getEstadosProyectos()
      .subscribe((estadosProyectos: EstadosProyectosModel[]) => this.estadosProyectos = estadosProyectos);
  }

  toggleCompetencias(checked, id) {
    //console.log(checked);
    var valor = { "idProyecto": 0, "idCompetencia": id, "activo": true };
    if (checked) {
      if (this.proyectoModel.competenciasList.length < 5) {
        this.proyectoModel.competenciasList.push(valor);
      } else {
        $("#co" + id).prop("checked", false);
        this.mensajevalidacion = "Solo permite seleccionar como máximo 5 competencias "
        $('#validacion').modal('show');
      }
    }
    else {
      this.proyectoModel.competenciasList = this.proyectoModel.competenciasList.filter(item => item.idCompetencia !== id);
    }

    //console.log(this.proyectoModel.competenciasList);
  }
  toggleCarreras(checked, id) {
    //console.log(checked);
    var valor = { "idCarrera": id, "activo": true };
    if (checked) {
      if (checked && this.proyectoModel.carrerasList.length < 7) {
        this.proyectoModel.carrerasList.push(valor);
      } else {
        $("#ca" + id).prop("checked", false);
        this.mensajevalidacion = "Solo permite seleccionar como máximo 7 carreras"
        $('#validacion').modal('show');
      }
    }
    else {
      this.proyectoModel.carrerasList = this.proyectoModel.carrerasList.filter(item => item.idCarrera !== id);
    }
    
    //console.log(this.proyectoModel.carrerasList);
  }

  toggleDias(checked, id) {
    console.log(checked);

    if (id == 'lunes') {
      if (checked) {
        this.proyectoModel.lunes = true;
      } else {
        this.proyectoModel.lunes = false;
      }
    } else if (id == 'martes') {
      if (checked) {
        this.proyectoModel.martes = true;
      } else {
        this.proyectoModel.martes = false;
      }
    } else if (id == 'miercoles') {
      if (checked) {
        this.proyectoModel.miercoles = true;
      } else {
        this.proyectoModel.miercoles = false;
      }
    } else if (id == 'jueves') {
      if (checked) {
        this.proyectoModel.jueves = true;
      } else {
        this.proyectoModel.jueves = false;
      }
    } else if (id == 'viernes') {
      if (checked) {
        this.proyectoModel.viernes = true;
      } else {
        this.proyectoModel.viernes = false;
      }
    } else if (id == 'sabado') {
      if (checked) {
        this.proyectoModel.sabado = true;
      } else {
        this.proyectoModel.sabado = false;
      }
    } else if (id == 'domingo') {
      if (checked) {
        this.proyectoModel.domingo = true;
      } else {
        this.proyectoModel.domingo = false;
      }
    }

    console.log(this.proyectoModel);
  }


 
  obtenerPeriodos() {
    return this.convocatoriaService.getPeriodo()
      .subscribe((res: any[])=>{
console.log(res);
for(var i=0;i<res.length;i++){

  if((res[i]['id'])=this.idPeriodorecibido){
    this.periodos = res[i];
console.log(this.periodos);
    this.periodo=res[i]['periodo'];
  }
}

      })
    }

  onSubmit() {

    let model = this.proyectoModel;
    model.activo = true;
    model.idOrganizacion= Number(this.idOrganizacion);

    console.log(model)
    if (model.idOrganizacion == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de institucion vacío"
      $('#validacion').modal('show');
    } else if (model.proyecto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre de proyecto vacío"
      $('#validacion').modal('show');
    }
    else if (model.descripcion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');
    }
    else if (model.nombreResponsable == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.puesto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de puesto del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.area == "") {
      this.mensajevalidacion = "No puedes dejar el campo de area del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (!this.validarEmail(model.correoResponsable)) {
      this.mensajevalidacion = "Ingrese un correo valido"
      $('#validacion').modal('show');
    }
    else if (model.telefono == "") {
      this.mensajevalidacion = "No puedes dejar el campo de telefono del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.plazas == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de plazas en 0"
      $('#validacion').modal('show');
    }
    else if (model.modalidadDistancia == "") {
      this.mensajevalidacion = "No puedes dejar el campo de modalidad a distancia vacío"
      $('#validacion').modal('show');
    }
    else if (model.justificacionImpactoSocial == "") {
      this.mensajevalidacion = "No puedes dejar el campo de justificaciòn del impacto del servicio social vacío"
      $('#validacion').modal('show');
    }
    else if (model.objetivo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
    }
    else if (model.fechaInicio == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Inicio vacío"
      $('#validacion').modal('show');
    }/*
    else if (model.fechaTermino == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Termino vacío"
      $('#validacion').modal('show');
    }*/
    else if (model.capacitacion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de capacitaciòn vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaEntrada == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de entrada vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaSalida == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de salida vacío"
      $('#validacion').modal('show');
    }
    else if (model.rolPrestador == "") {
      this.mensajevalidacion = "No puedes dejar el campo de rol del prestador vacío"
      $('#validacion').modal('show');
    }
    else if (model.competenciasList.length == 0 && model.competenciasList.length < 6) {
      this.mensajevalidacion = "Debe seleccionar de 1 a 5 competencias"
      $('#validacion').modal('show');
    }
    else if (model.carrerasList.length == 0 && model.carrerasList.length < 8) {
      this.mensajevalidacion = "Debe seleccionar de 1 a  7 carreras"
      $('#validacion').modal('show');
    }
    else if (model.idObjetivoOnu == 0) {
      this.mensajevalidacion = "Debe seleccionar el objetivos de la ONU"
      $('#validacion').modal('show');
    }else if (model.idPeriodo == 0) {
      this.mensajevalidacion = "Debe seleccionar el periodo"
      $('#validacion').modal('show');
    } else if (model.idUniversidad == 0) {
      this.mensajevalidacion = "Debe seleccionar un campus"
      $('#validacion').modal('show');
    } else {

      this.proyectoService.updateproyecto(this.idobtenido, model).subscribe((res: any) => {
        if (res) {
          $('#success-modal-preview').modal('show');
          this._location.back();
        }
      }, error => {
        alert(error.error)
      })

    }

  }


  /*OLD
  onSubmit() {
    let model = this.proyectoModel;
    model.activo = true;

    console.log(model)
    if (model.idOrganizacion == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de institucion vacío"
      $('#validacion').modal('show');
    } else if (model.proyecto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre de proyecto vacío"
      $('#validacion').modal('show');
    }
    else if (model.descripcion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de descripción vacío"
      $('#validacion').modal('show');
    }
    else if (model.nombreResponsable == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.puesto == "") {
      this.mensajevalidacion = "No puedes dejar el campo de puesto del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.area == "") {
      this.mensajevalidacion = "No puedes dejar el campo de area del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (!this.validarEmail(model.correoResponsable)) {
      this.mensajevalidacion = "Ingrese un correo valido"
      $('#validacion').modal('show');
    }
    else if (model.telefono == "") {
      this.mensajevalidacion = "No puedes dejar el campo de telefono del responsable vacío"
      $('#validacion').modal('show');
    }
    else if (model.justificacionImpactoSocial == "") {
      this.mensajevalidacion = "No puedes dejar el campo de justificaciòn del impacto del servicio social vacío"
      $('#validacion').modal('show');
    }
    else if (model.modalidadDistancia == "") {
      this.mensajevalidacion = "No puedes dejar el campo de modalidad a distancia vacío"
      $('#validacion').modal('show');
    }
    else if (model.plazas == 0) {
      this.mensajevalidacion = "No puedes dejar el campo de plazas en 0"
      $('#validacion').modal('show');
    }
    else if (model.objetivo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
    }
    else if (model.fechaInicio == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Inicio vacío"
      $('#validacion').modal('show');
    }
    else if (model.fechaTermino == "") {
      this.mensajevalidacion = "No puedes dejar el campo de fecha Termino vacío"
      $('#validacion').modal('show');
    }
    else if (model.capacitacion == "") {
      this.mensajevalidacion = "No puedes dejar el campo de capacitaciòn vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaEntrada == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de entrada vacío"
      $('#validacion').modal('show');
    }
    else if (model.horaSalida == "") {
      this.mensajevalidacion = "No puedes dejar el campo de hora de salida vacío"
      $('#validacion').modal('show');
    }
    else if (model.rolPrestador == "") {
      this.mensajevalidacion = "No puedes dejar el campo de rol del prestador vacío"
      $('#validacion').modal('show');
    }
    else if (model.carrerasList.length == 0 && model.carrerasList.length < 8) {
      this.mensajevalidacion = "debe seleccionar de 1 a  7 carreras"
      $('#validacion').modal('show');
    }
    else if (model.competenciasList.length == 0 && model.competenciasList.length < 6) {
      this.mensajevalidacion = "debe seleccionar de 1 a 5 competencias"
      $('#validacion').modal('show');
    }
    else if (model.idObjetivoOnu == 0) {
      this.mensajevalidacion = "debe seleccionar el objetivos de la ONU"
      $('#validacion').modal('show');
    }
else{
    this.proyectoService.updateproyecto(this.idobtenido, model).subscribe((res: any) => {
      if (res) {
        $('#success-modal-preview').modal('show');
        this._location.back();
      }
    }, error => {
      alert(error.error)
    })

  
  }
  }*/


  onChangeHoras() {
    //console.log(this.proyectoModel.fechaInicio);
    this.proyectoModel.fechaTermino = "";
    let dia: Date = new Date(this.proyectoModel.fechaInicio);

    if (this.proyectoModel.horas == 240) {
      this.fechaMinima = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() + 90);
    } else {
      this.fechaMinima = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() + 190);
    }
  }

  validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false) {
      return false
    } else {
      return true;
    }
  }

}
