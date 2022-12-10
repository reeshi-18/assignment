import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "reeshi",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "video",
    port: process.env.DB_PORT || 3306,
});

export default db;