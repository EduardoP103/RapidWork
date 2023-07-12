import Despacho from "./Despacho";

import { ENV_DEV, ENV_PROD } from '../../env/env'
import { CONSTANTES } from "../../utils/utils";
const URL_BASE = CONSTANTES.local ? ENV_DEV.ENDPOINT_OFFICE_SERVICE : ENV_PROD.ENDPOINT_OFFICE_SERVICE
const API = CONSTANTES.pathDespacho
const URL = URL_BASE + API
export async function searchDespachos() {
    debugger
    let response = await fetch(URL, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}

export async function removeDespacho(id: string) {
    await fetch(URL + id, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json'
        }
    })

}

export async function saveDespacho(cliente: Despacho) {
    await fetch(URL, {
        "method": 'POST',
        "body": JSON.stringify(cliente),
        "headers": {
            "Content-Type": 'application/json'
        }
    });
}



export async function searchDespachoById(id: string) {
    debugger
    let response = await fetch(URL + id, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json'
        }
    })
    return await response.json();

}