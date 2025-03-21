const User = require('../models/User')

const initialUsers = [
  {
    'name': 'Keravan Kata',
    'email': 'keravankata@liftmeapp.com',
    'role': ['driver', 'passenger'],
    'homeAddress': 'Hakalantie 3, Kerava',
    'homeCoordinates': [ 25.112389, 60.402341 ],
    'workAddress': 'Toinen savu 1, Vantaa',
    'workCoordinates': [ 24.951325, 60.298465 ],
    'password': 'salainen',
    'activeDays': ['Mo', 'Tu', 'We', 'Th', 'Fr']
  },
  {
    'name': 'Korson Kartsa',
    'email': 'korsonkartsa@liftmeapp.com',
    'role': ['driver', 'passenger'],
    'homeAddress': 'Korsonpolku 7, Vantaa',
    'homeCoordinates': [ 25.074938, 60.351008 ],
    'workAddress': 'Toinen savu 1, Vantaa',
    'workCoordinates': [ 24.951325, 60.298465 ],
    'password': 'salainen',
    'activeDays': ['Mo', 'Tu', 'We', 'Th', 'Fr']
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}