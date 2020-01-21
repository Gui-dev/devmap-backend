const { Router } = require("express")
const routes = Router()

routes.get("/", (req, res) => {
  return res.send("Hello World")
})

const Dev = require( './../controllers/DevController' )

routes.post( '/devs', Dev.store )

module.exports = routes
