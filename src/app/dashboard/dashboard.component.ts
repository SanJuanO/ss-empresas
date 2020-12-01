import { Component, OnInit,ViewChild } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa } from "../models/empresa"
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Convocatoria,Tipo } from "../models/convocatoria"
import { count } from 'rxjs-compat/operator/count';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConstantPool } from '@angular/compiler';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from "../models/proyectos"
import { SessionService } from '../services/session.service';
import { alumnosasignados } from "../models/alumno"

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public empresa: Empresa[] = [  ];

  public alumnos: alumnosasignados[] = [  ];

  public empresacantidad: number;
  public empresaactiva: Empresa[] = [  ];
  public empresadesaciva: Empresa[] = [  ];
  public d: Date = new Date(); 
  public tipoModel = new Tipo(1);
  public convocatorias:Convocatoria [] = [ ];
  public convocatoriasalumnos:Convocatoria [] = [ ];
  public proyectos: Proyecto[] = [];
  public proyectosrechazados: Proyecto[] = [];
  public proyectosactivos: Proyecto[] = [];
  public proyectospendientes: Proyecto[] = [];
  @ViewChild('dataTable', {static: false}) table;
  @ViewChild('dataTable2', {static: false}) table2;

  dataTable:any;
  dataTable2:any;
  public options = { year: 'numeric', month: 'long', day: 'numeric' };

  public convocatoriasf:Convocatoria [] = [ ];
  public convocatoriasalumnosf:Convocatoria [] = [ ];

  constructor( private organizacionService: OrganizationService, private convocatoriaService: ConvocatoriaServices,private proyectoService: ProyectoService,public session: SessionService) { 
  
  }


  ngOnInit(): void {


    this.proyectos=[];
    this.proyectosactivos=[];
    this.proyectosrechazados=[];
    this.proyectospendientes=[];
     this.empresa=[];
     this.empresacantidad=0;
     this.empresaactiva = [  ];
     this.empresadesaciva = [  ];
  
     this.tipoModel = new Tipo(1);
     this.convocatorias = [ ];
     this.convocatoriasalumnos = [ ];
     this.convocatoriasf = [ ];
     this.convocatoriasalumnosf = [ ];
this.alumnoproyectos();
    this.obtenerempresa();
    this.obtenerConvocatoria1();
    this.obtenerConvocatoria2();
this.obtenerProyectos();
this.dataTable.DataTable();

this.dataTable2.DataTable();


  }

  ngAfterViewInit() {
    Feather.replace();

  }



  obtenerempresa() {
    let model = this.tipoModel;
    model.tipo=1;
    this.organizacionService.getOrganizacion(this.session.getToken()).subscribe((res: any[])=>{     

this.empresacantidad= res.length;
this.empresa= res; 



for(var i=0;i<this.empresacantidad;i++){

 if(this.empresa[i].idEstadoOrganizacion==2){
this.empresaactiva.push(this.empresa[i]);
 }
 if(this.empresa[i].idEstadoOrganizacion<2){
   this.empresadesaciva.push(this.empresa[i]);


 }

}

})

  }


  

  obtenerConvocatoria1() {
    let model = this.tipoModel;
    model.tipo=1;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{        
      var Fecha = new Date((this.d.toString()));
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
   console.log(res);
this.convocatorias=res;
for(var i=0;i<this.convocatorias.length;i++){


  var Fecha1 = new Date((this.convocatorias[i].fechaTermino.toString()));
  var ini = new Date((this.convocatorias[i].fechaInicio.toString()));


if(Fecha1> Fecha ){
  console.log(Fecha1);
  this.convocatorias[i].Termino=Fecha1.toLocaleDateString("es-ES", options);

  this.convocatorias[i].Inicio=ini.toLocaleDateString("es-ES", options);
  this.convocatoriasf.push(this.convocatorias[i]);

}
}


})
  }


  obtenerConvocatoria2() {
    let model = this.tipoModel;
    model.tipo=2;
    this.convocatoriaService.getConvocatoriatipo(model).subscribe((res: any[])=>{
this.convocatoriasalumnos=res;
for(var i=0;i<this.convocatorias.length;i++){
  var fech= Date.parse(this.convocatorias[i].fechaTermino.toString());


if(fech < Date.now() ){
this.convocatoriasalumnosf.push(this.convocatorias[i]);

}
}



})
  }

  obtenerProyectos() {
    var id=this.session.getToken();

     this.proyectoService.getProyectoEmpresa(id).subscribe((res: any[])=>{        
     // this.proyectoService.getAll().subscribe((res: any[])=>{                    
      this.proyectos=res;



      for(var i=0;i<this.proyectos.length;i++){
      
      
      if(this.proyectos[i].idEstadoProyecto==3){
      this.proyectosactivos.push(this.proyectos[i]);
      
      }
      if(this.proyectos[i].idEstadoProyecto==4){
        this.proyectosrechazados.push(this.proyectos[i]);
        
        }
        if(this.proyectos[i].idEstadoProyecto<3 ){
          this.proyectospendientes.push(this.proyectos[i]);
          
          }
        


      }

     

  });
}

alumnoproyectos() {

  this.proyectoService.alumnosempresa(this.session.getToken()).subscribe((res: any[])=>{
    this.alumnos=res;
   
    console.log(res);
  
    
    })

}
}
