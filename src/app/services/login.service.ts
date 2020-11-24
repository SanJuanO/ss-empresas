import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';
import { login } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(ingresar) {

    const uri = `${this.api}/Organizaciones/login`;
    console.log(ingresar);
    return this.http.post(uri,ingresar);
 
  } 
  
}
