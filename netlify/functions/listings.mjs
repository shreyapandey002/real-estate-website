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

export async function handler() {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'DATABASE_URL is not configured.' }),
    }
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rows),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to load property listings.' }),
    }
  }
}
