import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { CreateUserDTO } from '#DTOs/CreateUserDTO'
import { LoginDTO } from '#DTOs/LoginDTO'
import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class auth_service {
  public async register(dto: CreateUserDTO) {
    const user = await User.create({
      fullName: dto.fullName,
      email: dto.email,
      password: await hash.make(dto.password),
    })
    return user
  }
  public async login(dto: LoginDTO) {
    const email = dto.email
    const password = dto.password
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('User Does not exist')
    }
    const isvalid = await hash.verify(user.password, password)
    if (!isvalid) {
      throw new Error('Invalid Password')
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, env.get('JWT_SECRET')!, {
      expiresIn: '15m',
    })
    return {
      token,
      user,
      expiresIn: 900,
    }
  }
}
