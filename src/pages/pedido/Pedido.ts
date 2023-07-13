export default interface Pedido {
    id_pedido: number;
    fechaPedido: string;
    fechaEntrega: string;
    id_cliente: {
        id_cliente: number;
        nombre: string;
        apellido: string;
        direccion: string;
        dni: string;
        email: string;
    };
}
