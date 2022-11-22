const extract = require('geojson-extract-geometries')
/**
 * Converts JSON format coordinates to GEOJson and then converts to Poly format coordinates
 * Converts JSON format coordinates to Poly format coordinates
 * @param {JSON} geoCoords - Coordinates of the polygon 
 */
function JSONtoPoly(jsonData) {

    let geoCoords = { "type": "Polygon", "coordinates": [] }
    for (let point of jsonData) {

        let properties = point
        let latitude = point['lat']
        let longitude = point['lng']
        delete properties.longitude
        delete properties.latitude
        let feature = [latitude, longitude]
        geoCoords.coordinates.push(feature)
    }
    var polies = extract(geoCoords, 'Polygon')
    var polyText = 'poly2-'

    polies.forEach(function (poly, ind) {
        polyText = polyText + ind + '\n' + 1 + '\n'
        poly.coordinates.forEach(function (p) {
            polyText = polyText + '\t' + p.join('\t') + '\n'
        })
        polyText = polyText + 'END\nEND\n'
    })
    return (polyText)
}

module.exports = JSONtoPoly