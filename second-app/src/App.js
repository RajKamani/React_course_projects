import React, { useState } from "react";
import AddUser from "./components/User/AddUser";
import List from "./components/User/List";

function App() {
  const User = [];
  const [NewUser, setNewUser] = useState(User);
  const newUserHandler = (newUser) => {
    setNewUser((oldUsers) => {
      return [newUser, ...oldUsers];
    });
  };
  return (
    <div>
      <AddUser newUser={newUserHandler} />
      <List users={NewUser} />
    </div>
  );
}

export default App;
