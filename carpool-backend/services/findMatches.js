const findDistance = require('./findDistance')
const User = require('../models/User')

// req: id, role, home, work, distance
const findMatches = async (id) => {
  try {
    const user = await User.findById(id)
    const { home, work, role, distance, passengers, drivers } = user
    // fetch users
    const users = await User.find()

    for (let i = 0; i < users.length; i++) {
        
      // find drivers if role is passenger
      if (role.includes('passenger') && users[i].role.includes('driver') && users[i].id !== id) {
        let driversHome = users[i].home
        let passengersHome = home
        const distanceToPickup = await findDistance(driversHome, passengersHome)
        const distanceToWork = await findDistance(passengersHome, work)
        const totalDistance = distanceToPickup + distanceToWork

        if (totalDistance < 1.2 * users[i].distance) {
          if (!drivers.includes(users[i].name)) {
            drivers.push(users[i].name)
          }
        }
      }
        
      //find passangers if role is driver
      if (role.includes('driver') && users[i].role.includes('passenger') && users[i].id !== id) {
        let driversHome = home
        let passengersHome = users[i].home
        const distanceToPickup = await findDistance(driversHome, passengersHome)
        const distanceToWork = await findDistance(passengersHome, work)
        const totalDistance = distanceToPickup + distanceToWork

        if (totalDistance < 1.2 * distance) {
          if (!passengers.includes(users[i].name))
            passengers.push(users[i].name)
        }
      }
    }
    return user
    
  } catch (error) {
    console.error('Error in finding matches:', error)
  }
}
            

module.exports = findMatches