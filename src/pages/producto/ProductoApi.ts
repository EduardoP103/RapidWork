import Producto from "./Producto";

import { ENV_DEV, ENV_PROD } from '../../env/env'
import { CONSTANTES } from "../../utils/utils";
const URL_BASE = CONSTANTES.local ? ENV_DEV.ENDPOINT : ENV_PROD.ENDPOINT
const API = CONSTANTES.pathProducto
const URL = URL_BASE + API
export async function searchProductos() {
    debugger
    let response = await fetch(URL, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}

export async function removeProducto(id: string) {
    await fetch(URL + id, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveProducto(producto: Producto) {
    await fetch(URL, {
        "method": 'POST',
        "body": JSON.stringify(producto),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}



export async function searchProductoById(id: string) {
    debugger
    let response = await fetch(URL + id, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}