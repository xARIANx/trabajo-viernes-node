import { response } from "express"

import { ServicioHabitacion } from "../Services/ServicioHabitacion.js";
let servicioHabitacion = new ServicioHabitacion()
import { ServicioReserva } from "../Services/ServicioHabitacion.js";
let servicioReserva = new ServicioReserva()

export class ControladorHabitacion{
    constructor(){

    }

    async buscarHabitaciones(req, res){
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            res.status(200).json({
                "mensaje" :"exito en la consulta",
                "datos":await objetoServicioHabitacion.buscarHabitaciones(),
            })
        } catch (error) {
            res.status(400).json({
                "mensaje" :"error en la consulta" + error,
                "datos":null
            })
        }
        //res.send("Estoy buscando habitaciones desde el controlador")
    }

    async buscarHabitacionPorId(req, res){
        let datosEnviadosEnURL = req.params.idHabitacion
        //console.log('El id es: ' + datosEnviadosEnURL)
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            res.status(200).json({
                "mensaje" :"exito en la consulta por id " + datosEnviadosEnURL,
                "datos":await objetoServicioHabitacion.buscarHabitacionPorId(datosEnviadosEnURL)
            })
        } catch (error) {
            res.status(400).json({
                "mensaje" :"error en la consulta por id" + error,
                "datos":null
            })
        }

    }

    async registrarHabitacion(req, res){
        let datosHabitacion = req.body //OBTENGO DATOS DEL BODY
        //console.log(datosHabitacion)
        let objetoServicioHabitacion = new ServicioHabitacion()

        try {
            console.log(datosHabitacion.numeroMaximoPersonas)
            if (datosHabitacion.numeroMaximoPersonas < 8) {
                await objetoServicioHabitacion.agregarHabitacionEnBD(datosHabitacion)
                res.status(200).json({
                    "mensaje" :"exito en el registro",
                    "datos":datosHabitacion,
                })
            }else{
                res.status(400).json({
                    "mensaje" :"la habitacion tiene cupo solo para 8 personas",
                    "datos":null
                })
            }
        } catch (error) {
            res.status(400).json({
                "mensaje" :"error en el registro" + error,
                "datos":null
            })
        }

    }

    async editarHabitacion(req, res){
        let id = req.params.idHabitacion
        let datosHabitacion = req.body
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            await objetoServicioHabitacion.editarHabitacion(id, datosHabitacion)
            res.status(200).json({
                "mensaje" :"exito en la edición de la habitación" + id,
                "datos":datosHabitacion,
            })
        } catch (error) {
            res.status(400).json({
                "mensaje":"error en la edición de la habitación" + error,
                "datos":null
            })
        }
    }

    async anularHabitacion(req, res){
        let id = req.params.idHabitacion
        let objetoServicioHabitacion = new ServicioHabitacion()
        try {
            await objetoServicioHabitacion.eliminarHabitacion(id)
            res.status(200).json({
                "mensaje":"La habitacion con id " + id + " fue eliminada",
                "datos":null
            })
        } catch (error) {
            res.status(200).json({
                "mensaje":"Error, la habitacion no ha sido eliminada " + error,
                "datos":null
            })
        }
    }
}