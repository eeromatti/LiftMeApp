const axios = require('axios')
const config = require('../utils/config')


// find travel distance and time between two coordinates
const findDistanceAndTime = async (start, end) => {
  try {
    let startString = start.join(',').toString()
    let endString = end.join(',').toString()

    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      params: {
        api_key: '5b3ce3597851110001cf624822e45f0905f24e5eaec55239fa29d426',
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