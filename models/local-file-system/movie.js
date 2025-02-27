import { randomBytes } from 'crypto'
import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static getAll = async (params = {}) => {
    const { genre } = params
    if (!genre) {
      return movies
    }

    return movies.filter(
      movie => movie.genre.some(
        mov => mov.toLocaleLowerCase() === genre.toLocaleLowerCase()))
  }

  static getById = async ({ id }) => {
    return movies.filter(movie => movie.id === id)
  }

  static create = async (input) => {
    const newMovie = {
      id: randomBytes(16).toString('hex'),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static detele = async ({ id }) => {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    const updatedMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = updatedMovie

    return true
  }
}
