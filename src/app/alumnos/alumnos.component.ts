import { Component, OnInit, ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
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
import { Periodos } from "../models/periodo"

declare var $: any;
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class Alumnos implements OnInit {
  public alumnos: alumnosasignados[] = [];
  public d: Date = new Date();
  public options = { year: 'numeric', month: 'long', day: 'numeric' };
  public periodos: Periodos[] = [];
  public idPeriodo: number = 0;

  constructor(public cookies: CookieService,
    private convocatoriasService: ConvocatoriaServices,
    private proyectoService: ProyectoService,
    private router: Router, public session: SessionService) {

  }


  ngOnInit(): void {

    this.idPeriodo = Number(this.session.getPeriodo());
    this.obtenerPeriodos();
    this.alumnoproyectos();

    if (this.cookies.get("mostraralumno")) {
      this.cookies.delete("mostraralumno");
      this.mostrarmodal();
    }

  }

  ngAfterViewInit() {
    Feather.replace();
  }

  alumnoproyectos() {

    this.proyectoService.alumnosByEmpresaAndIdPeriodo(this.session.getToken(), this.session.getPeriodo()).subscribe((res: any[]) => {
      this.alumnos = res;
    })

  }
  mostrarmodal() {
    $('#warning-modal-preview').modal('show');
  }

  veralumno(idasignado, idalumno, idEstado, idProyecto, fechaInicioInstitucion) {

    this.cookies.set("idasignado", idasignado);
    this.cookies.set("idalumno", idalumno);
    this.cookies.set("idEstado", idEstado);
    this.cookies.set("idProyectoa", idProyecto);
    this.cookies.set("fechaInicioInstitucion", fechaInicioInstitucion);

    this.router.navigate(['/alumnosver', idalumno]);

  }


  obtenerPeriodos() {

    return this.convocatoriasService
      .getVPeriodo(this.session.getCampus())
      .subscribe((periodos: Periodos[]) => this.periodos = periodos);

  }
  cambiaPeriodo() {
    console.log(this.idPeriodo);
    this.session.setPeriodo(this.idPeriodo);
    location.reload();
  }

}
