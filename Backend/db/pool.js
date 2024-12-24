const { Pool } = require("pg");

const pool = new Pool({
  user: "bijunzhao",
  host: "localhost",
  database: "arrowhead_user_master",
  password: "woaibobo21",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database".blue);
    release();
  }
});

module.exports = pool;
