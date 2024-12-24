import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

function App() {
  const [userData, setUserData] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        await sendUsersToBackend(res.data);
        await fetchAllUsers();
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    const sendUsersToBackend = async (data) => {
      try {
        await axios.post(API_URL, data);
        console.log("Data sent to the backend successfully!");
      } catch (error) {
        console.error("Error sending data to the backend", error);
      }
    };
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}`);
        console.log(res.data);
        const flattenedUsers = res.data;

        const nestedUsers = flattenedUsers.map((user) => ({
          ...user,
          address: {
            street: user.street,
            suite: user.suite,
            city: user.city,
            zipcode: user.zipcode,
            geo: {
              lat: user.latitude,
              lng: user.longitude,
            },
          },
          company: {
            name: user.company_name,
            catchPhrase: user.company_catch_phrase,
            bs: user.company_bs,
          },
        }));
        setUserData(nestedUsers);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchSortedUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/sort`);
      const flattenedUsers = res.data;

      const nestedUsers = flattenedUsers.map((user) => ({
        ...user,
        address: {
          street: user.street,
          suite: user.suite,
          city: user.city,
          zipcode: user.zipcode,
          geo: {
            lat: user.latitude,
            lng: user.longitude,
          },
        },
        company: {
          name: user.company_name,
          catchPhrase: user.company_catch_phrase,
          bs: user.company_bs,
        },
      }));

      setUserData(nestedUsers);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const filterByLongitude = async () => {
    try {
      const res = await axios.get(`${API_URL}/filter`);
      console.log("filter result on front", res);
      const flattenedData = res.data.map((user) => ({
        ...user,
        address: {
          street: user.street,
          suite: user.suite,
          city: user.city,
          zipcode: user.zipcode,
          geo: {
            lat: user.latitude,
            lng: user.longitude,
          },
        },
        company: {
          name: user.company_name,
          catchPhrase: user.company_catch_phrase,
          bs: user.company_bs,
        },
      }));

      setUserData(flattenedData);
      console.log("Filtered users fetched and flattened successfully!");
    } catch (error) {
      console.error("Error filtering users by longitude", error);
    }
  };

  const updateEmail = async (event) => {
    event.preventDefault();
    const newUserId = parseInt(updateId);
    const email = newEmail;

    if (!updateId || !email) {
      alert("Please provide both a User ID and a new email address.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5001/api/user/${newUserId}`,
        {
          email,
        }
      );
      setUserData((prevUsers) =>
        prevUsers.map((user) =>
          user.id === parseInt(newUserId)
            ? { ...user, email: response.data.email }
            : user
        )
      );

      console.log(`Updated user with ID ${newUserId}:`, response.data);
      alert(`Email updated successfully for User ID ${newUserId}!`);
      setUpdateId("");
      setNewEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Failed to update email. Please check the User ID and email.");
    }
  };

  return (
    <div>
      <div
        className="bg-danger text-light"
        style={{
          padding: "2rem",
          margin: "1rem 0",
        }}
      >
        <h1 className="display-4">Arrowhead Sample User Table</h1>
      </div>

      <div>
        <button className="btn btn-primary" onClick={fetchSortedUser}>
          Sort By Name
        </button>
        <button
          className="btn btn-primary"
          onClick={filterByLongitude}
          style={{ margin: "10px", padding: "10px" }}
        >
          Filter Longitude &gt; -110.455
        </button>
        <div
          style={{ margin: "20px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <input
            className="input-group-text"
            type="number"
            placeholder="Enter User ID"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            className="input-group-text"
            type="email"
            placeholder="Enter New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button
            className="btn btn-primary"
            onClick={updateEmail}
            style={{ padding: "10px" }}
          >
            Update Email
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {userData &&
          userData.map((user) => (
            <div
              key={user.id}
              style={{
                flex: "1 1 calc(25% - 20px)",
                boxSizing: "border-box",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              <h2>{user.name}</h2>
              <p>User ID: {user.id}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>
                Address: {user.address.street},{user.address.suite},
                {user.address.city}, {user.address.zipcode}
              </p>
              <p>
                Geo: <strong>Lat:</strong> {user.address.geo.lat},
                <strong>Lng:</strong> {user.address.geo.lng}
              </p>

              <p>Phone: {user.phone}</p>
              <p>Website: {user.website}</p>
              <p>
                Company: {user.company.name},{user.company.catchPhrase},
                {user.company.bs}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
