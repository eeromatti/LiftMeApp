const { test, after, beforeEach } = require('node:test')
const User = require('../models/User') 
const findDistance = require('../services/findDistance')
const mongoose = require('mongoose')
const assert = require('node:assert/strict')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(helper.initialUsers[0])
  await userObject.save()
  userObject = new User(helper.initialUsers[1])
  await userObject.save()
})


test('there are two users', async () => {
  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, helper.initialUsers.length)
})
  
test('the first user is Keravan Kata', async () => {
  const response = await api.get('/api/users')
  const users = response.body.map(u => u.name)
  assert(users.includes('Keravan Kata'))
})

test('a valid user can be added ', async () => {
  const newUser =     {
    'name': 'Mäntsälän Make',
    'home': [
      25.32421,
      60.637702
    ],
    'work': [
      24.951129,
      60.297889
    ],
    'role': [
      'driver',
      'passenger'
    ],
    'distance': 54300,
    'drivers': [],
    'passengers': []
  }
  
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/users')
  const names = response.body.map(u => u.name)
  assert.strictEqual(response.body.length, helper.initialUsers.length + 1)
  assert(names.includes('Mäntsälän Make'))
})

test('calculate distance for a user', async() => {
  const response = await api.get('/api/users')
  const user = response.body[0]
  const distance = await findDistance(user.home, user.work)
  assert.strictEqual(distance, user.distance)
})

test('find matches for users', async() => {
  const response = await api.get('/api/users')
  const userId = response.body[0]._id
  
  await api
    .put(`/api/users/matches/${userId}`)
    .expect(200)

  const users = await helper.usersInDb()
  assert(users[0].passengers.includes('Korson Kartsa'))  
})


after(async () => {
  await mongoose.connection.close()
})