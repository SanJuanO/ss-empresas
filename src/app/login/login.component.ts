import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { OrganizationService } from '../services/organization.service';
import { login } from '../models/empresa';
import { ThrowStmt } from '@angular/compiler';


declare var $: any;

@Component({
  selector: '',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public mensaje="";
public organizacion="";
public logo="assets/images/aaa.jpg";
public url:string;
public log:login = new login();
  constructor(private organizacionService: OrganizationService,public session: SessionService,private router: Router,private loginservice: LoginServices){ }
  
  
  getUrl(){
    //Se obtiene el valor de la URL desde el navegador
    var actual = window.location+'';
    //Se realiza la división de la URL
    var split = actual.split("/");
    //Se obtiene el ultimo valor de la URL
    var id = split[split.length-1];
    console.log(id);
}
  ngOnInit(): void {

    this.session.Signoff();
    var URLactual = window.location;
this.url=String(URLactual);
if(this.url.includes("oerroc")){

  var t=this.url.split("oerroc=")
  var valor = t[1];

var datos=valor.split(",");
$('#usuario').val(datos[0]);
$('#pass').val(datos[1]);

this.onSubmit("t");
}

  }

  onSubmit(data) {
let user= $('#usuario').val();
let pass=$('#pass').val();
this.session.setlogo(this.logo);

var ingresar= new login();
ingresar.usuario=user;
ingresar.contrasena=pass;

    this.loginservice.login(ingresar).subscribe((res: any)=>{
      console.log(res);
      this.mensaje=res['mensaje'];

if(res['resultado']==1){
  var datosvalue=res['datos'];




  this.session.setDatos(datosvalue['nombreCompletoResponsable'],datosvalue['nombreCompletoDirector'],datosvalue['puesto'],datosvalue['departamento'],datosvalue['usuario'],
  pass,datosvalue['telefono'],datosvalue['correo'],datosvalue['externa'],datosvalue['id']);

  this.session.setToken(datosvalue['idOrganizacion']);
  this.session.setexterna(datosvalue['externa']);
  this.session.setnombre(datosvalue['organizacion']);

  this.session.setapellidos(datosvalue['nombreCompletoResponsable']);

  console.log(datosvalue);

 



  var tempo = datosvalue['idOrganizacion'];
  
console.log(tempo);

if( tempo == '0'){

this.router.navigate(['/instituciones/add']);

}else{
  this.router.navigate(['/dashboard']);


}

}else{



  var x = document.getElementById("alerta");
    x.style.display = "block";

}

    }, error=>{

      this.mensaje=("no se encontro el correo");
      var x = document.getElementById("alerta");
        x.style.display = "block";
    })
    
    

  

  }
  ocultar() {
    var x = document.getElementById("alerta");
      x.style.display = "none";

    

  

  }
  getempresa(id){
    this.organizacionService.getOrganizacion(id).subscribe((res: any[])=>{
      console.log(res);
      var nomb=res['cordinacion'];
      var vice=res['vicerrectoria'];

      console.log(nomb);
      this.session.setnombre(vice+"/"+nomb);

    
      var tempo=id;
      console.log(tempo);

    if( tempo == '0'){
      this.router.navigate(['/instituciones/add']);
    
    }else{
      //this.router.navigate(['/dashboard']);
    
    }

      
    })
  }



  
}
