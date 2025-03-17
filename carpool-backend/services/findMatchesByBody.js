const findDistanceAndTime = require('./findDistanceAndTime')
const User = require('../models/User')

const findMatchesByBody = async ({name, role, homeCoordinates, workCoordinates, distance, time }) => {
    
  // initialization
  let passengers = []
  let drivers = []

  // fetch users
  const users = await User.find()
  // console.log('haetaan kuskit ja matkustajat henkilölle:', name)
    
  // iterate all users
  try {
    for (let i = 0; i < users.length; i++) {
    // find drivers
      if (role.includes('passenger') && users[i].role.includes('driver') && users[i].name !== name) {
        console.log('kuskiksi user?', users[i].name)
        let driversHome = users[i].homeCoordinates
        let passengersHome = homeCoordinates
        console.log('driversHome:', driversHome)
        console.log('passengersHome:', passengersHome)
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   
        console.log('total time:', totalTime)
        console.log('total distance', totalDistance)
        console.log('users time:', users[i].time)
        
        // add driver if total travel time less than 25% longer
        if (totalTime < 1.5 * users[i].time) {
          if (!drivers.some(driver => driver.name === users[i].name)) {
            console.log('total time < 1.3*users time -> lisätään kuski')
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
      
      // find passangers
      if (role.includes('driver') && users[i].role.includes('passenger') && users[i].name !== name) {
        console.log('matkustajaksi user:', users[i].name)
        let driversHome = homeCoordinates
        let passengersHome = users[i].homeCoordinates
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   
        console.log('total time:', totalTime)
        console.log('total distance', totalDistance)
        console.log('time:', time)     

        // add passanger if total travel time less than 25% longer
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

    // console.log('passengers unsorted:', passengers)
    // sort drivers and passangers by deltaTime
    drivers.sort((a, b) => a.deltaTime - b.deltaTime)
    passengers.sort((a, b) => a.deltaTime - b.deltaTime)
    // console.log('passengers sorted:', passengers)
    console.log('drivers', drivers)
    console.log('passengers', passengers)

    return drivers, passengers

  }  catch (error) {
    console.error('Error in finding matches:', error)
  }
}
            
module.exports = findMatchesByBody