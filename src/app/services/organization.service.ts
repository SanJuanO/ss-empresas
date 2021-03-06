import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresa,estadoActualizar,Pass,tt } from '../models/empresa';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/share';
import { Estadosalumnoscambio } from '../models/estadosalumnoss';
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  api = environment.baseUrl


  constructor(private http: HttpClient) { }

respuestapreguntas(model){
    const uri = `${this.api}/RespuestasEvaluacionAlumno/addRespuestas`;
         console.log(uri);
    return this.http.post(uri,model);
  }






  getAll(){
    return this.http.get(`${this.api}/Organizaciones`);
  }
  getOrganizacion(id: string | number){
    const uri = `${this.api}/Organizaciones/${id}`;
         console.log(uri);
    return this.http.get(uri);
  }
  getestadosalumnos(){
    const uri = `${this.api}/EstadosAlumnosProyectos`;
         console.log(uri);
    return this.http.get(uri);
  }

  obtenerdirecciones(cp){
    const uri = `${this.api}/VSepomex/GetFromCp?cp=${cp}`
    return this.http.post(uri, cp,{ withCredentials: false});
  }
  getcordinaciones(){
    const uri = `${this.api}/Cordinaciones`;
    return this.http.get(uri);
  }
  getescueladireccion(){
    const uri = `${this.api}/Direcciones`;
    return this.http.get(uri);
  }
  getvice(){
    const uri = `${this.api}/Vicerrectorias`;
    return this.http.get(uri);
  }

  getAreas(){
    const uri = `${this.api}/AreasAccion`;
    return this.http.get(uri);
  }
  getdocumentos(){
    const uri = `${this.api}/Documentos`;
    return this.http.get(uri);
  }

  getRubros(){
    const uri = `${this.api}/Rubros`;
    return this.http.get(uri);
  }
  getUniversidades(){
    const uri = `${this.api}/Universidades`;
    return this.http.get(uri);
  }
  getUniversidades2(){
    const uri = `${this.api}/Universidades2`;
    return this.http.get(uri);
  }
  getTipo(){
    const uri = `${this.api}/TiposOrganizaciones`;
    return this.http.get(uri);
  }
  getempresapermiso(){
    const uri = `${this.api}/Organizaciones/getOrganizacionesWithPermisoEditar`;
    return this.http.get(uri);
  }

  getGiro(){
    const uri = `${this.api}/GirosOrganizaciones`;
    return this.http.get(uri);
  }
  getClasificacion(){
    const uri = `${this.api}/ClasificacionesOrganizaciones`;
    return this.http.get(uri);
  }
  getEstado(){
    const uri = `${this.api}/EstadosOrganizaciones
    `;
    return this.http.get(uri);
  }
  eliminar(id : string | number){
    const uri = `${this.api}/Organizaciones/${id}`;
    return this.http.delete(uri);
  }

  obtenerDocumentosSubidos(id: string | number) {
    const uri = `${this.api}/DocumentosOrganizaciones/getDocumentoByIdOrganizacion?idOrganizacion=${id}`
    return this.http.get(uri);
  }
  obtenerDocumentosSubidosConRequeridos(id: string | number) {
    const uri = `${this.api}/DocumentosOrganizaciones/getDocumentoByIdOrganizacionWithRequeridos?idOrganizacion=${id}`
    return this.http.post(uri,null);
  }
  subirdocumentos(model){
    const uri = `${this.api}/DocumentosOrganizaciones/UploadFile`
    return this.http.post(uri, model,{ withCredentials: false});
  }

  subirdocumentoscadena(model){
    const uri = `${this.api}/DocumentosOrganizaciones/saveDocuments`
    return this.http.post(uri, model);
  }
  cambiarpass(id,pass){
    console.log(id+pass);
    var p=new Pass(id,pass);

    const uri = `${this.api}/OrganizacionesResponsables/updatePassword?idResponsable=${id}&password=${pass}`
    return this.http.post(uri, p);
  }


  create(model){
    const uri = `${this.api}/Organizaciones/CreateWithImage`
    return this.http.post(uri, model);
  }
  createWithDetails(model){
    const uri = `${this.api}/CreateWithDetails`
    return this.http.post(uri, model);
  }
  updateempresa(id: string | number,empresa: Empresa) {
    empresa.id = Number(id);
    empresa.activo = true;
    return this.http.post(`${this.api}/Organizaciones/UpdateWithImage`, empresa);
  }
  updateestado(estadoAct: estadoActualizar) {
    let estado=estadoAct;
console.log(estado);


    return this.http.put(`${this.api}/Organizaciones/actualizaEstado?idOrganizacion=${estado.idOrganizacion}&idEstado=${estado.idEstado}&observaciones=${estado.observaciones}`, estado);
  }

  updateestadoalumno(estadoAct: Estadosalumnoscambio) {
    let estado=estadoAct;
    console.log(estado);
    return this.http.put(`${this.api}/AlumnosProyectosAsignados/actualizaEstado?idProyecto=${estadoAct.idProyecto}&idAlumno=${estadoAct.idAlumno}&idEstado=${estadoAct.idEstado}&observaciones=${estadoAct.observacions}`, estado);
  }

  getSucesosByIdOrganizacion(idOrganizacion: string | number) {
    return this.http.get(`${this.api}/OrganizacionesSucesos/getByIdOrganizacion?idOrganizacion=${idOrganizacion}`);
  }

  postFile(fileToUpload: File,idDocumento:string,idOrganizacion:string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.api}/DocumentosOrganizaciones/UploadFile2`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('idDocumento', idDocumento);
    formData.append('idOrganizacion', idOrganizacion);
    return this.http.post(endpoint, formData);
  }
  postFileImage(fileToUpload: File,idOrganizacion:string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.api}/DocumentosOrganizaciones/UploadImagen`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData);
  }

  permisopedir(id){
    var p=Number(id);
    console.log(p);
    const uri = `${this.api}/Organizaciones/pedirPermiso?idOrganizacion=${p}`;
         console.log(uri);
    return this.http.post(uri,p);
  }
  
  actualizarfechaalumno(fecha,id){
    
    const uri = `${this.api}/AlumnosProyectosAsignados/actualizaFechaInicioInstitucionByIdAlumnoProyectoAsignado?idAlumnoProyectoAsignado=${id}&fecha=${fecha}`
    return this.http.post(uri, fecha);
  }

}
