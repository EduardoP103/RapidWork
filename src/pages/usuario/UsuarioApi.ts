import Usuario from "./Usuario";

import { ENV_DEV, ENV_PROD } from '../../env/env'
import { CONSTANTES } from "../../utils/utils";
const URL_BASE = CONSTANTES.local ? ENV_DEV.ENDPOINT : ENV_PROD.ENDPOINT
const API = CONSTANTES.pathUsuario
const URL = URL_BASE + API
export async function searchUsuarios() {
    debugger
    let response = await fetch(URL, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}

export async function removeUsuario(id: string) {
    await fetch(URL + id, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveUsuario(usuario: Usuario) {
    await fetch(URL, {
        "method": 'POST',
        "body": JSON.stringify(usuario),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}



export async function searchUsuarioById(id: string) {
    debugger
    let response = await fetch(URL + id, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}