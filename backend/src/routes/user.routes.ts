import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  verifyToken,
  getUserProfile
} from '../controllers/user.controllers.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.put('/update', authMiddleware, updateUser)
router.get('/user/:id', authMiddleware, getUserProfile)
router.get('/verify', verifyToken)

export default router
