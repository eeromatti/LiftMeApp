const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true }, 
  passwordHash: { type: String, required: true},
  homeCoordinates: { type: [Number] },
  workCoordinates: { type: [Number] },
  homeAddress: { type: String },
  workAddress: { type: String },
  role: { 
    type: [String],
    enum: ['driver', 'passenger'], 
    required: true 
  },
  distance: { type: Number }, 
  time: { type: Number },
  passengers: { type: [Object], default: [] },
  drivers: { type: [Object], default: [] }, 
  activeDays: { type: [String]}
})
  
const User = mongoose.model('User', UserSchema)
  
module.exports = User