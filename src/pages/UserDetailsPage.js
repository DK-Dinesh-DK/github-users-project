import { Box, FormLabel, Modal, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

function UserDetailsPage() {
  const { id } = useParams();
  const [userList, setUserList] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    company: "",
    location: "",
    following: "",
    followers: "",
    bio: "",
  });
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  async function fetchUserList() {
    try {
      const response = await fetch("https://api.github.com/users");
      const data = await response.json();

      let person;
      if (!Array.isArray(data) && data.message) {
        setModal(true);
        setMessage(data.message);
      } else {
        data.forEach((element) => {
          if (element.id.toString() === id.toString()) {
            person = element;
          }
        });
        setUserList(person);
      }
    } catch (error) {
      console.error("Error fetching GitHub users:", error);
      setModal(true);
      setMessage("Error fetching GitHub users");
    }
  }
  useEffect(() => {
    fetchUserList();
  }, []);
  async function fetchDetials(url) {
    let headersList = {
      Accept: "*/*",
    };
    let subscription = [];
    let follwoing = [];
    let follwers = [];
    if (userList?.url) {
      try {
        let response = await fetch(userList?.url, {
          method: "GET",
          headers: headersList,
        });
        const data = await response.json();
   
        setDetails(data);
      } catch (error) {
        console.error("Error fetching GitHub users:", error);
        setModal(true);
        setMessage("Error fetching GitHub users");
      }
    }
  }

  useEffect(() => {
    if (userList) {
      fetchDetials();
    }
  }, [userList]);
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
    <div>
      <div className=".header">GitHub User {userList.login} Details</div>
      <div>
        <img
          src={userList.avatar_url}
          height={300}
          width={300}
          alt={`${userList.login} img`}
        ></img>
      </div>

      <div className="details-container">
        <div>
          <FormLabel>Name:</FormLabel> {details.name}
        </div>
        <div>
          <FormLabel>Company:</FormLabel> {details.company}
        </div>
        <div>
          <FormLabel>Location:</FormLabel> {details.location}
        </div>
        <div>
          <FormLabel>Follwoing:</FormLabel> {details.following}
        </div>
        <div>
          <FormLabel>Follwoers:</FormLabel> {details.followers}
        </div>
        <div>
          <FormLabel>PublicRepos:</FormLabel> {details.public_repos}
        </div>
        <div>
          <FormLabel>Bio:</FormLabel> {details.bio}
        </div>
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

export default UserDetailsPage;
