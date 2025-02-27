import cors from 'cors'

const ACCESS_ORIGINS = [
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000'
]

export const corsMiddleware = ({ acceptedOrigins = ACCESS_ORIGINS } = {}) =>
  cors({
    origin: (origin, callBack) => {
      if (acceptedOrigins.includes(origin)) return callBack(null, true)
      if (!origin) return callBack(null, true)
      return callBack(new Error('Not allow by CORS'))
    }
  })
