const express = require('express');
const cors = require('cors');


class Server {
    constructor (){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/usuarios';

        //Middlewares (funciones que añaden otras funcionalidad a los webservers).
        this.middlewares();

        //Rutas de mi aplicación.
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body.
        this.app.use(express.json());//Cualquier informacion que venga de put, get, etc lo serializa a json.

        //Directorio Público.
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }


    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
