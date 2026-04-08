import jwt from 'jsonwebtoken'
import type { TokenPayload } from '../types/types'

export const createAccessToken = (payload: TokenPayload): Promise<string> => {
  const { JWT_SECRET } = process.env

  if (!JWT_SECRET)
    throw new Error('Token is not defined in environment variables')

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err || !token)
        return reject(err ?? new Error('Failed to generate token'))

      resolve(token)
    })
  })
}
