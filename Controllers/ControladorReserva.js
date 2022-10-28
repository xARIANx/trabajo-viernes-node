import { response } from "express";

import { ServicioReserva } from "../Services/ServicioHabitacion.js";
let servicioReserva = new ServicioReserva()

import { ServicioHabitacion } from "../Services/ServicioHabitacion.js";
let servicioHabitacion = new ServicioHabitacion()

export class ControladorReserva{
    constructor(){

    }

    async consultarReservas(req, res){
        let objetoServicioReserva = new ServicioReserva()
        try {
            res.status(200).json({
                "mensaje" :"Exito en la consulta general",
                "datos":await objetoServicioReserva.consultarReservas(),
            })
        } catch (error) {
            res.status(400).json({
                "mensaje" :"error en la consulta" + error,
                "datos":null
            })
        }
    }

    async consultarReservaPorId(req, res){
        let id = req.params.idReserva
        //console.log('El id de la reserva es: ' + id)
        let objetoServicioReserva = new ServicioReserva()
        try {
            res.status(200).json({
                "mensaje" :"exito en la consulta por id: " + id,
                "datos":await objetoServicioReserva.consultarReservaPorId(id)
            })
        } catch (error) {
            res.status(400).json({
                "mensaje" :"error en la consulta por id " + error,
                "datos":null
            })
        }
    }

    async agregarReserva(req, res){
        let datosReserva = req.body
        //console.log(datosReserva)
        let objetoServicioReserva = new ServicioReserva()
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            let datosHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)
            let maximoDePersonas = datosHabitacion.numeroMaximoPersonas
            let totalPersonas = datosReserva.numeroDeNiños + datosReserva.numeroDeAdultos
            let fechaDeIngreso = new Date(datosReserva.fechaDeEntrada)
            let fechaDeExtraccion = new Date(datosReserva.fechaDeSalida)
            const diffInDays = Math.floor((fechaDeExtraccion - fechaDeIngreso) / (1000 * 60 * 60 * 24))
            let costo = 0
            if (diffInDays > 0) {
                if (maximoDePersonas >= totalPersonas) {
                    console.log(datosHabitacion.valorNoche, diffInDays)
                    costo = Number(datosHabitacion.valorNoche) * Number(diffInDays)
                    datosReserva.costoDeReserva = costo
                    console.log(datosReserva)
                    await objetoServicioReserva.agregarReservaEnBD(datosReserva)
                    res.status(200).json({
                        "mensaje" :"Reserva exitosa",
                        "datos":datosReserva,
                    })
                }else{
                    response.status(400).json({
                        "mensaje" : "La habitacion no esta capacitado para reservar a mas de " + maximoDePersonas,
                        "datos" : null,
                    })
                }
            }else{
                response.status(400).json({
                    "mensaje" : "Debes dijitar una fecha valida, como minimo debes quedarte un día",
                    "datos" : null,
                })
            }
        } catch (error) {
            res.status(400).json({
                "mensaje" :"Error en el guardado " + error,
                "datos":null
            })
        }
    }

    async editarReserva(req, res){
        let id = req.params.idReserva
        let datosReserva = req.body
        let objetoServicioReserva = new ServicioReserva()
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            let datosHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)
            let maximoDePersonas = datosHabitacion.numeroMaximoPersonas
            let totalPersonas = datosReserva.numeroDeNiños + datosReserva.numeroDeAdultos
            let fechaDeIngreso = new Date(datosReserva.fechaDeEntrada)
            let fechaDeExtraccion = new Date(datosReserva.fechaDeSalida)
            const diffInDays = Math.floor((fechaDeExtraccion - fechaDeIngreso) / (1000 * 60 * 60 * 24))
            let costo = 0
            if (diffInDays > 0) {
                if (maximoDePersonas >= totalPersonas) {
                    console.log(datosHabitacion.valorNoche, diffInDays)
                    costo = Number(datosHabitacion.valorNoche) * Number(diffInDays)
                    datosReserva.costoDeReserva = costo
                    console.log(datosReserva)
                    await objetoServicioReserva.agregarReservaEnBD(datosReserva)
                    res.status(200).json({
                        "mensaje" :"Reserva exitosa",
                        "datos":datosReserva,
                    })
                }else{
                    response.status(400).json({
                        "mensaje" : "La habitacion no esta capacitado para reservar a mas de " + maximoDePersonas,
                        "datos" : null,
                    })
                }
            }else{
                response.status(400).json({
                    "mensaje" : "Debes dijitar una fecha valida, como minimo debes quedarte un día",
                    "datos" : null,
                })
            }
        } catch (error) {
            res.status(400).json({
                "mensaje" :"Error en el guardado " + error,
                "datos":null
            })
        }
    }

    async anularReserva(req, res){
        let id = req.params.idReserva
        let objetoServicioReserva = new ServicioReserva()
        try {
            await objetoServicioReserva.eliminarReserva(id)
            res.status(200).json({
                "mensaje" :"La reserva con id " + id + " fue eliminada",
                "datos":null
            })
        } catch (error) {
            res.status(400).json({
                "mensaje" :"Error, la reserva no ha sido eliminada " + error,
                "datos":null
            })
        }
    }
}