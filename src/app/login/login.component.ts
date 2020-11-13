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
let user= $('#usuario').val()
let pass=$('#pass').val()
console.log(user+pass);
    this.loginservice.login(user,pass).subscribe((res: any)=>{
if(res['resultado']==1){
  var datosvalue=res['datos'];




  this.session.setDatos(datosvalue['nombreCompletoResponsable'],datosvalue['nombreCompletoDirector'],datosvalue['puesto'],datosvalue['departamento'],datosvalue['usuario'],
  pass,datosvalue['telefono'],datosvalue['correo'],datosvalue['externa'],datosvalue['id']);

  this.session.setToken(datosvalue['idOrganizacion']);
  this.session.setexterna(datosvalue['externa']);

  this.session.setnombre(datosvalue['organizacion']);
  this.session.setapellidos(datosvalue['nombreCompletoDirector']);

  var tempo=datosvalue['idOrganizacion'];
  console.log(tempo);
if( tempo == '0'){
  this.router.navigate(['/empresas/add']);

}else{
  this.router.navigate(['/dashboard']);

}

}else{
  this.mensaje=res['mensaje'];
  $('#success-modal-preview').modal('show');

}

    }, error=>{
      alert(error.error)
    })
    
    

  

  }

}
