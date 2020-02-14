const Dev = require( './../models/Dev' )
const axios = require( 'axios' )

const parseStringAsArray = require( './../utils/parseStringAsArray' )
const { findConnections, sendMessage } = require( './../services/websocket' )

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

      const techsArray = parseStringAsArray( techs )
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

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo DEV tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessaTo = findConnections( 
        { latitude,  longitude },
        techsArray 
      )

      sendMessage( sendSocketMessaTo, 'new-dev', dev )
    }

    return response.status( 201 ).json( dev )

  }

}

module.exports = new DevController()
