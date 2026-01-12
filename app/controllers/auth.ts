import { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import { CreateUserDTO } from '#DTOs/CreateUserDTO'
import { LoginDTO } from '#DTOs/LoginDTO'
import User from '#models/user'

export default class Auth {
  private authService = new AuthService()

  public async register({ request, response }: HttpContext) {
    const data = request.only(['full_name', 'email', 'password'])

    const dto = new CreateUserDTO(
      data.full_name,
      data.email,
      data.password
    )

    const user = await this.authService.register(dto)

    return response.created({
      message: 'User registered',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  }

  public async login({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const dto = new LoginDTO(data.email, data.password)

    try {
      const result = await this.authService.login(dto)

      return response.ok({
        message: 'Logged in successfully',
        token: result.token,
        tokenType: 'Bearer',
        expiresIn: result.expiresIn,
      })
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async me({ auth, response }: HttpContext) {
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