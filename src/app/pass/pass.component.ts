import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  passServices } from '../services/pass.service';
import { SessionService } from '../services/session.service';
import {Location} from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class passComponent implements OnInit {
public mensaje="";
public mostrar="hidden";

  constructor(public session: SessionService,private router: Router,private passservice: passServices,private _location: Location){ }
  ngOnInit(): void {
    this.session.Signoff();

  }

  enviar(){
    let correo=$('#correo').val();

    console.log(correo);
    this.passservice.login(correo).subscribe((res: any)=>{
      console.log(res);
if(res){
  this.mensaje=("Contraseña enviada")
  var x = document.getElementById("alerta");

        x.style.display = "block";
      
      }else{
  this.mensaje="Correo no encontrado";
  var x = document.getElementById("alerta");

        x.style.display = "block";
  $('#success-modal-preview').modal('show');

}

    }, error=>{
      var x = document.getElementById("alerta");
      this.mensaje="No se pudo enviar la contraseña, verifique el correo"
        x.style.display = "block";
      
    
    })
    



  }
  ocultar() {
    var x = document.getElementById("alerta");
      x.style.display = "none";

    

  

  }

}
