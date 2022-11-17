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

import { SessionService } from '../../services/session.service';
import { environment } from "../../../environments/environment";


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
  baseUrl = environment.baseUrl;
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
public documentosfaltan=false;
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
  public puedemostrar=false;



  public responsablemodel = new Responsablemodel("","","","","","","","",true,false)
  checkmodel = new check("false","false")
  public empresaModel = new Empresa("0","","Otro","","","","","",0,0,0,0,"","","","","","",0,"","","","","","","","","","","","","","","","","","","","",true,0,"",0,false,1,1,1,1,1,"0","0","0","0","0","0",undefined,undefined,undefined)

  constructor(private organizacionService: OrganizationService,private router: Router,private activatedRoute: ActivatedRoute,public session: SessionService) { 
  
  }
  ngOnInit(): void {
    document.getElementById("carg").style.display = "block";

    this.obtenerAreas();
    var docs= this.session.getdocumentos();
if(docs=="1"){
this.puedemostrar=true;

}
    this.empresaModel.atiendeOtro="Otro";
    this.idobtenido = this.activatedRoute.snapshot.paramMap.get("id");
    this.getempresa(this.idobtenido);
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenerdocumentosSubidosConRequeridos();
    this.obtenerSucesos();

    //this.externa();
    
    
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
      document.getElementById("carg").style.display = "none";
      document.getElementById("interna").style.display = "block";

      this.horasAlumno = res;
      console.log(res['responsable']);
      this.empresaModel = <Empresa><any>res;

      //console.log(this.horasAlumno);
      this.responsablemodel = res['responsable'];
      
      this.externa();
      this.listaAreasAccion=res['listaAreasAccion'];
      this.listaRubros=res['listaRubros'];
      this.logo ="data:image/jpeg;base64,"+ res['imagenArchivo'];

      this.empresaModel.atiendeOtro=res['atiendeOtro'];

      if(this.empresaModel.atiendeOtro==null){
        this.empresaModel.atiendeOtro="Otro";
      }

      if(this.empresaModel.observaciones==null || this.empresaModel.observaciones=="null"){
        this.empresaModel.observaciones="";
      }

      this.reconocimientost=this.empresaModel.reconocimiento.split('\n');
      this.logrost=this.empresaModel.logros.split('\n');
      this.obejtivost=this.empresaModel.objetivo.split('\n');
      
      console.log(this.listaAreasAccion);
      this.idRubro =  this.listaRubros.map(({ idRubro }) => idRubro);
      this.idAreaAccion = this.listaAreasAccion.map(({ idAreaAccion }) => idAreaAccion);
      if (this.cambio) {
        setTimeout(function () {

          location.href = "#arriba";
        }, 1000);
      }
      
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
      .subscribe(
        
        (documentosS: DocumentosSubidosRequeridos[]) => {
        this.DocumentosSubidos = documentosS;
 var mostrar=false;
   var options = { year: 'numeric', month: 'long', day: 'numeric' };
   this.documentosfaltan=true;

        for(var i=0;i<this.DocumentosSubidos.length;i++)
        {

          if(this.DocumentosSubidos[i]['estado']!=null){

            var Fecha1 = new Date((this.DocumentosSubidos[i]['fechaCreacion'].toString()));
            this.DocumentosSubidos[i]['fechaCreacion']=Fecha1.toLocaleDateString("es-ES", options);


          }
          if(this.DocumentosSubidos[i]['estado']!="Validada"){
            this.documentosfaltan=false;

       
          }
          if(documentosS[i]['ruta']==null && this.session.getexterna()){
            this.documentosfaltan=false;
            mostrar=true;
          }
        

        }

        if(this.puedemostrar){

        if(mostrar){
          $('#documentosfaltan').modal('show');
this.puedemostrar=false;
this.session.setdocuemntos0();

          }
        }
          console.log(documentosS);

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

    console.log("dfdsfdsfds" + id);
    this.idDocumento = id;

    $('#abrirsubir-'+id).modal('show');

  }
  descargar(id){

    window.open(this.baseUrl + "/DocumentosOrganizaciones/GetFile?id=" + id, '_blank');
    /*
    let pdfWindow = window.open("")
    pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='"+this.baseUrl+"/DocumentosOrganizaciones/GetFile?id="+id+"'></iframe>"
    )*/
    
  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);
    var fileSize = this.fileToUpload.size;
    if (fileSize > 2000000) {
      alert('El archivo no debe superar los 2MB');
      this.fileToUpload = null;
      $("#file-" + this.idDocumento).val("");
    }
  }

  uploadFile6(files: FileList) {
    this.fileToUpload = files.item(0);
    var fileSize = this.fileToUpload.size;
    if (fileSize > 5000000) {
      alert('El archivo no debe superar los 5MB');
      this.fileToUpload = null;
      $("#file-" + this.idDocumento).val("");
    }
  }
  
  subeArchivo() {
    console.log(this.idDocumento);
    document.getElementById("carg").style.display = "block";

    if (this.fileToUpload == null) {
      document.getElementById("carg").style.display = "none";
      return false;
    }
    var fileSize = this.fileToUpload.size;
    if (fileSize > 2000000) {
      alert('El archivo no debe superar los 2MB');
      this.fileToUpload = null;
      document.getElementById("carg").style.display = "none";

      return false;
    }

    this.organizacionService.postFile(this.fileToUpload, this.idDocumento, this.idobtenido).subscribe(data => {
      if (data.resultado == 1) {
        $('#abrirsubir-' + this.idDocumento).modal('hide');
        $('#success-modal-preview-file').modal('show');
        console.log(data);
        document.getElementById("carg").style.display = "none";

        //location.reload();
        this.obtenerdocumentosSubidosConRequeridos();
      }
    }, error => {
      console.log(error);
      document.getElementById("carg").style.display = "none";

    });
  }

  subeArchivo6() {
    console.log(this.idDocumento);
    document.getElementById("carg").style.display = "block";

    if (this.fileToUpload == null) {
      document.getElementById("carg").style.display = "none";
      return false;
    }
    var fileSize = this.fileToUpload.size;
    if (fileSize > 5000000) {
      alert('El archivo no debe superar los 5MB');
      this.fileToUpload = null;
      document.getElementById("carg").style.display = "none";

      return false;
    }

    this.organizacionService.postFile(this.fileToUpload, this.idDocumento, this.idobtenido).subscribe(data => {
      if (data.resultado == 1) {
        $('#abrirsubir-' + this.idDocumento).modal('hide');
        $('#success-modal-preview-file').modal('show');
        console.log(data);
        document.getElementById("carg").style.display = "none";

        //location.reload();
        this.obtenerdocumentosSubidosConRequeridos();
      }
    }, error => {
      console.log(error);
      document.getElementById("carg").style.display = "none";

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


  cambiodecontra(){

    //console.log("dfdsfdsfds" + id);
    $('#cambiodecontraseña').modal('show');
  
  }

  cambiarpass(id,pass)

{
var passw=$('#nuevapass').val()
  this.organizacionService.cambiarpass(id,passw).subscribe(data => {
    console.log(data);
        $('#success-modal-preview').modal('hide');
    this.responsablemodel.contrasena=passw;
    }, error => {
      console.log(error);
    });

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
    
  
    mostrarpass(){
      console.log("cambioar");
      if ($('#mostrar_contrasena').is(':checked')) {
        $('#password').attr('type', 'text');
      } else {
        $('#password').attr('type', 'password');
      }
    
    }
  
    mostrarmodal() {
      console.log("adentro");
      $('#warning-modal-preview').modal('show');
    }
    mostrarmodalinfo() {
      $('#infodoc').modal('show');
    }

}
