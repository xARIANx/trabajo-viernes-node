import mongoose from 'mongoose';

/*ESQUEMA DE DATOS ES UN ESTANDAR DONDE APARECEN SOLO LOS DATOS CON LOS QUE EL API VA A TRABAJAR*/
const Schema = mongoose.Schema;

const EsquemaDeHabitacion = new Schema({
    nombre:{
        required: true,
        type: String,
    },
    valorNoche:{
        required: true,
        type: Number,
    },
    descripcion:{
        required: true,
        type: String,
    },
    fotografias:{
        reqeried: true,
        type: [String],
    },
    numeroMaximoPersonas:{
        required: true,
        type: Number,
    }
});

export const modeloHabitacion = mongoose.model('habitaciones', EsquemaDeHabitacion)