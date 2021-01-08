import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { OrganizationService } from '../services/organization.service';
import { login } from '../models/empresa';
import { ThrowStmt } from '@angular/compiler';
import * as CryptoJS from 'crypto-js';

import { RecaptchaModule } from "ng-recaptcha";

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
public validado=false;

public log:login = new login();
  constructor(private organizacionService: OrganizationService,public session: SessionService,private router: Router,private loginservice: LoginServices){ }
  resolved(captchaResponse: string) {
    this.validado=true;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  
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



var datos=valor.split("%20,%20");

var wwwww=datos[0].replace('%3D', '');
var wwww=wwwww.replace('%3D', '');
var www=wwww.replace('%3D', '');

var d=www.replace('%3D', '');

var SSSS=datos[1].replace('%3D', '');
var SSS=SSSS.replace('%3D', '');
var SS=SSS.replace('%3D', '');
var d1=SS.replace('%3D', '');

console.log(atob(d));
console.log(atob(d1));

var a=String(atob(d));
var b=String(atob(d1));


$('#usuario').val(a);
$('#pass').val(b);
this.validado=true;
this.onSubmit("t");
}

  }

  onSubmit(data) {
    if(this.validado){
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


  this.session.setdocuemntos();


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
    else{
      this.mensaje=("Falta el captcha");
      var x = document.getElementById("alerta");
        x.style.display = "block";
    
    }

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
