const express = require('express')
const movies = require('./movies.json')
const crypto = require('crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callBack) => {
    const ACCESS_ORIGINS = [
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000'
    ]
    if (ACCESS_ORIGINS.includes(origin)) return callBack(null, true)
    if (!origin) return callBack(null, true)
    return callBack(new Error('Not allow by CORS'))
  }
}))

app.disable('x-powered-by')
const PORT = process.env.PORT || 3000

// GET /movies
app.get('/movies', (req, res) => {
  res.json(movies)
})

// GET /movies/:id
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' })
  }
  res.json(movie)
})

// Get /Movies?genre=action
app.get('/movies', (req, res) => {
  const { genre } = req.query
  const filteredMovies = movies.filter(
    movie => movie.genre.some(
      mov =>
        mov.toLocaleLowerCase() === genre.toLocaleLowerCase()
    ))

  res.json(filteredMovies)
})

// POST /movies
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res
      .status(400)
      .json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomBytes(16).toString('hex'),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

/// PATCH /movies/:id
app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' })

  if (result.error) {
    return res
      .status(400)
      .json({ error: JSON.parse(result.error.message) })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  res.json(updatedMovie)
})

// Delete
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex < 0) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({
    message: 'Movie deleted'
  })
})
// Iniciar el server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
