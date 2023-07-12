import Inventario from "./Inventario";

import { ENV_DEV, ENV_PROD } from '../../env/env'
import { CONSTANTES } from "../../utils/utils";
const URL_BASE = CONSTANTES.local ? ENV_DEV.ENDPOINT_INVENTORY_SERVICE : ENV_PROD.ENDPOINT_INVENTORY_SERVICE
const API = CONSTANTES.pathInventario
const URL = URL_BASE + API
export async function searchInventarios() {
    debugger
    let response = await fetch(URL, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}

export async function removeInventario(id: string) {
    await fetch(URL + id, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveInventario(inventario: Inventario) {
    await fetch(URL, {
        "method": 'POST',
        "body": JSON.stringify(inventario),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}



export async function searchInventarioById(id: string) {
    debugger
    let response = await fetch(URL + id, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}