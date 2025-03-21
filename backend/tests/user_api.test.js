const { test, after, before } = require('node:test')
const User = require('../models/User') 
const mongoose = require('mongoose')
const assert = require('node:assert/strict')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

before(async () => {
  await User.deleteMany({})
})

test('user can be created', async () => {
  await api
    .post('/api/users/signup')
    .send(helper.initialUsers[0])
    .expect(201)
  const response = await api.get('/api/users')
  const user = response.body[0]
  assert.strictEqual(user.name, 'Keravan Kata')
})

test('new user is created and the previously added is going to be a potential driver', async () => {
  await api
    .post('/api/users/signup')
    .send(helper.initialUsers[1])
    .expect(201)
  const response = await api.get('/api/users')
  const user = response.body[1]
  assert.strictEqual(user.drivers[0].name, 'Keravan Kata')
})

test('update matches for the user first added', async () => {
  // find the id of the user first added
  const response = await api.get('/api/users')
  const id = response.body[0]._id

  // update the matches of that user
  await api.put(`/api/users/matches/${id}`)

  // find the user
  const response2 = await api.get('/api/users')
  const user = response2.body[0]
  assert.strictEqual(user.passengers[0].name, 'Korson Kartsa')
})

test('login', async () => {
  await api
    .post('/api/users/login')
    .send({ 'email': 'korsonkartsa@liftmeapp.com', 'password': 'salainen'})
    .expect(200)
})

after(async () => {
  await mongoose.connection.close()
})