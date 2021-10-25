import "./App.css";
import React, { useEffect, useState } from "react";
import Users from "./components/users";
import Create from "./components/create";

function App() {
  const [users, setUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const temp = [];
    let currentPage = 0;
    let pagesAvailable = true;
    while (pagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}`
      ).then((res) => res.json());
      pagesAvailable = currentPage < response.total_pages;
      
      temp.push(...response.data);
    }
    setUsers(temp);
  };

  return (
    <div className="App">
      <div className="header">
        <span className="heading">List of Users</span>
        <button className="btnAdd" onClick={() => setIsVisible(true)}>
          Add an User
        </button>
      </div>
      <div className="users">
        {users.map((user) => (
          <Users
          key={user.id}
            userId={user.id}
            avatar={user.avatar}
            email={user.email}
            first_name={user.first_name}
            last_name={user.last_name}
            setIsVisible={setIsVisible}
            setCurrentId={setCurrentId}
            users={users}
            setUsers={setUsers}
          />
        ))}
      </div>
      <Create
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        userId={currentId}
        setUserId={setCurrentId}
        users={users}
        setUsers={setUsers}
      />
    </div>
  );
}

export default App;
