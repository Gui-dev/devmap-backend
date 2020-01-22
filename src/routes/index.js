const { Router } = require("express")
const routes = Router()

routes.get("/", (req, res) => {
  return res.send("Hello World")
})

const Dev = require( './../controllers/DevController' )
const Search = require( './../controllers/SearchController' )

routes.get( '/devs', Dev.index )
routes.post( '/devs', Dev.store )

routes.get( '/search', Search.index )

module.exports = routes
