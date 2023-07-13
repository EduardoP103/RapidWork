import { Key } from "react";

export default interface Producto {
    id_producto(id_producto: any): string;
    id: Key | null | undefined;
    productoId: string;
    nombre: string;
    descripcion: string;
    precio: string;
    imagen: string;
    ofertaId: string
}