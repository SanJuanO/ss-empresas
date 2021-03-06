

export class AlumnoProyecto {
  public horasRegistradas?: number;
  public rutaCartaInicio?: string;
  public rutaCartaTermino?: string;
  public archivoCartaInicio?: string;
  public archivoCartaTermino?: string;
  public validaCartaInicio?: number;
  public validaCartaTermino?: number;
  public estadoValidaCartaInicio?: string;
  public estadoValidaCartaTermino?: string;
  public fechaInicioInstitucion?: string;

    constructor(
        public fechaCreacion:string,
        public alumno: string,
        public proyectoNombre: string,
        public idProyecto: number,
        public idAlumno: number,
        public id: number,
    ) { }

}


export class Preguntas {
  public fechaCreacion:string;
  public pregunta: string;
  public id: number
  constructor(

  ) { }

}

export class respuesta {
    constructor(
        public idAlumno:number,
        public idPregunta: number,
        public pregunta: string,
        public respuesta: string,
        public idAlumnoProyectoAsignado: number

        
    ) { }

}
export class alumnosactividades {
  public idAlumnoProyectoAsignado:number;
public actividad:string;
  public validaEmpresa: boolean;
public fechaCreacion: string;
public archivo: string;
public ruta: string;
public titulo: string;


  constructor(

      
  ) { }

}
export class alumnohoras {
  public id?:number;
  public idAlumnosProyectosAsignacion:number;
  public idProyecto:number;

  public noHoras: number;
  public activo: boolean=true;
public fechaCreacion: string;
  constructor(

      
  ) { }

}
export class alumnosasignados {
  public horasRegistradas?: number;
  public plazasAutorizadas:number;

  public idAlumno:number;
  public noHoras: number;
  public alumno:string;
  public proyectoNombre:string;
  public carrera:string;
  public universidad:string;
  public estado:string;
public idEstado: number;
public idProyecto: number;

  constructor(

      
  ) { }

}
export class Alumno {
  constructor(
    public nombre: string,
    public paterno: string,
    public materno: string,
    public matricula: string,
    public idUniversidad: number,
    public idFacultad: number,
    public idCarrera: number,
    public celular: string,
    public correoPersonal: string,
    public password: string,
    public porcentaje: number,
    public noCuatrimestreSemestre: number,
    public esquemaPeriodo: string,
    public generacion: string,
    public avanceCreditos: number,
    public fechaEstimadaGraduacion: string,
    public correoInstitucional: string,
    public fechaNacimiento: string,
    public sexo: string,
    public nombreAreaInstitucionServicioSocial: string,
    public fechaInicioServicioSocial: string,
    public horasServicioSocial: string,
    public participacionAsua: string,
    public trabajas: string,
    public idModalidadTrabajo: number,
    public cuatrimestreComienzoTrabajo: string,
    public terminosCondiciones: boolean,
    public activo: boolean,
    public listaAreaVidaUniversitariaParticipado?: AlumnosAreasVidaUniversitariaParticipado[],
    public listaAreaVidaUniversitariaActuales?: AlumnosAreasVidaUniversitariaActuales[],
    public id?: number,
    public modalidadTrabajo?: string,
    public universidad?: string,
    public facultad?: string,
    public carrera?: string,
    public fechaEstimadaGraduacionString?: string,
    public fechaNacimientoString?: string,
    public fechaInicioServicioSocialString?: string

  ) { }

}

export class AreasVidaUniversitaria{
    constructor(
      public areaVidaUniversitaria: string,
        public activo: boolean,
        public id: number
    ) { }

}
export class AlumnosAreasVidaUniversitariaParticipado {
    constructor(
      public idAreaVidaUniversitaria:number,
      public activo: boolean,
      public alumno?: string,
      public areaVidaUniversitaria?: string,
      public id?: number,
        public idAlumno?: number,

    ) { }

}
export class AlumnosAreasVidaUniversitariaActuales {
  constructor(
    public idAreaVidaUniversitaria: number,
    public activo: boolean,
    public alumno?: string,
    public areaVidaUniversitaria?: string,
    public id?: number,
    public idAlumno?: number,
    ) { }

}

export class ModalidadesTrabajo {
  constructor(
    public modalidad: number,
    public activo: boolean,
    public id: number,
    ) { }
}



export class RespuestasOrganizacion{
  constructor(
    public idAlumnoProyectoAsignado: number,
    public idAlumno: number,
    public idPregunta: number,
    public activo: boolean = true,
    public respuesta: string,
    public version: number,
    public pregunta?: string,
  ) { }
}



