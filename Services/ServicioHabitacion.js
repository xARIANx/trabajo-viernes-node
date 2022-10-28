import { modeloHabitacion } from "../models/ModeloHabitacion.js";

import { modeloReserva } from "../models/ModeloReserva.js";

//SERVICIOS PARA HABITACIONES
export class ServicioHabitacion{
    //AQUI PROGRAMO METODOS PARA ACDA UNA DE LAS CONSULTAS QUE QUIER HACEN EN BD HABITACIONES
    async buscarHabitaciones(){
        let habitaciones = await modeloHabitacion.find()
        return habitaciones
    }

    async buscarHabitacionPorId(id){
        let habitacion = await modeloHabitacion.findById(id)
        return habitacion
    }

    async agregarHabitacionEnBD(datos){
        let datosValidados = new modeloHabitacion(datos)
        return await datosValidados.save()
    }

    async editarHabitacion(id, datos){
        return await modeloHabitacion.findByIdAndUpdate(id, datos)
    }

    async eliminarHabitacion(id){
        return await modeloHabitacion.findByIdAndDelete(id)
    }
}

//SERVICIOS PARA RESERVAS
export class ServicioReserva{
    //AQUI PROGRAMO METODOS PARA ACDA UNA DE LAS CONSULTAS QUE QUIER HACEN EN BD RESERVAS
    async consultarReservas(){
        let reservas = await modeloReserva.find()
        return reservas
    }

    async consultarReservaPorId(id){
        let reserva = await modeloReserva.findById(id)
        return reserva
    }

    async agregarReservaEnBD(datos){
        let datosvalidados = new modeloReserva(datos)
        return await datosvalidados.save()
    }

    async editarReserva(id, datos){
        return await modeloReserva.findByIdAndUpdate(id, datos)
    }

    async eliminarReserva(id){
        return await modeloReserva.findByIdAndDelete(id)
    }
}