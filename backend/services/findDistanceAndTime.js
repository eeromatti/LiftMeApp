const axios = require('axios')
const config = require('../utils/config')

const findDistanceAndTime = async (start, end) => {
  try {
    // console.log('start:', start)
    // console.log('end:', end)
    let startString = start.join(',').toString()
    let endString = end.join(',').toString()

    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        api_key: config.ORS_API_KEY,
        start: startString,
        end: endString,
      }})
    return Array(response.data.features[0].properties.summary.distance, response.data.features[0].properties.summary.duration) 
  } catch (error) {
    console.error('Error calculating distance:', error.message)
    throw new Error('Failed to calculate distance')
  }
}

module.exports = findDistanceAndTime