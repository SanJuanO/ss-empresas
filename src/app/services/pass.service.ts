import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class passServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(email) {

  
   console.log(email);

   const uri = `${this.api}/OrganizacionesResponsables/olvidePassword?correo=${email}`;
    console.log(uri);
    return this.http.post(uri,email);
 
  } 
  
}
