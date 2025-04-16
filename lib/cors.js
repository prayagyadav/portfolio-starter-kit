import Cors from 'cors'

const allowedDomain = /(^|\.)prayagyadav\.com$/

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, false) // Block unknown origins (like curl, Postman)
    }

    const hostname = new URL(origin).hostname

    if (allowedDomain.test(hostname)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export default cors
