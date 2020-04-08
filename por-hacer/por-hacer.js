// FyleSystem
const fs = require('fs');

// array
let listadoPorHacer = [];

const guardarDB = () => {

    // JSON.stringify convierte un objeto a un JSON completamete valido
    let data = JSON.stringify(listadoPorHacer)

    // const data = new Uint8Array(Buffer.from('Hello Node.js'));
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    return listadoPorHacer

}
const crear = (descripcion) => {

    cargarDB();
    // objeto
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    return cargarDB();
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    const newListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    if (listadoPorHacer.length === newListado.length) {
        return false
    } else {
        listadoPorHacer = newListado
        guardarDB();
        return true;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}