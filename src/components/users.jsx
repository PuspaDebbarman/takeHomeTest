import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import "./users.css";

function Users({
  avatar,
  email,
  first_name,
  last_name,
  setCurrentId,
  setIsVisible,
  userId,
  users,
  setUsers
}) {
  const handleDelete = async () => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if(response.status===204){
        const temp=users.filter(u => u.id !=userId );
        setUsers(temp);
        alert("User successfully deleted.");
    }
  };
  return (
    <div className="userDetails">
      <Card className="cardShow">
        <CardImg
          className="imgAvatar"
          width="30px"
          top
          src={avatar}
          alt={first_name}
        />
        <CardBody>
          <CardTitle>
            {first_name} {last_name}
          </CardTitle>
          <CardText>{email}</CardText>
        </CardBody>
        <div className="btnCard">
          <button
            className="btnUpdate"
            onClick={() => {
              setIsVisible(true);
              setCurrentId(userId);
            }}
          >
            Update
          </button>
          <button className="btnDelete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Users;
