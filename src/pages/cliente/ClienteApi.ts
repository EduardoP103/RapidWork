import Cliente from "./Cliente";

import { ENV_DEV, ENV_PROD } from '../../env/env'
import { CONSTANTES } from "../../utils/utils";
const URL_BASE = CONSTANTES.local ? ENV_DEV.ENDPOINT_CLIENT_SERVICE : ENV_PROD.ENDPOINT_CLIENT_SERVICE
const API = CONSTANTES.pathCliente
const URL = URL_BASE + API
export async function searchClientes() {
    debugger
    let response = await fetch(URL, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}

export async function removeCliente(id: string) {
    await fetch(URL + id, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveCliente(cliente: Cliente) {
    await fetch(URL, {
        "method": 'POST',
        "body": JSON.stringify(cliente),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}

export async function searchClienteById(id: string) {
    debugger
    let response = await fetch(URL + id, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}