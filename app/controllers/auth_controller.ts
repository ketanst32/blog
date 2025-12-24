import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthController {
  // Register new user
  public async register({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password'])

    // Hash the password before storing
    const user = await User.create({
      fullName: data.full_name,
      email: data.email,
      password: await hash.make(data.password),
    })

    return response.created({
      message: 'User registered',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  }

  // Login user and return JWT
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
    // Verify hashed password
    const passwordValid = await hash.verify(user.password, password)
    if (!passwordValid) {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
    // Manually generate JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, env.get('JWT_SECRET') || '', {
      expiresIn: '15m',
    })
    // supersecretkey
    return response.ok({
      message: 'Logged in successfully',
      token,
      tokenType: 'Bearer',
      expiresIn: 900,
    })
  }

  public async me({ auth, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.user as User
    return response.ok({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  }
}
