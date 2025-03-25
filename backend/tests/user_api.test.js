const { test } = require('node:test')
const assert = require('node:assert/strict')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')


let dbConnection
// Manually set up MongoDB connection before tests
async function setupDB() {
  try {
    dbConnection = await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Wait for the connection to be fully established
    // while (dbConnection.connection.readyState === 2) {
    //   await new Promise((resolve) => setTimeout(resolve, 500)) // Wait 500ms before checking again
    // }
    console.log('MongoDB connected for testing')
    // return dbConnection
  } catch (err) {
    console.error('MongoDB connection failed', err)
    throw err
  }
}


test('set up MongoDB connection', async () => {  
  const response = await setupDB()
  // console.log('response.connection:', response.connection.readyState)
  // assert.ok(response.connection.readyState === 1) 
})

// test('user can be created', async () => {
//   await api
//     .post('/api/users/signup')
//     .send(helper.initialUsers[0])
//     .expect(201)
// })

// test('login', async () => {
//   await api
//     .post('/api/users/login')
//     .send({ 'email': 'keravankata@liftmeapp.com', 'password': 'salainen'})
//     .expect(200)
// })

// test('users cannot be fetched without the token', async () => {
//   await api
//     .get('/api/users')
//     .expect(500)

//   const response = await api
//     .post('/api/users/login')
//     .send({ 'email': 'keravankata@liftmeapp.com', 'password': 'salainen'})
//     .expect(200)
//   const token = response.body.token

//   await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
//     .expect(200)
// })

// test('new user is created and the previously added is going to be a potential driver', async () => {
//   await api
//     .post('/api/users/signup')
//     .send(helper.initialUsers[1])
//     .expect(201)

//   const response1 = await api
//     .post('/api/users/login')
//     .send({ 'email': 'keravankata@liftmeapp.com', 'password': 'salainen'})
//   const token = response1.body.token
  
//   const response2 = await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
//   const user = response2.body[1]
//   assert.strictEqual(user.drivers[0].name, 'Keravan Kata')
// })

// test('update matches for the user first added', async () => {
//   // log in to get a token
//   const response1 = await api
//     .post('/api/users/login')
//     .send({ 'email': 'keravankata@liftmeapp.com', 'password': 'salainen'})
//   const token = response1.body.token
  
//   // find the id of the user first added
//   const response2 = await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
//   const id = response2.body[0]._id

//   // update the matches of that user
//   await api
//     .put(`/api/users/matches/${id}`)
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
    
//   // find the user
//   const response3 = await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')
//   const user = response3.body[0]
//   assert.strictEqual(user.passengers[0].name, 'Korson Kartsa')
// })


// test('delete users from database', async () => {
//   // log in to get a token for first user
//   const response1 = await api
//     .post('/api/users/login')
//     .send({ 'email': 'keravankata@liftmeapp.com', 'password': 'salainen'})
//   const token = response1.body.token

//   // find users
//   const response2 = await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')

//   //delete users 
//   const id1 = response2.body[0]._id
//   const id2 = response2.body[1]._id

//   await api
//     .delete(`/api/users/${id1}`)
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')

//   await api
//     .delete(`/api/users/${id2}`)
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')

//   // find users
//   const response3 = await api
//     .get('/api/users')
//     .set('Authorization', `Bearer ${token}`)
//     .set('Content-Type', 'application/json')

//   assert.strictEqual(response3.body.length, 0)
// })
