import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";


const API_URL = "http://localhost:5001/api/users";
function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUserData(res.data);
        await sendUsersToBackend(res.data);
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
    fetchUsers();
  }, []);

  return (
    <div>
      <div>
        {userData &&
          userData.map((user) => (
            <div key={user.id} style={{ marginBottom: "20px" }}>
              <h2>{user.name}</h2>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>
                Address: {user.address.street},{user.address.suite},
                {user.address.city}, {user.address.zipcode}
              </p>
              <p>
                Geo: {user.address.geo.lat},{user.address.geo.lng}
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
