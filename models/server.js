// Servidor de Express
const express   = require('express')
const http      = require('http')
const socketio  = require('socket.io')
const path      = require('path')
const Sockets   = require('./sockets')

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    // Http server
    this.server = http.createServer( this.app )

    // socket configuration
    this.io = socketio( this.server, { /* config */ } )
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use(express.static( path.resolve( __dirname, '../public') ) )
  }

  socketsConfig() {
    new Sockets( this.io )
  }

  execute() {
    // Init middlewares
    this.middlewares()

    // Init sockets
    this.socketsConfig()

    // Init server
    this.server.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }

}

module.exports = Server

