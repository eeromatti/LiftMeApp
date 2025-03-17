/* eslint-disable no-undef */
require('dotenv').config()

let ORS_API_KEY=process.env.ORS_API_KEY
let PORT=process.env.PORT
let SERVER_ADDRESS=process.env.SERVER_ADDRESS
let MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
let SECRET = process.env.SECRET


module.exports = {
  ORS_API_KEY,
  PORT,
  SERVER_ADDRESS,
  MONGODB_URI,
  SECRET
}
