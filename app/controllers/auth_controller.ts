import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { registerValidator, loginValidator } from '#validators/auth'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    await request.validateUsing(registerValidator)

    // cek apakah email sudah terdaftar
    const isEmailExist = await User.findBy('email', request.input('email'))

    if (isEmailExist) {
      response.abort('Email Sudah Terdaftarr')
    }

    const user = await User.create({
      fullName: request.input('full_name'),
      email: request.input('email'),
      password: request.input('password'),
    })

    const token = await User.accessTokens.create(user)

    response.status(201).json({
      success: true,
      token: token,
      data: user,
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)

    if (!user || user === null) {
      return response.status(401).json({
        success: false,
        message: 'Email Atau Password Salah',
      })
    }

    const isVerify = await hash.verify(user!.password, password)

    if (isVerify) {
      const token = await User.accessTokens.create(user!)

      return response.status(200).json({
        success: true,
        data: user,
        token: token,
      })
    } else {
      return response.status(401).json({
        success: false,
        message: 'Email Atau Password Salah',
      })
    }
  }

  async me({ auth, response }: HttpContext) {
    const user = auth.user!

    return response.status(200).json({
      success: true,
      data: user,
    })
  }
}
