import mysql from'mysql2';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export class database{
  static pool= mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
  })
}