import mongoose from 'mongoose';

/*ESQUEMA DE DATOS ES UN ESTANDAR DONDE APARECEN SOLO LOS DATOS CON LOS QUE EL API VA A TRABAJAR*/
const Schema = mongoose.Schema;

const EsquemaDeReserva = new Schema({
    idHabitacion:{
        required: true,
        type: String,
    },
    fechaDeEntrada:{
        required: true,
        type: Date,
    },
    fechaDeSalida:{
        required: true,
        type: Date,
    },
    numeroDeAdultos:{
        required: true,
        type: Number,
    },
    numeroDeNiños:{
        required: true,
        type: Number,
    },
    costoDeReserva:{
        required: true,
        type: Number,
    }
});

export const modeloReserva = mongoose.model('reserva', EsquemaDeReserva)