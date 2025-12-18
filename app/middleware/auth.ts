// import { HttpContext } from '@adonisjs/core/http'
// import { verify } from 'jsonwebtoken'

// export default class AuthMiddleware {
//   public async handle(ctx: HttpContext, next: () => Promise<void>) {
//     const authHeader = ctx.request.header('authorization')
//     if (!authHeader) {
//       return ctx.response.unauthorized({ message: 'Token missing' })
//     }

//     const token = authHeader.replace('Bearer ', '')

//     try {
//       const payload: any = verify(token, process.env.APP_KEY || 'supersecretkey')
//       //ctx.state.userId = payload.id // store user id in context state
//       (ctx as any).state.userId = payload.id

//       await next()
//     } catch {
//       return ctx.response.unauthorized({ message: 'Invalid token' })
//     }
//   }
// }
