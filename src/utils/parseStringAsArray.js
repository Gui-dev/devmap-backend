module.exports = parseStringAsArray = ( arrayAsString ) => {

  return arrayAsString.split( ',' ).map( arr => arr.trim() )
}
