import { MovieModel } from '../models/database/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static getById = async (req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ error: 'Movie not found' })
  }

  static create = async (req, res) => {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400)
        .json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    if (result.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(result.error.message) })
    }
    const updateMovie = await MovieModel.update({ id, input: result.data })
    if (updateMovie) {
      return res.json({
        message: 'Movie updated',
        data: updateMovie
      })
    }
    return res.status(404).json({ message: 'Movie not found' })
  }

  static delete = async (req, res) => {
    const { id } = req.params
    const result = await MovieModel.delete({ id })
    if (result) return res.json({ message: 'Movie deleted' })
    return res.status(404).json({ message: 'Movie not found' })
  }
}
