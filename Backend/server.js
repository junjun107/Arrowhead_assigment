const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const createUsersTable = require("./db/Dabatase_init");
const pool = require("./db/pool");
const app = express();
const colors = require("colors");

const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//fetch and insert user to db
app.post("/api/users", async (req, res) => {
  const users = req.body;

  // console.log("Received data:", req.body);

  const query = `
    INSERT INTO users (
      name, username, email, street, suite, city, zipcode, latitude, longitude,
      phone, website, company_name, company_catch_phrase, company_bs
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
    ) ON CONFLICT (email) DO NOTHING
  `;
  try {
    for (const user of users) {
      const values = [
        user.name,
        user.username,
        user.email,
        user.address.street,
        user.address.suite,
        user.address.city,
        user.address.zipcode,
        parseFloat(user.address.geo.lat),
        parseFloat(user.address.geo.lng),
        user.phone,
        user.website,
        user.company.name,
        user.company.catchPhrase,
        user.company.bs,
      ];

      await pool.query(query, values);
    }

    res.status(201).send("status 201. Users inserted successfully!");
  } catch (error) {
    console.error("Error inserting users", error);
    res.status(500).send("An error occurred while saving users.");
  }
});

// app.listen(PORT, async (err) => {
//   if (err) throw error;
//   console.log(`Server running on port ${PORT}`.rainbow);
//   await createUsersTable();
// });

//sort by names
app.get("/api/users", async (req, res) => {
  const query = `
    SELECT * FROM users ORDER BY name ASC;
  `;
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Failed to fetch users");
  }
});

//Update user email
app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const query = `
    UPDATE users
    SET email = $1
    WHERE id = $2
    RETURNING *
  `;
  try {
    const result = await pool.query(query, [email, id]);
    // console.log("updated email is: ", result);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Failed to udpate user email");
  }
});
// Filter users by longitude
app.get("/api/users/filter", async (req, res) => {
     console.log(req.query);
     
  const { longitude } = req.query;
  const query = `
   SELECT * FROM users
   WHERE longitude > $1;
  `;
  try {
 
    const result = await pool.query(query, [longitude]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.stack);
    res.status(500).send("Failed to filter user by longitude");
  }
});
const startServer = async () => {
  try {
    //create table first to make sure it exist
    await createUsersTable();

    const PORT = 5001;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`.rainbow);
    });
  } catch (error) {
    console.error("Error setting up the server:", error);
    process.exit(1);
  }
};
startServer();
