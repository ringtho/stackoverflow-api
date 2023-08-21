const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>StackOverflow</h1>')
})

const PORT = process.env.PORT || 5050
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
