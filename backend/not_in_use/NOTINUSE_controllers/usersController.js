// const axios = require('axios')
// const config = require('../utils/config')
// const { v4: uuidv4 } = require('uuid')
// const User = require('../models/User')

// // find all users
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find()
//     console.log('users:', users)
//     // const response = await axios.get(`${config.SERVER_ADDRESS}/users`);
//     res.json(response.data)
//   } catch (error) {
//     res.status(500).json({ error: 'Virhe käyttäjien haussa' })
//   }
// }

// // find user by id
// const getUserById = async (req, res) => {
//   try {
//     const response = await axios.get(`${config.SERVER_ADDRESS}/users/${req.params.id}`)
//     res.json(response.data)
//   } catch (error) {
//     res.status(404).json({ error: 'Käyttäjää ei löytynyt' })
//   }
// }

// //add user
// const addUser = async (req, res) => {
//   try {
//     const currentUsers = (await axios.get(`${config.SERVER_ADDRESS}/users`)).data
        
//     //find the distance
//     const start = req.body.home.join(',')
//     const end = req.body.work.join(',')
        
//     // typeof start
//     // typeof end
//     // console.log("start:", typeof start)
//     // console.log("end:", end)

//     const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
//       params: {
//         api_key: process.env.ORS_API_KEY,
//         start: start,
//         end: end,
//       }})
//     const distance = response.data.features[0].properties.summary.distance
        
//     //new user
//     const userBody = {
//       'id': uuidv4(),
//       ...req.body,
//       'distance': distance
//     }
//     const newUser = await axios.post(`${config.SERVER_ADDRESS}/users/`, userBody)
//     res.json(userBody)
//   } catch (error) {
//     res.status(500).json({ error: 'Virhe käyttäjän lisäämisessä' })
//   }
// }

// // update user by id
// const updateUserById = async (req, res) => {
//   try {
//     console.log('req body:', req.body)
//     const response = await axios.put(`${config.SERVER_ADDRESS}/users/${req.params.id}`, req.body)
//     res.json(response.data)
//   } catch (error) {
//     res.status(500).json({ error: 'Virhe käyttäjän päivityksessä' })
//   }
// }

// // update users
// const updateUsers = async (req, res) => {
//   try {
//     const response = await axios.put(`${config.SERVER_ADDRESS}/users/`, req.body)
//     res.json(response.data)
//   } catch (error) {
//     res.status(500).json({ error: 'Virhe käyttäjien päivityksessä' })
//   }
// }

// module.exports = { getUsers, getUserById, updateUserById, updateUsers, addUser }  
