import React, { useState, useEffect } from "react";
import axios from "axios";

const UsernameComponent = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  // Fetch current username
  useEffect(() => {
    axios
      .get("/api/users/username")
      .then((res) => {
        setUsername(res.data.replace("Current username: ", ""));
      })
      .catch((err) => {
        console.error("Error fetching username:", err);
      });
  }, []);

  // Update username
  const handleUpdate = () => {
    axios
      .put("/api/users/username", { username: newUsername })
      .then((res) => {
        setUsername(newUsername || username);
        alert("Username updated!");
      })
      .catch((err) => {
        console.error("Error updating username:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Current Username: {username}</h2>
      <input
        type="text"
        placeholder="Enter new username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Username</button>
    </div>
  );
};

export default UsernameComponent;
