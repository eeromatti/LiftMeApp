const User = require('../models/User')

const initialUsers = [
  {
    'id': '1e56fe16-8bd9-4ceb-861d-43bed2cd18f9',
    'name': 'Keravan Kata',
    'home': [
      25.109547,
      60.404339
    ],
    'work': [
      24.951129,
      60.297889
    ],
    'role': [
      'driver',
      'passenger'
    ],
    'distance': 19574.5,
    'drivers': [],
    'passengers': []
  },
  {
    'id': '88973c73-faea-4b0e-954f-5dccb2e0f5e4',
    'name': 'Korson Kartsa',
    'home': [
      25.091123,
      60.346443
    ],
    'work': [
      24.951129,
      60.297889
    ],
    'role': [
      'driver',
      'passenger'
    ],
    'distance': 13600,
    'drivers': [],
    'passengers': []
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}