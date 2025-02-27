import z from 'zod'

const movieSchema = z.object({
  title: z.string({ required_error: 'Title is required' })
    .min(1)
    .max(100),
  year: z.number(
    {
      invalid_type_error: 'Year must be a number',
      too_small_error: 'Year must be greater than 1888',
      too_large_error: `Year must be less than ${new Date().getFullYear()}`
    }
  )
    .int()
    .min(1900)
    .max(new Date().getFullYear()),
  director: z.string(
    {
      required_error: 'Director is required',
      invalid_type_error: 'Director must be a string'
    }
  )
    .min(1)
    .max(100),
  duration: z.number(
    {
      required_error: 'Duration is required',
      invalid_type_error: 'Duration must be a number'
    }
  ).int()
    .positive(),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Mystery',
      'Romance',
      'Thriller',
      'Western',
      'Crime',
      'Animation',
      'Sci-fi'],
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array'
    })
  ),
  poster: z.string({
    required_error: 'Poster is required',
    invalid_format_error: 'Poster must be a valid URL'
  }).url(),
  rate: z.number(
    {
      required_error: 'Rate is required',
      invalid_type_error: 'Rate must be a number'
    }
  )
    .min(1)
    .max(10)
})

export const validateMovie = (movie) => {
  return movieSchema.safeParse(movie)
}

export const validatePartialMovie = (input) => {
  return movieSchema.partial().safeParse(input)
}
