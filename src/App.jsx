import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // GET
  const fetchUsers = async () => {
    const res = await fetch("https://networkingtestbackend.onrender.com/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // POST
  const addUser = async () => {
    await fetch("https://networkingtestbackend.onrender.com/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`https://networkingtestbackend.onrender.com/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Table</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button type="submit">effffre</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <button onClick={() => deleteUser(user.id)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
