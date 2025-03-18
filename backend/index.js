const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`App is listening on port ${config.PORT}`)
})


