import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/mongodb/schemas/user.model'
import type { IUser, JwtPayloadCustom, UserProfileInfo } from '../types/types'
import { createAccessToken } from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      password,
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    } = req.body.user as IUser

    if (
      !email ||
      !password ||
      !full_name ||
      !last_name ||
      !country ||
      !address ||
      !address_number ||
      !phone_number ||
      !fiscal_condition ||
      !document_type ||
      !document_number
    ) {
      res.status(400).json({ message: 'Campos obligatorios faltantes' })
      return
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'El correo ya está registrado' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    })

    const userObj = newUser.toObject()

    const token = await createAccessToken({
      _id: userObj._id,
      email: userObj.email,
      full_name: userObj.full_name
    })

    res.cookie('token', token)

    res.status(201).json({
      message: 'Usuario creado correctamente',
      userLoginInfo: {
        id: userObj._id,
        full_name: userObj.full_name,
        email: userObj.email
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Credenciales invalidas' })
      return
    }

    const userFounded = await UserModel.findOne({ email })
    if (userFounded === null) {
      res.status(401).json({ message: 'Credenciales invalidas' })
      return
    }

    const isMatch = await bcrypt.compare(password, userFounded.password)
    if (!isMatch) {
      res.status(401).json({ message: 'Credenciales invalidas' })
      return
    }

    const userLoginInfo = {
      _id: userFounded._id,
      email: userFounded.email,
      full_name: userFounded.full_name
    }

    const token = await createAccessToken(userLoginInfo)

    res.cookie('token', token)

    res.status(200).json({
      message: 'Login exitoso',
      userLoginInfo: userFounded
    })
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    })
  }
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, current_password, new_password, ...updates } = req.body

  try {
    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' })
      return
    }

    // Cambio de contraseña
    if (new_password) {
      if (!current_password) {
        res.status(400).json({ message: 'Debe ingresar la contraseña actual' })
        return
      }

      const isMatch = await bcrypt.compare(current_password, user.password)
      if (!isMatch) {
        res.status(401).json({ message: 'Contraseña actual incorrecta' })
        return
      }

      updates.password = await bcrypt.hash(new_password, 10)
    }

    const updatedUser = await UserModel.findOneAndUpdate({ email }, updates, {
      new: true
    })

    res.json({
      message: 'Usuario actualizado correctamente',
      user: {
        id: updatedUser!._id,
        full_name: updatedUser!.full_name,
        email: updatedUser!.email,
        last_name: updatedUser!.last_name,
        country: updatedUser!.country,
        address: updatedUser!.address,
        address_number: updatedUser!.address_number,
        phone_number: updatedUser!.phone_number,
        fiscal_condition: updatedUser!.fiscal_condition,
        document_type: updatedUser!.document_type,
        document_number: updatedUser!.document_number
      }
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message })
    } else {
      console.log('Ha ocurrido un error desconocido')
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies?.token

  if (!token) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  const { JWT_SECRET } = process.env

  if (!JWT_SECRET) {
    res.status(500).json({ message: 'Error de autenticación' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadCustom

    if (!decoded) {
      res.status(404).json({ message: 'Error de autenticación' })
      return
    }

    const userFounded = await UserModel.findById(decoded._id)

    if (userFounded === null) {
      res.status(401).json({ message: 'Error de autenticación' })
      return
    }

    res.status(200).json({
      message: 'Autenticación exitosa',
      userLoginInfo: {
        _id: userFounded._id,
        full_name: userFounded.full_name,
        email: userFounded.email
      }
    })
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error de autenticación: ', err.message)
    } else {
      console.error('Ha ocurrido un error desconocido.')
    }
  }
}

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params

    const userFounded = await UserModel.findById(id)
    if (!userFounded) {
      res.status(404).json({ message: 'Credenciales invalidas' })
      return
    }

    const {
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    } = userFounded

    const userProfileInfo: UserProfileInfo = {
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    }

    res.status(200).json({ message: 'Perfil encontrado', userProfileInfo })
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        message: `Error al obtener el perfil del usuario: ${err.message}`
      })
    } else {
      res.status(404).json({
        message: `Error desconcido al obtener el perfil del usuario`
      })
    }
  }
}
