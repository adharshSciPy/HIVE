import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ChatContainer({ selectUser }) {
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.auth.user);

  const getMessage = async () => {
    await axios
      .get(`http://localhost/chat/getMessages/:${userId}/:${selectUser.userid}`)
      .then((res) => {
        console.log(res);
        setMessage(res.data.allMessage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMessage();
    console.log("from=" + userId, "and to=" + selectUser?.userId);
  }, []);

  
  return (
    <Box
      sx={{
        maxHeight: "85vh",
        height: "80vh",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      {/* sender detauls header */}
      <Box sx={{ maxHeight: "10rem" }}>
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={selectUser?.fullName}
              secondary={selectUser?.role}
            />
          </ListItem>
        </List>
      </Box>
      <Divider />

      <Grid>
        {/* send messages */}
        <Grid
          container
          item
          sx={{ width: "100%", p: 1 }}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Box
            sx={{
              backgroundColor: "#e7ebf0",
              minWidth: "50%",
              p: 1,
              borderRadius: "0.4rem",
            }}
          >
            hello
          </Box>
        </Grid>
        {/* recived messages */}
        <Grid
          item
          sx={{ width: "50%", p: 1 }}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            sx={{
              backgroundColor: "#e7ebf0",
              minWidth: "50%",
              p: 1,
              borderRadius: "0.4rem",
            }}
          >
            hello
          </Box>
        </Grid>
      </Grid>

      {/* chat text field */}
      <Box sx={{ position: "absolute", bottom: 0, width: "95%" }}>
        <TextField
          variant="standard"
          label="Type your Message...."
          sx={{ width: "90%" }}
        />
        <Button color="primary">
          <SendTwoToneIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default ChatContainer;
