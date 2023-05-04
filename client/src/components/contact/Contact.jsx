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
  Grid, Typography,
} from "@mui/material";

import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import React from "react";
import ChatContainer from "../chat container/ChatContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


function Contact() {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState();
  const [color, setColor] = useState(true)
  const userId = useSelector((state) => state.auth.user);

  const fetchAllUsers = () => {
    axios
      .get(`http://localhost:5000/chat/getChatUsers/${userId}`)
      .then((res) => {
        setUsers(res.data.users);
        console.log(res)
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
            {users?.map((item, val) => {
              return (
                <ListItemButton key={val} onClick={() => handleClick(item)} sx={{ backgroundColor: selectUser?.userid === item.userid ? '#F6F8FA' : '' }}>
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

      <Grid item xs={6} md={8} sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {
          selectUser?._id !== undefined ? <ChatContainer selectUser={selectUser} /> :
            <Box sx={{ height: '85%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <img src="https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=gkvLDCgsHH-8HeQe7JsjhlOY6vRBJk_sKW9lyaLgmLo=" alt="" width="250px" height='250px' />
              <Typography variant="h5" color="primary" sx={{ fontWeight: '600' }}>Select an user to chat</Typography>
            </Box>
        }

      </Grid>
    </Grid>
  );
}

export default Contact;
