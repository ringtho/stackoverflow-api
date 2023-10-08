require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const usersRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')

const authenticateUser = require('./middleware/authentication')
const notFoundMiddleware = require('./middleware/notFound')
const errorHandler = require('./middleware/error-handler')

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', usersRouter)
app.use('/api/v1/questions', authenticateUser, questionsRouter)

app.get('/', (req, res) => {
  res.send('<h1>StackOverflow</h1>')
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5050
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
