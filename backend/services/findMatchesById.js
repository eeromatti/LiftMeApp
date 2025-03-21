const findDistanceAndTime = require('./findDistanceAndTime')
const User = require('../models/User')

const findMatchesById = async (id) => {
  console.log('kutsutaan findMatchesById-funktiota')
  try {
    
    // find user information
    const user = await User.findById(id)
    const { homeCoordinates, workCoordinates, role, distance, time } = user
    if (!user) {
      console.error('User not found:', id)
    }

    // initialize arrays for passengers and drivers
    user.drivers = []
    user.passengers = []

    // find all users
    const users = await User.find()
    
    // iterate all users
    for (let i = 0; i < users.length; i++) {
      
      // if passenger in user's role, find drivers
      if (role.includes('passenger') && users[i].role.includes('driver') && users[i].id !== id) {
        let driversHome = users[i].homeCoordinates
        let passengersHome = homeCoordinates
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   

        // add driver if total travel time less than 50% longer
        if (totalTime < 1.5 * users[i].time) {
          if (user.drivers.length === 0 || !user.drivers.some(driver => driver.name === users[i].name)) {
            user.drivers.push({ 
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
      if (role.includes('driver') && users[i].role.includes('passenger') && users[i].id !== id) {
        let driversHome = homeCoordinates
        let passengersHome = users[i].homeCoordinates
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]       

        // add passanger if total travel time less than 25% longer
        if (totalTime < 1.5 * time) {
          if (user.passengers.length === 0 || !user.passengers.some(passenger => passenger.name === users[i].name)) {
            user.passengers.push({ 
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

    const updatedUser = user.toObject()
    updatedUser.drivers = user.drivers.sort((a, b) => a.deltaTime - b.deltaTime)
    updatedUser.passengers = user.passengers.sort((a, b) => a.deltaTime - b.deltaTime)
    console.log('user object after matching:', updatedUser)

    return updatedUser

  }  catch (error) {
    console.error('Error in finding matches:', error)
  }
}
            
module.exports = findMatchesById