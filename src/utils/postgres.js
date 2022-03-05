import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
})

async function fetch(query,...params){
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, (params.length > 0 ? params : null))
        return rows
    } catch(error) {
      console.log(error)
    } finally {
        client.release()
    }
}

export default fetch;