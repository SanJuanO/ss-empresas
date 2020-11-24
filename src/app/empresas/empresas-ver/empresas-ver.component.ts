import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa, Responsablemodel, check, estadoActualizar, OrganizacionesSucesosModel } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"
import { Documentos, DocumentosCadena, Documentosfile, DocumentosSubidos, DocumentosSubidosRequeridos } from "../../models/documentos"
import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"



import { Router,ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-organization-ver',
  templateUrl: './empresas-ver.component.html',
  styleUrls: ['./empresas-ver.component.scss']
})
export class EmpresasverComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public estadoact = new estadoActualizar(0,"",0)
  public  logo="https://img.icons8.com/ios/452/company.png";

  public responsable: Responsablemodel[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];
public idobtenido:string;
  public giro: GiroEmpresa[] = [];
  public documentos: Documentos[] = [];

  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public idRubro:any;
  public idAreaAccion:any;
public validar=false;
  public contactos = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  horasAlumno = [];
  public documentoscadena = new DocumentosCadena(1,1,1,"","",undefined)
  public binary: number = 0b1010;
  public sucesos: OrganizacionesSucesosModel[] = [];
  public fileToUpload: File = null;
  public idDocumento: string = "";
  public DocumentosSubidos: DocumentosSubidosRequeridos[];
  public idDocumentosSubidos: any;

  public reconocimientost:any;
  public logrost:any;
  public obejtivost:any;
  public documentosfile = new Documentosfile();
  public cambio=false;



  public responsablemodel = new Responsablemodel("","","","","","","","",true,false)
  checkmodel = new check("false","false")
  public empresaModel = new Empresa("","","","","",1,1,1,0,"","","","","","",0,"","","","","","","","","","","","","","","","","","","","",true,0,"",0,false,1,1,1,1,1,0,0,0,0,1,0,undefined,undefined,undefined)

  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute) { 
  
  }
  ngOnInit(): void {
    this.idobtenido = this.activatedRoute.snapshot.paramMap.get("id");
    this.getempresa(this.idobtenido);

    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenerdocumentosSubidosConRequeridos();
    this.obtenerSucesos();

    this.externa();

  }
 
  toggleArea(checked, id){
var valor= { "idAreaAccion": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaAreasAccion.push(valor);
    else this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    
    //console.log(this.listaAreasAccion);
  }
  togleRubros(checked, id){
    //console.log(checked);
var valor= { "idRubro": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    //console.log(this.listaRubros);

  }

  ngAfterViewInit() {
    Feather.replace();
  }
  getempresa(id){
    this.organizacionService.getOrganizacion(id).subscribe((res: any[])=>{
      this.horasAlumno = res;
      this.empresaModel = <Empresa><any>res;

      //console.log(this.horasAlumno);
      this.responsablemodel=res['responsable'];
      this.listaAreasAccion=res['listaAreasAccion'];
      this.listaRubros=res['listaRubros'];
      this.logo ="data:image/jpeg;base64,"+ res['imagenArchivo'];


      this.reconocimientost=this.empresaModel.reconocimiento.split('\n');
      this.logrost=this.empresaModel.logros.split('\n');
      this.obejtivost=this.empresaModel.objetivo.split('\n');
      
      //console.log(this.listaAreasAccion);
      this.idRubro =  this.listaRubros.map(({ idRubro }) => idRubro);
      this.idAreaAccion =  this.listaAreasAccion.map(({ idAreaAccion }) => idAreaAccion);


      
    })
  }
  obtenerAreas() {
    return this.organizacionService
      .getAreas()
      .subscribe((areas: AreaAccion[]) => this.areas = areas );
  }
  obtenerRubros() {
    return this.organizacionService
      .getRubros()
      .subscribe((rubros: RubroEmpresa[]) => this.rubros = rubros );
  }
  obtenerUniversidades() {
    return this.organizacionService
      .getUniversidades()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades );
  }
  obtenerTipo() {
    return this.organizacionService
      .getTipo()
      .subscribe((tipo: TipoEmpresa[]) => this.tipo = tipo );
  }
 
  obtenerEstado() {
    return this.organizacionService
      .getEstado()
      .subscribe((estado: EstadoEmpresa[]) => this.estado = estado );
  }
  obtenerGiro() {
    return this.organizacionService
      .getGiro()
      .subscribe((giro: GiroEmpresa[]) => this.giro = giro );
  }
  obtenerClasificacion() {
    return this.organizacionService
      .getClasificacion()
      .subscribe((clasificacion: ClasificacionEmpresa[]) => this.clasificacion = clasificacion );
  }

  obtenerdocumentosSubidosConRequeridos() {
    return this.organizacionService
      .obtenerDocumentosSubidosConRequeridos(this.idobtenido)
      .subscribe((documentosS: DocumentosSubidosRequeridos[]) => {
        this.DocumentosSubidos = documentosS;
        //console.log("iddocumentos subidos "+this.idDocumentosSubidos);
        console.log("requeridos " + this.DocumentosSubidos);

      });
  }

  obtenerSucesos() {
    return this.organizacionService
      .getSucesosByIdOrganizacion(this.idobtenido)
      .subscribe((sucesos: OrganizacionesSucesosModel[]) => this.sucesos = sucesos);
  }


  onSubmit() {
    let model = this.empresaModel;

   
    model.Responsable = this.responsablemodel;

    model.listaAreasAccion = this.listaAreasAccion;
    model.listaRubros = this.listaRubros ;

    //console.log(model);

    this.organizacionService.updateempresa(this.idobtenido,model).subscribe(() => {
      
      this.validar=true;

     
    })

if(this.validar){
    this.router.navigate(['/empresas']);
    $('#success-modal-preview').modal('show');

}
  }

  //TODO SERGIO
  abrirsubir(id){

    //console.log("dfdsfdsfds" + id);
    this.idDocumento = id;
    $('#abrirsubir-'+id).modal('show');

  }
  descargar(id){

    let pdfWindow = window.open("")
    pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(id) + "'></iframe>"
    )

  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  
  subeArchivo() {
    
    this.organizacionService.postFile(this.fileToUpload, this.idDocumento, this.idobtenido).subscribe(data => {
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

  actualizarestado(){
    
    this.estadoact.idOrganizacion=Number(this.empresaModel.id);
    this.estadoact.observaciones=this.empresaModel.observaciones;
    this.estadoact.idEstado=Number(this.empresaModel.idEstadoOrganizacion);
let model=this.estadoact;
//console.log(model);
    this.organizacionService.updateestado(model).subscribe(() => {
          window.location.reload();

      $('#success-modal-preview').modal('show');

    }, error=>{
      alert(error.error)
    })

  }
  externa(){

    console.log(this.responsablemodel.externa);
     this.cambio=this.responsablemodel.externa;
 
  }










  permitir(){

    //console.log("dfdsfdsfds" + id);
    $('#abrirsubir').modal('show');
  
  }
  obtenerpermisos() {
    this.organizacionService.permisopedir(this.idobtenido).subscribe(data => {
    console.log(data);
        $('#abrirsubir').modal('hide');
        $('#listo').modal('show');
    
    }, error => {
      console.log(error);
    });
    }
    
  



}
