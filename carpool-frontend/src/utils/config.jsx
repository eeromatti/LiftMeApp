/* eslint-disable no-undef */
import dotenv from 'dotenv'

let ORS_API_KEY=process.env.ORS_API_KEY
let PORT=process.env.PORT
let SERVER_ADDRESS=process.env.SERVER_ADDRESS
let MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

let SLACK_SIGNING_SECRET=process.env.SLACK_SIGNING_SECRET
let SLACK_BOT_TOKEN=process.env.SLACK_BOT_TOKEN
let SLACK_APP_TOKEN=process.env.SLACK_APP_TOKEN

export default {
  ORS_API_KEY,
  PORT,
  SERVER_ADDRESS,
  MONGODB_URI,
  SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN
}
