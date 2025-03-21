const axios = require('axios')
const config = require('../utils/config')

// find travel distance between two coordinates
const findDistance = async (start, end) => {
  try {
    const startString = start.join(',').toString()
    const endString = end.join(',').toString()
    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        api_key: config.ORS_API_KEY,
        start: startString,
        end: endString,
      }})
    return response.data.features[0].properties.summary.distance
  } catch (error) {
    console.error('Error calculating distance:', error.message)
    throw new Error('Failed to calculate distance')
  }
}

module.exports = findDistance