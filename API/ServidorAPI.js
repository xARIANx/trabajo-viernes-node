import express from 'express'
import { rutasPersonalisadas } from '../Routes/rutas.js';
import { conectarConMongo } from '../Database/conexion.js';

export class ServidorAPI{
    constructor(){
        this.app = express()
        this.conectarConBD()
        this.activarBody()
        this.atenderPeticiones()
    }

    //METODOS DE LA CLASE ServidorAPI
    despertarServidor(){
        this.app.listen(process.env.PORT, function(){
            console.log("Exito servico activo: " + process.env.PORT);
        })
    }

    atenderPeticiones(){
        this.app.use('/', rutasPersonalisadas)
    }

    conectarConBD(){
        conectarConMongo()
    }

    activarBody(){
        this.app.use(express.json())
    }
}