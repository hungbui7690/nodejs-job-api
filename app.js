// =============================================
// IMPORT
// =============================================

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

const swaggerDocument = YAML.load('./swagger.yaml')

// security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

// packges
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// another
const connectDB = require('./db/connect')

// router

app.get('/', (req, res) => {
  res.send(`
  <h1>Job API</h1>
  <a href='/api-docs'>Documentation</a>
  `)
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticationMiddleware = require('./middleware/authentication')

// =============================================
// MIDDLEWARES & ROUTES
// =============================================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// security
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(limiter)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('jobs api')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// =============================================
// SERVER
// =============================================

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
