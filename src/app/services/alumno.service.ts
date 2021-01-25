

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno,alumnohoras } from '../models/alumno';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  postFileAlumno(fileToUpload: File, idDocumento: string, idAlumno: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data; charset=utf-8');
    const endpoint = `${this.baseUrl}/DocumentosAlumnos/UploadFileAlumno`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('idDocumento', idDocumento);
    formData.append('idAlumno', idAlumno);
    return this.http.post(endpoint, formData);
  }

  obtenerDocumentosSubidosConRequeridos(id: string | number) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/getDocumentoByIdAlumnoWithRequeridos?idAlumno=${id}`
    return this.http.get(uri);
  }



  getAlumnos() {

  // getAlumnos(dataTablesParameters: any) {
    return this.http.get(`${this.baseUrl}/Alumnos`);

    //  return this.http
    //       .get<DataTablesResponse>(
    //         `${this.baseUrl}/Alumnos/getAllTabla`,
    //         dataTablesParameters
    //       );

  }

  getAlumno(id: string | number) {
    return this.http.get(`${this.baseUrl}/Alumnos/${id}`);
  }
  getProyectoAlumno(id: string | number) {
    let idalumno=Number(id);
    console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/getByIdAlumno?idAlumno=${idalumno}`);
  }
  getencuesta(id,version) {
    return this.http.get(`${this.baseUrl}/RespuestasEvaluacionAlumno/getByIdAlumnoProyectoAsignadoAndVersion?IdAlumnoProyectoAsignado=${id}&version=${version}`);
  }
  getpreguntas() {
    return this.http.get(`${this.baseUrl}/PreguntasEvaluacionAlumno`);
  }
  addAlumno(alumno: Alumno) {
    return this.http.post(`${this.baseUrl}/Alumnos`, alumno);
  }

  deleteAlumno(alumno: Alumno) {
    return this.http.delete(`${this.baseUrl}/delete.php?idAlumno=${alumno.id}`);
  }

  updateAlumno(id: string | number,alumno: Alumno) {
    alumno.id = Number(id);
    alumno.activo = true;
    return this.http.put(`${this.baseUrl}/Alumnos/${id}`, alumno);
  }
  getdocumentosRequeridos() {
    const uri = `${this.baseUrl}/DocumentosRequeridosAlumnos`;
    return this.http.get(uri);
  }

  subirdocumentos(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/UploadFile`
    return this.http.post(uri, model);
  }
  subirdocumentoscadena(model) {
    const uri = `${this.baseUrl}/DocumentosAlumnos/saveDocuments`
    return this.http.post(uri, model);
  }
  
  getrespuesta(id: string | number) {
    return this.http.get(`${this.baseUrl}/RespuestasEvaluacionAlumno/getByIdAlumno?IdAlumno=${id}`);
  }
  agregarhoras(id,no) {
    var am = new alumnohoras();
    am.idAlumnosProyectosAsignacion=Number(id);
    am.noHoras=Number(no);
    console.log(am);

    const uri = `${this.baseUrl}/AlumnosProyectosAsignadosHoras`
   return this.http.post(uri, am);
  }
  horas(id) {
   
    var i=Number(id);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignadosHoras/getHorasByIdProyectoAsignado?idAlumnoProyectoAsignado=${i}`);

  }

  activadades(id) {
   
    var i=Number(id);
    return this.http.get(`${this.baseUrl}/AlumnosActividades/getByIdAlumnoProyectoAsignado?idAlumnoProyectoAsignado=${i}`);

  }

  validaractivadades(id) {
   
    var i=Number(id);
    return this.http.post(`${this.baseUrl}/AlumnosActividades/validaActividad?id=${i}`,id);

  }

  getAlumnoProyectoAsignado(idAlumnoProyectoAsignado: string | number) {
    let idalumno = Number(idAlumnoProyectoAsignado);
    console.log(idalumno);
    return this.http.get(`${this.baseUrl}/AlumnosProyectosAsignados/  ${idAlumnoProyectoAsignado}`);
  }
}
