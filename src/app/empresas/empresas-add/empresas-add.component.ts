import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../../services/organization.service';
import { Empresa,Responsablemodel,check,direcciones,escueladirecciones,cordinaciones,vicerrectorias } from "../../models/empresa"
import { AreaAccion } from "../../models/areaaccion"

import { RubroEmpresa } from "../../models/rubrosempresa"
import { Universidad } from "../../models/universidad"
import { TipoEmpresa } from "../../models/tipoempresa"
import { GiroEmpresa } from "../../models/giroempresa"
import { ClasificacionEmpresa } from "../../models/clasificacionempresa"
import { EstadoEmpresa } from "../../models/estadoempresa"
import { Router } from '@angular/router';
declare var $: any;
import {Location} from '@angular/common';
import { SessionService } from '../../services/session.service';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-organization-add',
  templateUrl: './empresas-add.component.html',
  styleUrls: ['./empresas-add.component.scss']
})
export class EmpresasAddComponent implements OnInit {
  public areas: AreaAccion[] = [];
  public rubros: RubroEmpresa[] = [];
  public universidades: Universidad[] = [];
  public tipo: TipoEmpresa[] = [];

  public vicerectorias: vicerrectorias[] = [];
  public escueladirecciones: escueladirecciones[] = [];
  public cordinaciones: cordinaciones[] = [];

  public responsablemodel = new Responsablemodel("","","","","","","","",false,false)
  public direcciones = new direcciones()

public validar=false;
  public giro: GiroEmpresa[] = [];
  public estado: EstadoEmpresa[] = [];
  public listaAreasAccion = [];
  public listaRubros = [];
  public clasificacion: ClasificacionEmpresa[] = [];
  public empresaModel = new Empresa(0,"","","","","","","",2,2,2,2,"","","https://www","https://www","https://www","https://www",0,"","","","","","","","","","","https://www","","","","","","","","","",true,0,"",0,false,1,1,1,1,1,0,0,0,0,0,0,undefined,undefined,undefined)
public mensajevalidacion="";
  public contactos = [];
  checkmodel = new check("false","false")
  public imagensubidaurl:string="";
public  logo="data:image/png;base64,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";
public cambio=false;

public listacolonias = [];
public listaestados = [];
public listamunicipios = [];
public listaciudad = [];
public listapais = [];

public id="";
public fileToUpload: File = null;

  constructor(private organizacionService: OrganizationService,private router: Router,private _location: Location,public session: SessionService,private cookies: CookieService) { 
  
  }
  ngOnInit(): void {


    this.cambio=this.session.getexterna();
console.log(this.cambio);
this.responsablemodel.externa=this.cambio;
    this.obtenerAreas();
    this.obtenerRubros();
    this.obtenerUniversidades();
    this.obtenerTipo();
    this.obtenerGiro();
    this.obtenerClasificacion();
    this.obtenerEstado();
    this.obtenercordinaciones();
    this.obtenerescueladireccion();
    this.obtenervicerretoria();
    console.log(this.responsablemodel);
   this.responsablemodel.nombreCompletoResponsable= this.cookies.get("nombreCompletoResponsable")
   this.responsablemodel.nombreCompletoDirector=   this.cookies.get("nombreCompletoDirector")
   this.responsablemodel.puesto=  this.cookies.get("puesto");
   this.responsablemodel.departamento= this.cookies.get("departamento");
   this.responsablemodel.usuario= this.cookies.get("usuario");
   this.responsablemodel.contrasena=  this.cookies.get("contrasena");
   this.responsablemodel.telefono= this.cookies.get("telefono");
   this.responsablemodel.correo= this.cookies.get("correo", );
   this.empresaModel.IdResponsable= Number(this.cookies.get("idresponsable"));
   $('#superlarge-modal-size-preview').modal('show');

  }


  toggleArea(checked, id){
 
    console.log(checked);
var valor= { "idAreaAccion": id ,"activo": true};

    if(checked) 
    {
      if(id==13){

        $("#areatext").prop("disabled", false);
      }
      if (this.listaAreasAccion.length < 3) {

    this.listaAreasAccion.push(valor);
      }
      else {
        $("#area-" + id).prop("checked", false);
        this.mensajevalidacion = "Sólo se permite seleccionar máximo 3 áreas de acción"
        $('#validacion').modal('show');
      }
    }
    else 
    {
      if(id==13){

        $("#areatext").prop("disabled", true);
        $("#areatext").val("");

      }

      this.listaAreasAccion = this.listaAreasAccion.filter(item => item.idAreaAccion !== id);   
    }
    console.log(this.listaAreasAccion);
    
  }
      
