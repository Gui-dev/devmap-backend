const Dev = require( './../models/Dev' )
const axios = require( 'axios' )

class DevController {

  async index( request, response ) {

    const devs = await Dev.find()

    return response.status( 201 ).json( devs )
  }

  async store( request, response ) {

    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne( { github_username } )

    if( !dev ) {

      const { data } = await axios.get( `https://api.github.com/users/${github_username}` )
      const { name = login, avatar_url, bio } = data

      const techsArray = techs.split( ',' ).map( tech => tech.trim() )
      const location = {
        type: 'Point',
        coordinates: [ longitude, latitude ]
      }

      dev = await Dev.create( {
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      } )
    }

    return response.status( 201 ).json( dev )

  }

}

module.exports = new DevController()
