import axios from 'axios'

// OA: A complex, branched function like this should maybe be split into subfunctions, for example:

export async function getTravelTimeAndDistance(routeCoordinates, pickupCoordinates, ORS_KEY) {
    const route = getRoute(routeCoordinates, pickupCoordinates, ORS_KEY)
    return { travelTime: route.travelTime, distance: route.distance };
}

async function getRoute(routeCoordinates, pickupCoordinates, ORS_KEY) {
    if (pickupCoordinates?.length) {
        return await getRouteWithPickupCoordinates(routeCoordinates, pickupCoordinates, ORS_KEY)
    };
  return await getDirectRoute(routeCoordinates, ORS_KEY);
}

async function getRouteWithPickupCoordinates(...) {
  ...
}

async function getDirectRoute(...) {
  ...
}


// OA: THOUGH to me it seems that we could maybe combine these into just one call, just adjusting the list of route points, so something like:
async function getTravelTimeAndDistance(routeCoordinates, pickupCoordinates, ORS_KEY) {
    const routePoints = getRoutePoints(routeCoordinates, pickupCoordinates)
    const route = await getRoute(routePoints, ORS_KEY);
    return { travelTime: route.travelTime, distance: route.distance };
}

function getRoutePoints(routeCoordinates, pickupCoordinates) 
    if (!routeCoordinates) throw Error('Route coordinates required.');

    if (pickupCoordinates) {
      return [routeCoordinates.start, pickupCoordinates, routeCoordinates.end];
    }
    return [routeCoordinates.start, routeCoordinates.end];
}
// OA: END-OF-EXAMPLE

const travelTimeAndDistance = async (start, end, pickupCoordinates, ORS_KEY) => {
  

  try {
    // if pickupPoints exist
    if (pickupCoordinates.length > 0) {
      
      // pickup points into a list

      // OA: To wrangle a list into a different form, you don't need to
      // mutate an existing list with a for loop. Instead, you can just call
      // .map on the array like so:
      const jobs = pickupCoordinates.map((coords, index) => { return { id: index + 1, location: coords } });

      // OA: END-OF-EXAMPLE
      
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

      // OA: It's a good idea to be quite specific about any errors in places where they can happen, and be
      // verbose in the error messages so that it's easy to understand/debug/communicate what went wrong.

      const steps = response.data.routes?.[0]?.steps;
      if (!steps?.length) throw Error('Route steps missing in response')

      const stepLocations = steps.map(step => step.location);

      // OA: END-OF-EXAMPLE
      
      const steps = response.data.routes[0].steps
      let list = []
      for (let i = 0; i < steps.length; i++) {
        list.push(steps[i].location)
      }
    
      // find duration and distance
      const duration = parseInt(response.data.summary.duration/60)


      // OA: All these separate API calls should maybe be separated into their own functions
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