  togleRubros(checked, id){
    console.log(checked);
var valor= { "idRubro": id ,"activo": true};

    var area = this.areas.find(x=>x.id===id);
    if(checked) this.listaRubros.push(valor);
    else this.listaRubros = this.listaRubros.filter(item => item.idRubro !== id);   
    
    console.log(this.listaRubros);

  }

  ngAfterViewInit() {
    Feather.replace();
  }
  obtenerdirecciones(cp) {
    this.organizacionService.obtenerdirecciones(cp).subscribe((re: any[])=>{
      console.log(re);
      if(re.length>0){
        this.listacolonias=[];

        this.listaestados=[];
        this.listaciudad=[];
        this.listapais=[];
        this.listamunicipios=[];

        var listacoloniast=[];
        var listamunicipiost=[];

        var listaestadost=[];
        var listaciudadt=[];
        var listapaist=[];

        for(var i=0;i<re.length;i++){
          
          
          listacoloniast.push(re[i]['colonia']);

            listamunicipiost.push(re[i]['municipio']);
  
            listaestadost.push(re[i]['estado']);
  
            listaciudadt.push(re[i]['ciudad']);
  
            listapaist.push(re[i]['pais']);
  

 


        }

        this.empresaModel.colonia= listacoloniast[0];
        this.empresaModel.municipio= listamunicipiost[0];
        this.empresaModel.estado= listaestadost[0];
        this.empresaModel.ciudad= listaciudadt[0];
        this.empresaModel.pais= listapaist[0];



        const myObj1 = {}
        const myObj2 = {}
        const myObj3 = {}
        const myObj4 = {}
        const myObj5 = {}

listapaist.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj1)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj1[el] = true
            this.listapais.push(el)
          }
        })
        listaestadost.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj2)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj2[el] = true
            this.listaestados.push(el)
          }
        })

        listamunicipiost.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj3)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj3[el] = true
            this.listamunicipios.push(el)
          }
        })

        listacoloniast.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj4)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj4[el] = true
            this.listacolonias.push(el)
          }
        })
        listaciudadt.forEach(el => {
          // comprobamos si el valor existe en el objeto
          if (!(el in myObj5)) {
            // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
            myObj5[el] = true
            this.listaciudad.push(el)
          }
        })


  console.log(this.listapais);
  console.log(this.listaciudad);
  console.log(this.listaestados);
  console.log(this.listacolonias);


      }else{
        this.listacolonias=[];

        this.listaestados=[];
        this.listaciudad=[];
        this.listapais=[];
        this.mensajevalidacion="Ingresa un CP valido";
        $('#validacion').modal('show');
      }

    })

  }
  obtenervicerretoria() {
    return this.organizacionService
      .getvice()
      .subscribe((vicerectorias: vicerrectorias[]) => this.vicerectorias = vicerectorias );
  }
  obtenerescueladireccion() {
    return this.organizacionService
      .getescueladireccion()
      .subscribe((escueladirecciones: escueladirecciones[]) => this.escueladirecciones = escueladirecciones );
  }
  obtenercordinaciones() {
    return this.organizacionService
      .getcordinaciones()
      .subscribe((cordinaciones: cordinaciones[]) => this.cordinaciones = cordinaciones );
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


   validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false){
     return false
    } else {
     return true;
    }
  }
  mostrarpass(){
    console.log("cambioar");
    if ($('#mostrar_contrasena').is(':checked')) {
      $('#password').attr('type', 'text');
    } else {
      $('#password').attr('type', 'password');
    }
  
  }


  create(){
    
    $('#NombreResponsable').css("border", "#dee2e6 solid 1px");
    $('#telefono').css("border", "#dee2e6 solid 1px");
    $('#correo').css("border", "#dee2e6 solid 1px");
     $('#nombreComun').css("border", "#dee2e6 solid 1px");
     $('#razon').css("border", "#dee2e6 solid 1px");
     $('#logros').css("border", "#dee2e6 solid 1px");
     $('#reconocimiento').css("border", "#dee2e6 solid 1px");
     $('#facebook').css("border", "#dee2e6 solid 1px");
     $('#vision').css("border", "#dee2e6 solid 1px");
     $('#mision').css("border", "#dee2e6 solid 1px");
     $('#objetivo').css("border", "#dee2e6 solid 1px");
     $('#logros').css("border", "#dee2e6 solid 1px");
     $('#web').css("border", "#dee2e6 solid 1px");
     $('#cp').css("border", "#dee2e6 solid 1px");
     $('#estado').css("border", "#dee2e6 solid 1px");
     $('#ciudad').css("border", "#dee2e6 solid 1px");
     $('#colonia').css("border", "#dee2e6 solid 1px");
     $('#calle').css("border", "#dee2e6 solid 1px");
     $('#noExt').css("border", "#dee2e6 solid 1px");
     $('#NombreCompletoDirector').css("border", "#dee2e6 solid 1px");
     $('#NombreCompletoresponsable').css("border", "#dee2e6 solid 1px");
     $('#correo').css("border", "#dee2e6 solid 1px");
     $('#telefono').css("border", "#dee2e6 solid 1px");
     $('#departamento').css("border", "#dee2e6 solid 1px");
     $('#puesto').css("border", "#dee2e6 solid 1px");
     $('#contrasena').css("border", "#dee2e6 solid 1px");
   
    this.responsablemodel.usuario=this.responsablemodel.correo;

    let model = this.empresaModel;
    model.Imagen="";
model.Responsable = this.responsablemodel;
model.listaAreasAccion = this.listaAreasAccion;
model.listaRubros = this.listaRubros ;

model.Imagen=this.imagensubidaurl;

console.log(this.responsablemodel.externa);
console.log(this.responsablemodel.telefono.length);

if(model.Responsable.externa){
     if(model.organizacion==""){
this.mensajevalidacion="No puedes dejar el campo de Nombre Oficial de la Institución vacío"
      $('#validacion').modal('show');
      $('#organizacion').css("border", "red solid 1px");

    }
//responsable
else if(this.responsablemodel.telefono.length<10){
  this.mensajevalidacion="Ingrese un telefono valido"
  $('#validacion').modal('show');
  $('#telefono').css("border", "red solid 1px");

} 
else if(!this.validarEmail(this.responsablemodel.correo)){
  this.mensajevalidacion="Ingrese un correo valido"
  $('#validacion').modal('show');
  $('#correo').css("border", "red solid 1px");

} 




    else if(model.nombreComun==""){
      this.mensajevalidacion="No puedes dejar el campo de Nombre Común de la Institución vacío"
      $('#validacion').modal('show');
      $('#nombreComun').css("border", "red solid 1px");

      
    }
    else if(model.razon==""){
      this.mensajevalidacion="No puedes dejar el campo de razón de ser de la Institución vacío"
      $('#validacion').modal('show');
      $('#razon').css("border", "red solid 1px");

    }
    else if(model.logros==""){
      this.mensajevalidacion="No puedes dejar el campo de  los Principales Logros de la Institución vacío"
      $('#validacion').modal('show');
      $('#logros').css("border", "red solid 1px");

    }
    else if(model.reconocimiento==""){
      this.mensajevalidacion="No puedes dejar el campo de  Reconocimientos y Certificaciones vacío"
      $('#validacion').modal('show');
      $('#reconocimiento').css("border", "red solid 1px");

    }

    else if(model.facebook==""){
      this.mensajevalidacion="No puedes dejar el campo de  facebook vacío"
      $('#validacion').modal('show');
      $('#facebook').css("border", "red solid 1px");

    }  
    else if(model.vision=="" || model.vision==null){
      this.mensajevalidacion="El campo de Visión no debe ir vacío"
      $('#validacion').modal('show');
      $('#vision').css("border", "red solid 1px");

    } 

    else if(model.mision==""){
      this.mensajevalidacion="No puedes dejar el campo de mision vacío"
      $('#validacion').modal('show');
      $('#mision').css("border", "red solid 1px");

    }
    else  if(model.objetivo==""){
      this.mensajevalidacion="No puedes dejar el campo de objetivo vacío"
      $('#validacion').modal('show');
      $('#objetivo').css("border", "red solid 1px");

    }
    else if(model.logros==""){
      this.mensajevalidacion="No puedes dejar el campo de logros vacío"
      $('#validacion').modal('show');
      $('#logros').css("border", "red solid 1px");

    }
    else if(model.web==""){
      this.mensajevalidacion="No puedes dejar el campo de web vacío"
      $('#validacion').modal('show');
      $('#web').css("border", "red solid 1px");

    }
    else if(model.cp==""){
      this.mensajevalidacion="No puedes dejar el campo de cp vacío"
      $('#validacion').modal('show');
      $('#cp').css("border", "red solid 1px");

    }
    else if(model.estado==""){
      this.mensajevalidacion="No puedes dejar el campo de estado vacío"
      $('#validacion').modal('show');
      $('#estado').css("border", "red solid 1px");

    }
    else if(model.ciudad==""){
      this.mensajevalidacion="No puedes dejar el campo de ciudad vacío"
      $('#validacion').modal('show');
      $('#ciudad').css("border", "red solid 1px");

    }
    else if(model.colonia==""){
      this.mensajevalidacion="No puedes dejar el campo de colonia vacío"
      $('#validacion').modal('show');
      $('#colonia').css("border", "red solid 1px");

    }
    else if(model.calle==""){
      this.mensajevalidacion="No puedes dejar el campo de calle vacío"
      $('#validacion').modal('show');
      $('#calle').css("border", "red solid 1px");

    }

    else if(model.noExt==""){
      this.mensajevalidacion="No puedes dejar el campo de noExt vacío"
      $('#validacion').modal('show');
      $('#noExt').css("border", "red solid 1px");

    }

    else if(model.Responsable['NombreCompletoDirector']==""){
      this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del Director vacío"
      $('#validacion').modal('show');
      $('#NombreCompletoDirector').css("border", "red solid 1px");


    }
    else if(model.Responsable['NombreCompletoresponsable']==""){
      this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del responsable vacío"
      $('#validacion').modal('show');
      $('#NombreCompletoresponsable').css("border", "red solid 1px");


    }  else if(model.Responsable['correo']==""){
        this.mensajevalidacion="No puedes dejar el campo de correo vacío"
      $('#validacion').modal('show');
      $('#correo').css("border", "red solid 1px");


    }  
    else if(model.Responsable['telefono']==""){
      this.mensajevalidacion="No puedes dejar el campo de telefono vacío"
      $('#validacion').modal('show');
      $('#telefono').css("border", "red solid 1px");


    }  
    else if(model.Responsable['departamento']==""){
      this.mensajevalidacion="No puedes dejar el campo de departamento vacío"
      $('#validacion').modal('show');
      $('#departamento').css("border", "red solid 1px");

    }  
    else if(model.Responsable['puesto']==""){
      this.mensajevalidacion="No puedes dejar el campo de puesto vacío"
      $('#validacion').modal('show');
      $('#puesto').css("border", "red solid 1px");

    }  
    // else if(model.Responsable['usuario']==""){
    //   this.mensajevalidacion="No puedes dejar el campo de usuario vacío"
    //   $('#validacion').modal('show');

    // } 
    else if(model.Responsable['contraseña']==""){
      this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
      $('#validacion').modal('show');
      $('#contrasena').css("border", "red solid 1px");

    } 
    // else if(this.listaRubros.length==0){
    //   this.mensajevalidacion="Debes selecciónar al menos un rubro"
    //   $('#validacion').modal('show');

    // } 
    //maximo
   
   
    else if(this.listaAreasAccion.length==0 && this.listaAreasAccion.length < 4){
      this.mensajevalidacion="Debes selecciónar al menos una Area y maximo 3"
      $('#validacion').modal('show');

    } 
    
    else{


console.log(this.responsablemodel);

     this.organizacionService.create(model).subscribe((res: any)=>{
      this.validar=true;

               var datosvalue=res['datos'];




               this.session.setDatos(datosvalue['responsable']['nombreCompletoResponsable'],datosvalue['responsable']['nombreCompletoDirector'],
               datosvalue['responsable']['puesto'],datosvalue['responsable']['departamento'],datosvalue['responsable']['usuario'],
               datosvalue['responsable']['contrasena'],datosvalue['responsable']['telefono'],datosvalue['responsable']['correo'],datosvalue['responsable']['externa'],datosvalue['id']);
             
               this.session.setToken(datosvalue['id']);
               this.session.setexterna(datosvalue['externa']);
               this.session.setapellidos(datosvalue['nombreCompletoDirector']);
             
               console.log(datosvalue);
             
               this.session.setnombre(datosvalue['organizacion']);
              
             
             
                           this.router.navigate(['/instituciones/ver',datosvalue['id']]);
                           $('#success-modal-preview').modal('show');

               

    }, error=>{
      alert(error.error)

    }) 
  
 
  
  }

}else{
  var cor="";



  for(var v=0;v<this.cordinaciones.length;v++){
    if(model.idVicerrectoria==this. cordinaciones[v]['id']){
      cor=this.cordinaciones[v]['cordinacion'];
    }

  }
  model.organizacion=cor;
  model.nombreComun="Interna";

console.log(model);
         if(model.Responsable['NombreCompletoDirector']==""){
          this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del Director vacío"
          $('#validacion').modal('show');
          $('#NombreCompletoDirector').css("border", "red solid 1px");

        }

//responsable
else if(this.responsablemodel.telefono.length<10){
  this.mensajevalidacion="Ingrese un telefono valido"
  $('#validacion').modal('show');
  $('#telefono').css("border", "red solid 1px");

} 
else if(!this.validarEmail(this.responsablemodel.correo)){
  this.mensajevalidacion="Ingrese un correo valido"
  $('#validacion').modal('show');
  $('#correo').css("border", "red solid 1px");

} 





        else if(model.Responsable['NombreCompletoresponsable']==""){
          this.mensajevalidacion="No puedes dejar el campo de Nombre Completo del responsable vacío"
          $('#validacion').modal('show');
          $('#NombreCompletoresponsable').css("border", "red solid 1px");

    
        }  else if(model.Responsable['correo']==""){
            this.mensajevalidacion="No puedes dejar el campo de correo vacío"
          $('#validacion').modal('show');
          $('#correo').css("border", "red solid 1px");

    
        }  
        else if(model.Responsable['telefono']==""){
          this.mensajevalidacion="No puedes dejar el campo de telefono vacío"
          $('#validacion').modal('show');
          $('#telefono').css("border", "red solid 1px");

    
        }  
       
        else if(model.Responsable['puesto']==""){
          this.mensajevalidacion="No puedes dejar el campo de puesto vacío"
          $('#validacion').modal('show');
          $('#puesto').css("border", "red solid 1px");

        }  
        // else if(model.Responsable['usuario']==""){
        //   this.mensajevalidacion="No puedes dejar el campo de usuario vacío"
        //   $('#validacion').modal('show');
    
        // } 
        else if(model.Responsable['contraseña']==""){
          this.mensajevalidacion="No puedes dejar el campo de contraseña vacío"
          $('#validacion').modal('show');
          $('#contrasena').css("border", "red solid 1px");

        } 
        
       
       
        else if(model.objetivo==""){
          this.mensajevalidacion="No puedes dejar el campo de  los objetivos  vacío"
          $('#objetivo').modal('show');
        }
        else if(model.descripcionArea==""){
          this.mensajevalidacion="No puedes dejar el campo de descripcion de área  vacío"
          $('#descripcionArea').modal('show');
        }
     
        else if(this.listaAreasAccion.length==0 && this.listaAreasAccion.length < 4){
          this.mensajevalidacion="Debes selecciónar al menos una Area y maximo 3"
          $('#validacion').modal('show');
    
        }else{

          console.log(model);
      
           this.organizacionService.create(model).subscribe((res: any)=>{
             console.log(res);
            this.validar=true;
            var datosvalue=res['datos'];




            this.session.setDatos(datosvalue['responsable']['nombreCompletoResponsable'],datosvalue['responsable']['nombreCompletoDirector'],
            datosvalue['responsable']['puesto'],datosvalue['responsable']['departamento'],datosvalue['responsable']['usuario'],
            datosvalue['responsable']['contrasena'],datosvalue['responsable']['telefono'],datosvalue['responsable']['correo'],datosvalue['responsable']['externa'],datosvalue['id']);
          
            this.session.setToken(datosvalue['id']);
            this.session.setexterna(datosvalue['externa']);
            this.session.setapellidos(datosvalue['nombreCompletoDirector']);
          
            console.log(datosvalue);
          
            this.session.setnombre(datosvalue['organizacion']);
           
          
          
                        this.router.navigate(['/instituciones/ver',datosvalue['id']]);
                        $('#success-modal-preview').modal('show');


      
          }, error=>{
            alert(error.error)
      
          }) 

        }
}
  }
  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0);

    
   }
  

      //TODO SERGIO
  abrirsubir(){

    //console.log("dfdsfdsfds" + id);
    $('#abrirsubir').modal('show');

  }
  subeArchivo() {


    this.organizacionService.postFileImage(this.fileToUpload,"0").subscribe(data => {
      if (data.resultado == 1) {
       this.imagensubidaurl= data.datos;
       console.log(this.imagensubidaurl);
this.getBase64(this.fileToUpload).then(
  data => 
  this.logo=data.toString()
);

$('#abrirsubir').modal('hide');


      }
    }, error => {
      console.log(error);
    });



  


  }


   getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  externa(){

    console.log(this.responsablemodel.externa);
     this.cambio=this.responsablemodel.externa;
 
  }
  obtenerdireccion(){
    var cp=this.empresaModel.cp;
    console.log(cp);
   
    this.obtenerdirecciones(cp);

    
  }
 
}
