import { Router } from 'express'
import {
  registerUser,
  loginUser,
  updateUser,
  verifyToken,
  getUserProfile
} from '../controllers/user.controllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', authMiddleware, updateUser)
router.get('/user/:id', authMiddleware, getUserProfile)
router.get('/verify', verifyToken)

export default router
