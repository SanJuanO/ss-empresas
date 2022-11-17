import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { Periodos } from "../models/periodo"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria, Tipo } from "../models/convocatoria"
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa = null;

  public alumnos: alumnosasignados[] = [];

  public empresacantidad: number;
  public empresaactiva: Empresa[] = [];
  public empresadesaciva: Empresa[] = [];
  public d: Date = new Date();
  public tipoModel = new Tipo(1);
  public convocatorias: Convocatoria[] = [];
  public convocatoriasalumnos: Convocatoria[] = [];
  public proyectos: Proyecto[] = [];
  public proyectosrechazados: Proyecto[] = [];
  public proyectosactivos: Proyecto[] = [];
  public proyectospendientes: Proyecto[] = [];


  public options = { year: 'numeric', month: 'long', day: 'numeric' };

  public convocatoriasf: Convocatoria[] = [];

  public periodos: Periodos[] = [];
  public idPeriodo: number = 0;

  constructor(private organizacionService: OrganizationService, public cookies: CookieService,
    private convocatoriasService: ConvocatoriaServices, private proyectoService: ProyectoService,
    private router: Router, public session: SessionService) {

  }


  ngOnInit(): void {

    this.idPeriodo = Number(this.session.getPeriodo());
    this.obtenerPeriodos();

    this.proyectos = [];
    this.proyectosactivos = [];
    this.proyectosrechazados = [];
    this.proyectospendientes = [];
    this.empresacantidad = 0;
    this.empresaactiva = [];
    this.empresadesaciva = [];

    this.tipoModel = new Tipo(1);
    this.convocatorias = [];
    this.convocatoriasalumnos = [];
    this.convocatoriasf = [];


    this.obtenerempresa();
    this.obtenerConvocatoria1();
    this.obtenerProyectos();

    if (this.cookies.get("mostrarproyectos")) {
      this.cookies.delete("mostrarproyectos");
      this.mostrarmodal();
    }

  }

  ngAfterViewInit() {
    Feather.replace();

  }


  mostrarmodal() {
    //console.log("adentro");
    $('#warning-modal-preview').modal('show');
  }
  obtenerempresa() {
    let model = this.tipoModel;
    model.tipo = 1;
    this.organizacionService.getOrganizacion(this.session.getToken()).subscribe((res: Empresa) => {

      this.empresa = res;


    })

  }




  obtenerConvocatoria1() {
    let model = this.tipoModel;
    model.tipo = 1;
    this.convocatoriasService.getConvocatoriatipo(model, this.session.getPeriodo(), this.session.getCampus()).subscribe((res: any[]) => {
      var Fecha = new Date((this.d.toString()));
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      //console.log(res);
      this.convocatorias = res;
      for (var i = 0; i < this.convocatorias.length; i++) {

        //console.log(this.convocatorias[i].fechaTermino.toString().split("T")[0].split("T")[0]+"T"+"23:59:59");
        var Fecha1 = new Date((this.convocatorias[i].fechaTermino.toString().split("T")[0] + "T" + "23:59:59"));
        var ini = new Date((this.convocatorias[i].fechaInicio.toString()));

        //console.log(Fecha1 + " actual " + Fecha);

        if (Fecha1 >= Fecha) {
          //console.log(Fecha1);
          this.convocatorias[i].Termino = Fecha1.toLocaleDateString("es-ES", options);

          this.convocatorias[i].Inicio = ini.toLocaleDateString("es-ES", options);
          this.convocatoriasf.push(this.convocatorias[i]);
        }
        //console.log(this.convocatoriasf.length);
      }


    })
  }

  obtenerProyectos() {
    var id = this.session.getToken();

    this.proyectoService.getProyectoEmpresa(id, this.session.getPeriodo()).subscribe((res: any[]) => {
      // this.proyectoService.getAll().subscribe((res: any[])=>{                    
      this.proyectos = res;
      //console.log(res);



      for (var i = 0; i < this.proyectos.length; i++) {


        if (this.proyectos[i].idEstadoProyecto == 3) {
          this.proyectosactivos.push(this.proyectos[i]);

        }
        if (this.proyectos[i].idEstadoProyecto == 4) {
          this.proyectosrechazados.push(this.proyectos[i]);

        }
        if (this.proyectos[i].idEstadoProyecto < 3) {
          this.proyectospendientes.push(this.proyectos[i]);

        }



      }



    });
  }

  alumnoproyectos() {

    this.proyectoService.alumnosempresa(this.session.getToken()).subscribe((res: any[]) => {
      this.alumnos = res;

      //console.log(res);


    })

  }
  veralumno(idasignado, idalumno, idEstado, idProyecto, fechaInicioInstitucion) {

    this.cookies.set("idasignado", idasignado);
    this.cookies.set("idalumno", idalumno);
    this.cookies.set("idEstado", idEstado);
    this.cookies.set("idProyectoa", idProyecto);
    this.cookies.set("fechaInicioInstitucion", fechaInicioInstitucion);

    //console.log(idasignado + " " + idalumno);
    this.router.navigate(['/alumnosver', idalumno]);

  }

  obtenerPeriodos() {

    return this.convocatoriasService
      .getVPeriodo(this.session.getCampus())
      .subscribe((periodos: Periodos[]) => this.periodos = periodos);

  }
  cambiaPeriodo() {
    //console.log(this.idPeriodo);
    this.session.setPeriodo(this.idPeriodo);
    location.reload();
  }

}
