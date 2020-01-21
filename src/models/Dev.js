const { model, Schema } = require( 'mongoose' )
const PointSchema = require( './utils/PointSchema' )

const Dev = new Schema( {
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [ String ],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
}, {
  timestamps: true
} )

module.exports = model( 'Dev', Dev )
