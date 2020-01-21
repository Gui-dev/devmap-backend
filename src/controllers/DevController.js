const Dev = require( './../models/Dev' )
const axios = require( 'axios' )

class DevController {

  async store( request, response ) {

    const { github_username, techs, latitude, longitude } = request.body
    const { data } = await axios.get( `https://api.github.com/users/${github_username}` )
    const { name = login, avatar_url, bio } = data

    const techsArray = techs.split( ',' ).map( tech => tech.trim() )
    const location = {
      type: 'Point',
      coordinates: [ longitude, latitude ]
    }

    const dev = await Dev.create( {
      name,
      github_username,
      bio,
      avatar_url,
      techs: techsArray,
      location
    } )

    return response.status( 201 ).json( dev )

  }

}

module.exports = new DevController()
