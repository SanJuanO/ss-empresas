// src/app/users/users.service.ts

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }
  register(user): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }
  setToken(token) {
    this.cookies.set("sesionid", token);
  }

  setDatos(nombreCompletoResponsable,nombreCompletoDirector,puesto,departamento,usuario,contrasena,telefono,correo,externa,idresponsable) {
    this.cookies.set("nombreCompletoResponsable", nombreCompletoResponsable);
    this.cookies.set("nombreCompletoDirector", nombreCompletoDirector);
    this.cookies.set("puesto", puesto);
    this.cookies.set("departamento", departamento);
    this.cookies.set("usuario", usuario);
    this.cookies.set("contrasena", contrasena);
    this.cookies.set("telefono", telefono);
    this.cookies.set("correo", correo);
    this.cookies.set("externa", externa);
    this.cookies.set("idresponsable", idresponsable);

  }
  setexterna(ex) {
    console.log(ex);
    if(ex){
      this.cookies.set("externa", "1");

    }else
    this.cookies.set("externa", "0");
  }
  setnombre(token) {
    this.cookies.set("nombre", token);
  }
  setapellidos(token) {
    this.cookies.set("apellidos", token);
  }
  getapellidos() {
    return this.cookies.get("apellidos");
  } 
   getnombre() {
    return this.cookies.get("nombre");
  }
  getexterna() {

var txt=     this.cookies.get("externa");
if(txt=="1"){
  return true;

}else{
  return false;
}
  }
  getToken() {
    return this.cookies.get("sesionid");
  }
  Signoff() {
    this.cookies.delete("sesionid");
    this.cookies.delete("apellidos");
    this.cookies.delete("nombre");


  }

}