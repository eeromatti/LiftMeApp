const findDistanceAndTime = require('./findDistanceAndTime')
const User = require('../models/User')

const findMatchesByBody = async ({name, role, homeCoordinates, workCoordinates, distance, time }) => {
    
  // initialize arrays for passengers and drivers
  let passengers = []
  let drivers = []

  // find all users
  const users = await User.find()
    
  // iterate all users
  try {
    for (let i = 0; i < users.length; i++) {
    
      // if passenger in user's role, find drivers
      if (role.includes('passenger') && users[i].role.includes('driver') && users[i].name !== name) {
        let driversHome = users[i].homeCoordinates
        let passengersHome = homeCoordinates
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   
        
        // add driver if the total travel time is less than 50% longer
        if (totalTime < 1.5 * users[i].time) {
          if (!drivers.some(driver => driver.name === users[i].name)) {
            drivers.push({ 
              name: users[i].name, 
              distance: totalDistance, 
              time: totalTime, 
              deltaDistance: parseInt(totalDistance - users[i].distance),
              deltaTime: parseInt(totalTime - users[i].time)
            })
          }
        } 
      }
      
      // if driver in user's role, find passengers
      if (role.includes('driver') && users[i].role.includes('passenger') && users[i].name !== name) {
        let driversHome = homeCoordinates
        let passengersHome = users[i].homeCoordinates
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   

        // add passanger if total travel time less than 50% longer
        if (totalTime < 1.5 * time) {
          if (!passengers.some(passenger => passenger.name === users[i].name)) {
            console.log('total time < 1.3*time -> lisätään matkustaja')
            passengers.push({ 
              name: users[i].name, 
              distance: totalDistance, 
              time: totalTime,
              deltaDistance: parseInt(totalDistance - distance),
              deltaTime: parseInt(totalTime - time)
            })
          }
        }
      }
    }

    // sort drivers and passangers by deltaTime
    drivers.sort((a, b) => a.deltaTime - b.deltaTime)
    passengers.sort((a, b) => a.deltaTime - b.deltaTime)

    return drivers, passengers

  }  catch (error) {
    console.error('Error in finding matches:', error)
  }
}
            
module.exports = findMatchesByBody