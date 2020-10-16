import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Usuario } from '../models/usuario';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  api = environment.baseUrl;

  constructor(private http:HttpClient) { }


  login(user,pass) {


    const uri = `${this.api}/Organizaciones/login?usuario=${user}&contrase%C3%B1a=${pass}`;
    console.log(uri);
    return this.http.get(uri,user);
 
  } 
  
}
