import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = 'mongodb+srv://devlenin:devlenin@devlenin.4fi6u.mongodb.net/?retryWrites=true&w=majority&appName=DEVLENIN'
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

let db
async function connect () {
  if (!db) {
    try {
      await client.connect()
      db = client.db('database')
    } catch (error) {
      console.error('Error connecting to the database:', error)
    }
  }
  return db.collection('movies')
}

export class MovieModel {
  static async getAll ({ genre }) {
    const db = await connect()
    if (genre) {
      return db.find({
        genre: { $elemMatch: { $regex: genre, $options: 'i' } }
      }).toArray()
    }
    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    try {
      return await db.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      console.error('Invalid ID format:', id)
      return null
    }
  }

  static async create ({ input }) {
    const db = await connect()
    const { insertedId } = await db.insertOne(input)
    return { id: insertedId, ...input }
  }

  static async delete ({ id }) {
    const db = await connect()
    try {
      const { deletedCount } = await db.deleteOne({ _id: new ObjectId(id) })
      return deletedCount > 0
    } catch (error) {
      console.error('Invalid ID format:', id)
      return false
    }
  }

  static async update ({ id, input }) {
    const db = await connect()
    try {
      const result = await db.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: input },
        { returnDocument: 'after' }
      )
      return result != null
    } catch (error) {
      console.error('Error updating movie:', error)
      return false
    }
  }
}
