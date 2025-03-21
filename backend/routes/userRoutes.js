const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const findDistanceAndTime = require('../services/findDistanceAndTime')
const findMatchesById = require('../services/findMatchesById')
const findMatchesByBody = require('../services/findMatchesByBody')
const config = require('../utils/config')

const userRouter = express.Router()


// find all users
userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


// find user by id
userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) 
    res.json(user)
  else {
    res.status(404).json()
  } 
})


// update user information
userRouter.put('/:id', async (req, res) => {  
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (user) {
    res.json({ message: 'User updated', user })    
  } else {
    res.status(404).json()
  }
})


// update matches by id
userRouter.put('/matches/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    findMatchesById(req.params.id)
      .then(updatedUser => {
        if (!updatedUser) return
        return User.findByIdAndUpdate(req.params.id, updatedUser, { new: true })
      })
      .then(updatedUser => {
        if (updatedUser) {
          res.status(200).json({ message: 'Matches updated'})
        }
      })
      .catch(error => console.error('Error updating matches:', error))

  } catch (error) {
    console.error('Error in updating matches:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})


// create an user
userRouter.post('/signup', async (req, res) => {
  const { name, email, role, homeAddress, homeCoordinates, workAddress, workCoordinates, password, activeDays} = req.body

  // hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // find the commuting distance
  let distance, time
  if (homeCoordinates && workCoordinates) {
    const distanceAndTime = await findDistanceAndTime(homeCoordinates, workCoordinates)
    distance = distanceAndTime[0]
    time = distanceAndTime[1]
  } else {
    console.error('homeCoordinates and workCoordinates are not available or they are incorrect')
  }

  // find matches
  let { drivers, passengers } = await findMatchesByBody({ name, role, homeCoordinates, workCoordinates, distance, time })

  // create an user object
  const user = new User(
    { name, 
      email,
      role, 
      homeAddress, 
      homeCoordinates, 
      workAddress, 
      workCoordinates, 
      distance, 
      time, 
      drivers, 
      passengers,
      passwordHash,
      activeDays
    })

  if (user) {
    await user.save()
    res.status(201).json({ message: 'User created!', name })
  } else {
    res.status(400).json()
  }   
})


// login
userRouter.post('/login', async (req, res) => {
  const {email, password } = req.body
  
  // find user and check if the password given is correct
  const user = await User.findOne({ email })
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    username: user.email,
    id: user._id
  }

  // create a token
  const token = jwt.sign(userForToken, config.SECRET)

  res.status(200).send({ token, user })
})


// delete an user
userRouter.delete('/:id', async (req, res) => {  
  const user = await User.deleteOne({ _id: req.params.id })
  if (user) {
    res.json({ message: 'User deleted', user })
  } else {
    res.json()
  }
})


module.exports = userRouter