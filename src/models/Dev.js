const { model, Schema } = require( 'mongoose' )

const Dev = new Schema( {
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [ String ]
} )

module.exports = model( 'Dev', Dev )
