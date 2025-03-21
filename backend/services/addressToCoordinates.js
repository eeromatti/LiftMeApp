// find coordinates for an address
const addressToCoordinates = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    )
    const data = await response.json()
  
    if (data.length > 0) {
      return data[0].boundingbox
    } else {
      console.log('No results')
    }
  } catch (error) {
    console.error('Error in finding coordinates:', error)
  }
}

module.exports = addressToCoordinates