import React, { useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./create.css";

function Create({
  isVisible,
  setIsVisible,
  userId,
  setUserId,
  users,
  setUsers,
}) {
  const initialState = {
    name: "",
    job: "",
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (type, value) => {
    setUser({ ...user, [type]: value });
  };

  const handleClick = async (type, url) => {
    const response = await fetch(url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    });
    const data = await response.json();
    if (data.job == "" || data.name == "") {
      alert("Please enter necessary details");
      return;
    }
    if (response.status === 201) {
      setUsers([{ first_name: data.name, id: data.id }, ...users]);
      alert(
        "New User Created. \n Id: " +
          data.id +
          ", Name: " +
          data.name +
          ", Job: " +
          data.job +
          ", created At: " +
          data.createdAt
      );
    } else if (response.status === 200) {
      const temp = users.reduce(
       function (acc,u) {
          u.id != userId
            ? acc.push(u)
            : acc.push({ ...u, first_name: data.name });
          return acc;
        },
        []
      );
      setUsers(temp);
      alert(
        "User has been successfully updated. \n Name: " +
          data.name +
          ", Job:  " +
          data.job +
          ", updated At: " +
          data.updatedAt
      );

      setUserId(null);
    }
    setUser({ name: "", job: "" });
    setIsVisible(false);
  };

  return (
    <div className={!isVisible && "inactive"}>
      <div className="emptyDiv"></div>
      <div className="createUser">
        <Card className="cardCreate">
          <CardTitle>
            {" "}
            <div className="cardTitle"> User Details </div>{" "}
          </CardTitle>
          <CardBody>
            <div className="inputText">
              <span>Name: </span>{" "}
              <input
                type="text"
                value={user.name}
                id="inputName"
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="inputText">
              <span>Job: </span>{" "}
              <input
                type="text"
                value={user.job}
                id="inputJob"
                onChange={(e) => handleChange("job", e.target.value)}
              />
            </div>
          </CardBody>
          <div className="btnCard">
            <button
              className="btnAdd"
              onClick={
                !userId
                  ? () => handleClick("POST", "https://reqres.in/api/users/")
                  : () =>
                      handleClick(
                        "PUT",
                        `https://reqres.in/api/users/${userId}`
                      )
              }
            >
              {!userId ? "Add" : "Update"}
            </button>
            <button className="btnAdd" onClick={() => setIsVisible(false)}>
              Cancel
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Create;
