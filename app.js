import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
  const PORT = process.env.PORT || 3000
  const app = express()
  app.disable('x-powered-by')

  app.use(json())
  app.use(corsMiddleware())
  app.use('/movies', createMovieRouter({ movieModel }))

  // Iniciar el server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
