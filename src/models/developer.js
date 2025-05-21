const db = require('../utils/db');      // connects to PostgreSQL
const bcrypt = require('bcrypt');       // for hashing passwords
const { v4: uuidv4 } = require('uuid'); // for generating API keys

const SALT_ROUNDS = 10;

async function createDeveloper({ name, email, password }) {
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS); // hashes the password before storing it in DB
  const api_key = uuidv4();                                       // generates a unique API key for the developer to authenticate API requests later

  const result = await db.query(
    `INSERT INTO developers (name, email, password_hash, api_key)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, api_key, tier, created_at`,
    [name, email, password_hash, api_key]
  );                                                              // inserts the new developer into the database

  return result.rows[0];
}

async function findByEmail(email) {
  const result = await db.query(
    `SELECT * FROM developers WHERE email = $1`,
    [email]
  );                                              // checks if developer already exists
  return result.rows[0];
}

module.exports = { createDeveloper, findByEmail };
