import axios from "axios";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomNo = () => {
    const number = Math.floor(Math.random() * 50);

    return number;
  };

  const handleAddUser = (item) => {
    setUsers([...users, item]);
  };

  const handleDeleteUser = (item) => {
    setUsers((prev) =>
      prev.filter((user) => user.birth_year !== item.birth_year)
    );
  };

  const fetchUser = async () => {
    const number = getRandomNo();

    // console.log(number);

    setLoading(true);

    try {
      const res = await axios.get(`https://swapi.dev/api/people/${number}`);
      // console.log(res.data.name);
      handleAddUser(res.data);
      setError("");
    } catch (error) {
      console.log("Error while fetching the user : ", error);
      setError("Failed to fetch the user");
    } finally {
      setLoading(false);
      // console.log(users);
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <button
        type="submit"
        onClick={fetchUser}
        style={{ width: "10rem", margin: "auto" }}
      >
        Add Record
      </button>

      {error ? (
        <>{error}</>
      ) : (
        <>
          {users.length > 0 ? (
            <ul style={{ listStyleType: "none" }}>
              {users.length > 0 &&
                users.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <li>{item.name}</li>
                    <button onClick={() => handleDeleteUser(item)}>
                      Delete
                    </button>
                  </div>
                ))}
            </ul>
          ) : (
            <p style={{ margin: "auto", fontSize: "2rem" }}>List is empty</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
