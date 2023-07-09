export function searchDespachos() {
    if (!localStorage['despachos']) {
        localStorage['despachos'] = '[]';
    }
    let despachos = localStorage['despachos'];
    despachos = JSON.parse(despachos);
    return despachos
}

export function removeDespacho(id: string) {
    let despachos = searchDespachos();

    let indice = despachos.findIndex((despacho: any) => despacho.id == id);
    despachos.splice(indice, 1)
    localStorage['despachos'] = JSON.stringify(despachos);
}

export function saveDespacho(despacho: any) {
    let despachos = searchDespachos();
    despachos.push(despacho)
    localStorage['despachos'] = JSON.stringify(despachos);
}