const pool = require("./pool");

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30),
    username VARCHAR(30),
    email VARCHAR(255),
    street VARCHAR(255),
    suite VARCHAR(255),
    city VARCHAR(255),
    zipcode VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT,
    phone VARCHAR(255),
    website VARCHAR(255),
    company_name VARCHAR(255),
    company_catch_phrase TEXT,
    company_bs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  try {
    await pool.query(query);
    console.log("Users table created or already exists.".blue);
  } catch (error) {
    console.error("Error creating users table".red, error.stack);
  }
};

module.exports = createUsersTable;
