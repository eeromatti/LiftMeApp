const express = require('express')
const { saveUserRoutePoints, findMatches } = require('../controllers/routesController')

const router = express.Router()

router.get('/route/:id', saveUserRoutePoints) 
router.put('/find', findMatches)


module.exports = router  