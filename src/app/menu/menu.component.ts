import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
public nombre="";
public id=1;
public logo="assets/images/aaa.jpg";

public apellidos="";
  constructor(private organizacionService: OrganizationService, private router: Router,public session: SessionService) { 
    this.logo=session.getlogo();
    
    if(this.session.getToken()==""){
      this.router.navigate(['/'])    
    }
    this.id=Number(this.session.getToken());


    this.nombre=this.session.getnombre();
    this.apellidos=this.session.getapellidos();

  }
  ngOnInit(): void {
    this.obtenerempresa();
  }



  obtenerempresa() {
    this.organizacionService.getOrganizacion(this.session.getToken()).subscribe((res: any[])=>{     

      var logg=res['imagenArchivo'];

      if(logg.length>0){
        this.logo ="data:image/jpeg;base64,"+ logg;
        this.session.setlogo(this.logo);
      }  

    


})

  }
}
