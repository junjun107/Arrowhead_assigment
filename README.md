This project is a simple User Datbabase Management built using React, Express, and PostgreSQL. Styled with Bootstrap. It demonstrates the following functionalities as part of the coding assignment:

## Features
### Fetch User Data:
* Retrieves user data from https://jsonplaceholder.typicode.com/users.
* Sends the fetched data to the backend to store it in a PostgreSQL database.

### Display Fetched Records:
*Displays all user records in a list on the frontend.

### Sort Records:
* Sorts user records by name using a backend SQL query and updates the frontend.
  
### Update Email:
* Updates the email address of a user based on their ID.

### Filter by Longitude:
* Filters and displays users with a longitude greater than -110.455.

  
## Technologies Used
Frontend: React (with Axios for API requests), Bootstrap
Backend: Express (Node.js),Nodemon (utility tool to detect file changes and restart node.js), Cors (Cross-Origin Resource Sharing, middleware allow data to be requested from a different origin , pg (PostgreSQL client for Node.js. app can connect to PostgreSQL database 
)
Database: PostgreSQL

### Setup Instructions

Clone the repository:
Install dependencies
Create a PostgreSQL database named user_management.
Update the database configuration in server.js:

```
const pool = new Pool({
  user: "your_postgres_user",
  host: "localhost",
  database: "user_management",
  password: "your_password",
  port: 5432,
});
```

### Endpoints
Backend Endpoints
POST /api/users: Inserts user data into the database.
GET /api/users: Retrieves all user records.
GET /api/users?sort=name: Retrieves user records sorted by name.
PUT /api/users/:id: Updates the email address for a specific user.
GET /api/users?longitude=-110.455: Filters users with longitude greater than -110.455.



![Screenshot 2024-12-24 at 4 00 20 PM](https://github.com/user-attachments/assets/61a4cf98-a3d0-4b57-a05f-31f4eaf33d53)
