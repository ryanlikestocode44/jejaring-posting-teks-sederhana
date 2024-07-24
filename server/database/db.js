import dotenv from 'dotenv'
import pkg from 'pg'

const { Pool } = pkg;
dotenv.config();

const dbConfig = {
    user: 'postgres',
    password: 'ryan123',
    host: 'localhost',
    port: 5432,
    database: 'statuskudb'
};
  
const connectionString = `postgres://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const db = new Pool({ connectionString });

export default db;