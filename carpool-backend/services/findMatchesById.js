const findDistanceAndTime = require('./findDistanceAndTime')
const User = require('../models/User')

// req: id, role, home, work, distance
const findMatchesById = async (id) => {
  console.log('kutsutaan findMatchesById-funktiota')
  try {
    
    //fetch user
    const user = await User.findById(id)
    const { homeCoordinates, workCoordinates, role, passengers, drivers, distance, time } = user
    if (!user) {
      console.error('User not found:', id)
    }

    console.log('user:', user)
    console.log('users homeCoordinates:', user.homeCoordinates)
    //empty current drivers and passengers
    user.drivers = []
    user.passengers = []

    // fetch users
    const users = await User.find()
    console.log('haetaan kuskit ja matkustajat henkilölle:', user.name)
    
    // iterate all users
    for (let i = 0; i < users.length; i++) {
      console.log('other user:', users[i].name)
      // find drivers
      if (role.includes('passenger') && users[i].role.includes('driver') && users[i].id !== id) {
        console.log(users[i].name, 'on potentiaalinen kuski')
        let driversHome = users[i].homeCoordinates
        let passengersHome = homeCoordinates
        console.log('driversHome coordinates:', users[i].homeCoordinates)
        console.log('passengersHome coordinates:', homeCoordinates)
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]   

        // add driver if total travel time less than 25% longer
        if (totalTime < 1.25 * users[i].time) {
          if (user.drivers.length === 0 || !user.drivers.some(driver => driver.name === users[i].name)) {
            console.log('lisätään kuski', users[i].name)
            user.drivers.push({ 
              name: users[i].name, 
              distance: totalDistance, 
              time: totalTime, 
              deltaDistance: parseInt(totalDistance - users[i].distance),
              deltaTime: parseInt(totalTime - users[i].time)
            })
          }
        } 
      } else {
        console.log(users[i].name, 'ei ole potentiaalinen kuski')
      }
      
      // find passangers
      if (role.includes('driver') && users[i].role.includes('passenger') && users[i].id !== id) {
        console.log(users[i].name, 'on potentiaalinen kyytiläinen')
        let driversHome = homeCoordinates
        let passengersHome = users[i].homeCoordinates
        console.log('driversHomeCoordinates:', driversHome)
        console.log('passengersHomeCoordinates:', passengersHome)
        const distanceAndTimeToPickup = await findDistanceAndTime(driversHome, passengersHome)
        const distanceAndTimeToWork = await findDistanceAndTime(passengersHome, workCoordinates)
        const totalDistance = distanceAndTimeToPickup[0] + distanceAndTimeToWork[0]
        const totalTime = distanceAndTimeToPickup[1] + distanceAndTimeToWork[1]       

        // add passanger if total travel time less than 25% longer
        if (totalTime < 2 * time) {
          if (user.passengers.length === 0 || !user.passengers.some(passenger => passenger.name === users[i].name)) {
            console.log('lisätään kyytiläinen', users[i].name)
            user.passengers.push({ 
              name: users[i].name, 
              distance: totalDistance, 
              time: totalTime,
              deltaDistance: parseInt(totalDistance - distance),
              deltaTime: parseInt(totalTime - time)
            })
          }
        }
      } else {
        console.log(users[i].name, 'ei ole potentiaalinen kyytiläinen')
      }
    }

    console.log('potentiaaliset kuskit:', drivers)
    console.log('potentiaaliset kyytiläiset', passengers)
    
    drivers.sort((a, b) => a.deltaTime - b.deltaTime)
    passengers.sort((a, b) => a.deltaTime - b.deltaTime)

    console.log('user after the matching:', user)

    return user

  }  catch (error) {
    console.error('Error in finding matches:', error)
  }
}
            
module.exports = findMatchesById