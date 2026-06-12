import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import pg from 'pg'

const { Pool } = pg

let pool: pg.Pool | undefined

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }

  return pool
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.DATABASE_URL ||= env.DATABASE_URL

  return {
    plugins: [
      react(),
      {
        name: 'local-listings-api',
        configureServer(server) {
          server.middlewares.use('/api/listings', async (_request, response) => {
            if (!process.env.DATABASE_URL) {
              response.statusCode = 500
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'DATABASE_URL is not configured.' }))
              return
            }

            try {
              const { rows } = await getPool().query(`
                select
                  property_id,
                  property_name,
                  property_type,
                  location,
                  price,
                  square_feet,
                  bedrooms,
                  bathrooms,
                  configuration
                from public.properties
                order by created_at desc, property_id asc
              `)

              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify(rows))
            } catch (error) {
              console.error(error)
              response.statusCode = 500
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'Unable to load property listings.' }))
            }
          })
        },
      },
    ],
  }
})
