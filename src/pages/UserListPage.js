import React, { useEffect, useState } from "react";
import "./index.css";
import { Avatar, Box, FormLabel, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router";
function UserListPage() {
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  async function fetchUserList() {
    try {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();


      if (!Array.isArray(userList) && userList.message) {
        setModal(true);
        setMessage(userList.message);
      } 

      setUserList(data);
    } catch (error) {
      setModal(true);
      setMessage("Error fetching GitHub users");
    }
  }
  useEffect(() => {
    fetchUserList();
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="user-list">
      <div className="header">GitHub User List</div>
      <div className="user-list-container">
        {Array.isArray(userList) &&
          userList?.map((item, i) => {
            return (
              <div
                className="card"
                onClick={() => {
                  navigate(`/user-details/${item.id}`);
                }}
              >
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
                    <FormLabel style={{ color: "#000" }}>
                      {item.login}
                    </FormLabel>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        open={modal}
        onClose={() => {
          setModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default UserListPage;
