import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Grid,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import React from "react";
import ChatContainer from "../chat container/ChatContainer";
import { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState();

  const fetchAllUsers = () => {
    axios
      .get("http://localhost:5000/user/getAllUsers")
      .then((res) => {
        setUsers(res.data.sortedUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleClick = (item) => {
    console.log("clicked" + JSON.stringify(item));
    setSelectUser(item);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <Box sx={{ maxHeight: "85vh", overflowY: "scroll" }}>
          {/* search contact list */}
          <Box
            sx={{
              borderRadius: "2rem",
              p: "5px",
              pl: "18px",
              position: "sticky",
            }}
          >
            <FormControl variant="standard" size="small" sx={{ width: "100%" }}>
              <InputLabel>Search Your Contact</InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <PersonSearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          {/* contact list */}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {users.map((item, val) => {
              return (
                <ListItemButton key={val} onClick={() => handleClick(item)}>
                  <ListItem sx={{ maxHeight: "3rem" }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 40, height: 40 }}
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F299106%2Fprofile_icon&psig=AOvVaw2J1yreaXvIkFZbt8VBc4fH&ust=1682508149994000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJD_psL1xP4CFQAAAAAdAAAAABAF"
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.fullName}
                      secondary={item.role}
                    />
                  </ListItem>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Grid>

      <Grid item xs={6} md={8}>
        <ChatContainer selectUser={selectUser} />
      </Grid>
    </Grid>
  );
}

export default Contact;
