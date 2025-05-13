import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pkg;
const pg=new Client({
  connectionString: process.env.DATABASE_URL,
  
})
await pg.connect();
export default pg;