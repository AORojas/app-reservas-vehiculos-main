import jwt from 'jsonwebtoken'
import { type Request, type Response, type NextFunction } from 'express'
import type { TokenPayload } from '../types/types'

// Podés extender el tipo de Request para incluir el usuario
export interface AuthenticatedRequest extends Request {
  user?: TokenPayload
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ message: 'Token inválido' })
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload

    // Creo que no es necesario
    req.user = {
      _id: decoded._id,
      full_name: decoded.full_name,
      email: decoded.email
    }

    next()
  } catch (error) {
    console.error('Error al verificar el token:', error)
    res.status(403).json({ message: 'Token inválido' })
  }
}
