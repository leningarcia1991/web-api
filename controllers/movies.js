import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ error: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400)
        .json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(result.error.message) })
    }
    const updateMovie = await this.movieModel.update({ id, input: result.data })
    if (updateMovie) {
      return res.json({
        message: 'Movie updated',
        data: updateMovie
      })
    }
    return res.status(404).json({ message: 'Movie not found' })
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })
    if (result) return res.json({ message: 'Movie deleted' })
    return res.status(404).json({ message: 'Movie not found' })
  }
}
