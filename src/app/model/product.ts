export class Product {
    id_Usuario!: number;
    nombre: string;
    correo: string;
    telefono: number;
    sede: string;
    codigo_Estudiante: string;
    estado: string;
    rol: string;

    constructor(nombre: string, correo: string, telefono: number, sede: string, codigo_Estudiante: string, estado: string, rol: string){
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.sede = sede;
        this.codigo_Estudiante = codigo_Estudiante;
        this.estado = estado;
        this.rol = rol;
    }
}
