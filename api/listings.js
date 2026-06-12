import pg from 'pg'

const { Pool } = pg

let pool

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  }

  return pool
}

export default async function handler(_request, response) {
  if (!process.env.DATABASE_URL) {
    return response.status(500).json({ error: 'DATABASE_URL is not configured.' })
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

    return response.status(200).json(rows)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'Unable to load property listings.' })
  }
}
