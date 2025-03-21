// const axios = require('axios')
// const config = require('../utils/config')
// const { findDistance } = require('../services/findDistance')

// // find route points
// const findRoutePoints = async (home, work) => {
//   try {
//     const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
//       params: {
//         api_key: process.env.ORS_API_KEY,
//         start: home.join(','),
//         end: work.join(','),
//       },
//     })
//     return response.data.features[0].geometry.coordinates
    
//   } catch (error) {
//     res.status(500).json({ error: 'coordinates not available' })
//   };
// }


// const saveUserRoutePoints = async (req, res) => {
//   try {
//     const user = (await axios.get(`${config.SERVER_ADDRESS}/users/${req.params.id}`)).data

//     const routePoints = await findRoutePoints(user.home, user.work)
//     user.routePoints = routePoints
//     res.json(routePoints)
//     await axios.put(`${config.SERVER_ADDRESS}/users/${req.params.id}`, user)
    
//   } catch (error) {
//     res.send(500).json({ error: 'coordinates not available' })
//   }
// }






// const findMatches = async (req, res) => {
//   try {
//     // fetch users
//     const response = await fetch('http://localhost:3001/users')
//     const users = await response.json()

//     let matches = []
//     for (let i = 0; i < users.length; i++) {
//       for (let j = i + 1; j < users.length; j++) {
        
//         // user i is a driver and user j is a passenger 
//         if (users[i].role.includes('driver') && users[j].role.includes('passenger')) {
//           let driversHome = users[i].home.toString()
//           let passengersHome = users[j].home.toString()
//           const distanceToPickup = await findDistance(driversHome, passengersHome)
          
//           let workplace = users[j].work.toString()
//           const distanceToWork = await findDistance(passengersHome, workplace)

//           if (distanceToPickup && distanceToWork) {
//             const totalDistance = distanceToPickup + distanceToWork
//             const maxDistance = parseFloat(users[i].distance) * 1.3
            
//             if (totalDistance < maxDistance) {
//               users[i].passengers.push(users[j].name)
//               users[j].drivers.push(users[i].name)
//             }
//           }
//         }
        
//         // user i is a passenger and user j is a driver
//         if (users[i].role.includes('passenger') && users[j].role.includes('driver')) {
//           let driversHome = users[j].home.toString()
//           let passengersHome = users[i].home.toString()
//           const distanceToPickup = await findDistanceAndTime(driversHome, passengersHome)
          
//           let workplace = users[i].work.toString()
//           const distanceToWork = await findDistanceAndTime(passengersHome, workplace)

//           if (distanceToPickup && distanceToWork) {
//             const totalDistance = distanceToPickup + distanceToWork
//             const maxDistance = parseFloat(users[j].distance) * 1.3
            
//             if (totalDistance < maxDistance) {
//               users[j].passengers.push(users[i].name)
//               users[i].drivers.push(users[j].name)
//             }
//           }
//         }
//       }
//     }

//     console.log('users:', users)
//     const update = await axios.put(`${config.SERVER_ADDRESS}/users/`, users)
//     // console.log("Update successful:", update.data);
    
//     res.json(update.data)
//   } catch (error) {
//     console.error('Error in finding matches:', error)
//     res.status(500).json({ error: 'Internal Server Error' })
//   }
// }
  



// module.exports = { saveUserRoutePoints, findRoutePoints, findMatchesForAll }
