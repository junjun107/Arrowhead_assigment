import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

const FetchAndInsert = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = res.data;

    console.log(users);

    for (const user of users) {
      const transformedUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        latitude: parseFloat(user.address.geo.lat),
        longitude: parseFloat(user.address.geo.lng),
        phone: user.phone,
        website: user.website,
        company_name: user.company.name,
        company_catch_phrase: user.company.catchPhrase,
        company_bs: user.company.bs,
      };
      await axios.post(API_URL, transformedUser);
    }
  } catch (error) {
    console.error("Error fetching or inserting data", error);
  }
};
FetchAndInsert();
