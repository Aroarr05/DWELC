export interface Evento {
    id: string;
    asunto: string;
    descripcion: string;
    fecha: string;
    cliente: string;
    empleado: string;
    categoria: "log" | "warn" | "error";
    horaCreacion: string;
}