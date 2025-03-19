const app = require('./app')
// const config = require('./utils/config')

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})


