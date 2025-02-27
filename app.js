import express, { json } from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT || 3000
const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(corsMiddleware())
app.use('/movies', moviesRouter)

// Iniciar el server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
