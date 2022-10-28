//const express = require('express')
import * as dotenv from 'dotenv'
dotenv.config()
import {ServidorAPI} from './API/ServidorAPI.js'

let servidorHoteles = new ServidorAPI() 
servidorHoteles.despertarServidor()
