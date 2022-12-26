// =============================================
// IMPORT
// =============================================

// packges
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// =============================================
// MIDDLEWARES & ROUTES
// =============================================

app.use(express.json())

app.get('/', (req, res) => {
  res.send('jobs api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// =============================================
// SERVER
// =============================================

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
