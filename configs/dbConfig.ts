const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const pool = new Pool({
  user: POSTGRES_USER,
  host: 'localhost',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: 5432,
})

export default pool
