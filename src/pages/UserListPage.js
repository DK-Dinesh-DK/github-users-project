import React, { useEffect, useState } from "react";
import "./index.css";
import { Avatar, FormLabel } from "@mui/material";
import { useNavigate } from "react-router";
function UserListPage() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  async function fetchUserList() {
    try {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();
      console.log("Data", data);
      setUserList(data);
    } catch (error) {
      console.error("Error fetching GitHub users:", error);
    }
  }
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="user-list">
      <div className="header">GitHub User List</div>
      <div className="user-list-container">
        {userList?.map((item, i) => {
          return (
            <div className="card" onClick={() => {
              navigate(`/user-details/${item.id}`)
            }}>
              <div>
                <Avatar alt="Remy Sharp" src={item.avatar_url} />
              </div>
              <div className="name-details">
                <div>
                  <FormLabel style={{ color: "#FFF" }} className="">
                    First Name:
                  </FormLabel>
                </div>
                <div>
                  <FormLabel style={{ color: "#FFF" }}>Last Name:</FormLabel>
                </div>
                <div>
                  <FormLabel style={{ color: "#FFF" }}>User Name:</FormLabel>
                  <FormLabel style={{ color: "#000" }}>{item.login}</FormLabel>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserListPage;
