import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    let sqlQuery = ''
    const params = []

    if (genre) {
      sqlQuery = `
                SELECT 
                    BIN_TO_UUID(m.id) AS id,
                    m.title,
                    m.year,
                    m.director,
                    m.duration, 
                    m.poster,
                    m.rate 
                FROM 
                    movie m
                INNER JOIN movie_genres mg ON m.id = mg.movie_id
                INNER JOIN genre g ON g.id = mg.genre_id
                WHERE g.name = ?`

      params.push(genre)
    } else {
      sqlQuery = `
                SELECT 
                    BIN_TO_UUID(id) AS id,
                    title,
                    year,
                    director,
                    duration, 
                    poster,
                    rate 
                FROM 
                    movie`
    }

    const [movies] = await connection.query(sqlQuery, params)
    return movies
  }

  static async getById ({ id }) {
    const params = []
    const sqlQuery = 'select bin_to_uuid(id) id, title, year,director,duration, poster, rate from movie where bin_to_uuid(id) = ?'
    params.push(id)
    const [movie] = await connection.query(sqlQuery, params)
    return movie
  }

  static async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    // generar el id
    const [uuidResult] = await connection.query('select UUID() as uuid;')
    const generatedUuid = uuidResult[0].uuid
    const sqlQuery = 'insert into movie(id, title, year, director, duration, poster, rate) value(uuid_to_bin(?),?,?,?,?,?,?)'
    try {
      await connection.query(
        sqlQuery, [
          generatedUuid,
          title,
          year,
          director,
          duration,
          poster,
          rate]
      )
      const sqlSelect = 'select bin_to_uuid(id) as id, title, year, director, duration, poster, rate from movie where id = uuid_to_bin(?)'
      const [movies] = await connection.query(sqlSelect, [generatedUuid])
      return movies
    } catch (error) {
      throw new Error('Error al crear la movie')
    }
  }

  static async delete ({ id }) {
    const sqlQuery = 'DELETE FROM movie WHERE id = uuid_to_bin(?)'
    try {
      const [result] = await connection.query(sqlQuery, [id])

      if (result.affectedRows === 0) {
        return { message: 'No se encontró la película para eliminar' }
      }

      return { message: 'Película eliminada correctamente' }
    } catch (error) {
      console.error('Error al eliminar la película:', error)
      throw new Error('No se pudo eliminar la película')
    }
  }

  static async update ({ id, input }) {
    // Verifica si hay datos para actualizar
    if (!Object.keys(input).length) {
      throw new Error('No se enviaron datos para actualizar')
    }

    // Construcción dinámica de la consulta
    const fields = Object.keys(input).map(field => `${field} = ?`).join(', ')
    const values = Object.values(input)

    const sqlQuery = `UPDATE movie SET ${fields} WHERE id = uuid_to_bin(?)`
    try {
      const [result] = await connection.query(sqlQuery, [...values, id])

      if (result.affectedRows === 0) {
        return null
      }

      // Obtener la película actualizada
      const sqlSelect = 'SELECT bin_to_uuid(id) as id, title, year, director, duration, poster, rate FROM movie WHERE id = uuid_to_bin(?)'
      const [movies] = await connection.query(sqlSelect, [id])

      return movies[0]
    } catch (error) {
      console.error('Error al actualizar la película:', error)
      throw new Error('No se pudo actualizar la película')
    }
  }
}
