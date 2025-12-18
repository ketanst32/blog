import { HttpContext } from '@adonisjs/core/http'

export default class JwtAuth {
  public async handle(ctx: HttpContext, next: () => Promise<void>) {
    try {
      await (ctx as any).auth.use('jwt').authenticate()
    } catch (error) {
      return (ctx as any).response.unauthorized({ message: 'Invalid or missing token' })
    }

    await next()
  }
}
