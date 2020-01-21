require( 'dotenv' ).config()
const express = require( 'express' )
const mongoose = require( 'mongoose' )
const cors = require( 'cors' )

const routes = require( './routes' )
const databaseConfig = require( './config/database' )

class App {

  constructor() {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database() {
    mongoose.connect( databaseConfig.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    } )
  }

  middlewares() {
    this.app.use( express.json() )
    this.app.use( cors() )
  }

  routes() {
    this.app.use( routes )
  }

}

module.exports = new App().app
