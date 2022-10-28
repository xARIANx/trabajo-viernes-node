import  Express  from 'express';
import { ControladorHabitacion } from '../Controllers/ControladorHabitacion.js';
let controladorHabitacion = new ControladorHabitacion() //USANDO EL CONTROLADOR DE HABITACIONES

import { ControladorReserva } from '../Controllers/ControladorReserva.js';
let controladorReserva = new ControladorReserva() //USANDO EL CONTROLADOR DE RESERVAS

export let rutasPersonalisadas = Express.Router()

//Habitaciones
rutasPersonalisadas.get('/hotelesNick/habitaciones', controladorHabitacion.buscarHabitaciones)
rutasPersonalisadas.get('/hotelesNick/habitacion/:idHabitacion', controladorHabitacion.buscarHabitacionPorId)
rutasPersonalisadas.post('/hotelesNick/habitacion', controladorHabitacion.registrarHabitacion)
rutasPersonalisadas.put('/hotelesNick/habitacion/:idHabitacion', controladorHabitacion.editarHabitacion)
rutasPersonalisadas.delete('/hotelesNick/habitacion/:idHabitacion', controladorHabitacion.anularHabitacion)

//Reservas
rutasPersonalisadas.get('/hotelesNick/reserva', controladorReserva.consultarReservas)
rutasPersonalisadas.get('/hotelesNick/reserva/:idReserva', controladorReserva.consultarReservaPorId)
rutasPersonalisadas.post('/hotelesNick/reserva', controladorReserva.agregarReserva)
rutasPersonalisadas.put('/hotelesNick/reserva/:idReserva', controladorReserva.editarReserva)
rutasPersonalisadas.delete('/hotelesNick/reserva/:idReserva', controladorReserva.anularReserva)