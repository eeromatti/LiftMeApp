import axios from 'axios'

const travelTimeAndDistance = async (start, end, pickupCoordinates, ORS_KEY) => {
  
  
  try {
    // if pickupPoints exist
    if (pickupCoordinates.length > 0) {
      
      // pickup points into a list
      let jobs = [] 
      for (let i = 1; i <= pickupCoordinates.length; i++) {
        
        jobs.push({ id: i, location: pickupCoordinates[i - 1] })
      }
  
      //vehicle object
      let vehicle = [{'id':1,'profile':'driving-car','start':start,'end':end}]

      //optimize the route
      const response = await axios.post(
        'https://api.openrouteservice.org/optimization', 
        {
          jobs: jobs,
          vehicles: vehicle
        },
        {
          headers: {
            'Authorization': ORS_KEY,
            'Content-Type': 'application/json'
          }
        }
      )

      //route coordinates into a list 
      const steps = response.data.routes[0].steps
      let list = []
      for (let i = 0; i < steps.length; i++) {
        list.push(steps[i].location)
      }
    
      // find duration and distance
      const duration = parseInt(response.data.summary.duration/60)

      const timeData = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
          'coordinates':list
        },
        {
          headers: {
            'Authorization': ORS_KEY,
            'Content-Type': 'application/json'
          }
        }
      )

      // find distance
      const distance = timeData.data.routes[0].summary.distance

      // return routepoints, distance and duration
      return [list, distance, duration]
    
    } else {

      // no pickup point exist      
      const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
        params: {
          api_key: ORS_KEY,
          start: start.join(', ').toString(),
          end: end.join(', ').toString(),
        }})
      return Array(response.data.features[0].properties.summary.distance, response.data.features[0].properties.summary.duration) 
    }
  } catch (error) {
    console.error('Error calculating distance:', error.message)
    throw new Error('Failed to optimize the route, calculate the distance and travel time')
  }
}



const addressToCoordinates = async (address) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    )
    const data = await response.json()

    if (data.length > 0) {
      return data[0].boundingbox
    } else {
      return null
    }
  } catch (error) {
    console.error('Error in finding coordinates:', error)
  }
}


export default { travelTimeAndDistance, addressToCoordinates }