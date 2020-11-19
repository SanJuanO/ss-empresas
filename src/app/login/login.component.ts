import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { OrganizationService } from '../services/organization.service';

declare var $: any;

@Component({
  selector: '',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public mensaje="";
public organizacion="";



  constructor(private organizacionService: OrganizationService,public session: SessionService,private router: Router,private loginservice: LoginServices){ }

  ngOnInit(): void {
    this.session.Signoff();

  }

  onSubmit(data) {
let user= $('#usuario').val();
let pass=$('#pass').val();
    this.loginservice.login(user,pass).subscribe((res: any)=>{
      this.mensaje=res['mensaje'];

if(res['resultado']==1){
  var datosvalue=res['datos'];




  this.session.setDatos(datosvalue['nombreCompletoResponsable'],datosvalue['nombreCompletoDirector'],datosvalue['puesto'],datosvalue['departamento'],datosvalue['usuario'],
  pass,datosvalue['telefono'],datosvalue['correo'],datosvalue['externa'],datosvalue['id']);

  this.session.setToken(datosvalue['idOrganizacion']);
  this.session.setexterna(datosvalue['externa']);
  this.session.setapellidos(datosvalue['nombreCompletoDirector']);

  console.log(datosvalue);

  this.session.setnombre(datosvalue['organizacion']);
 



var tempo=datosvalue['idOrganizacion'];
console.log(tempo);
if( tempo == '0'){
this.router.navigate(['/empresas/add']);

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
      this.router.navigate(['/empresas/add']);
    
    }else{
      this.router.navigate(['/dashboard']);
    
    }

      
    })
  }
  
}
