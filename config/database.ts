//import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  // Default connection
  connection: 'pg',

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: process.env.DB_HOST || 'postgres',        // Docker service name
        port: Number(process.env.DB_PORT || 5432),
        user: process.env.DB_USER || 'ketan',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'simple_server',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
