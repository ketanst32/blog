import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'
import { tokensUserProvider } from '@adonisjs/auth/access_tokens'
import { jwtGuard } from '@maximemrf/adonisjs-jwt/jwt_config'
import User from '#models/user'
import env from '#start/env'

interface JwtContent {
  userId: number
  email: string
}

export default defineConfig({
  default: 'jwt', // default guard
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false, // required
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
    jwt: jwtGuard({
      tokenName: 'custom-name',
      tokenExpiresIn: '1h',
      useCookies: true,
      secret: env.get('JWT_SECRET') || 'supersecretkey',
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
      // refreshTokenUserProvider: tokensUserProvider({
      //   tokens: 'refreshTokens',
      //   model: () => import('#models/user'),
      // }),
      content: (user) => ({
        userId: user.getId(),
        email: (user.getOriginal() as User).email,
      }),
    }),
  },
})
