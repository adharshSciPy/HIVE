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
import { io } from "socket.io-client";
import { useRef } from 'react'



function ChatContainer({ selectUser }) {
  const scrollRef = useRef()
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([])
  const userId = useSelector((state) => state.auth.user);
  const [arrival, setArrival] = useState(null)

  const getMessage = async () => {
    await axios
      .get(`http://localhost:5000/chat/getMessages/${userId}/${selectUser?._id}`)
      .then((res) => {
        console.log(res);
        console.log("from=" + userId, "and to=" + selectUser?._id);
        setAllMessages(res.data.allMessage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMessage();
    console.log("from=" + userId, "and to=" + selectUser?._id);
    console.log("data=" + selectUser);
  }, [selectUser?._id]);

  // sending message
  const SendMessage = () => {
    const chatInfo = {
      from: userId,
      to: selectUser?._id,
      message
    }

    const chatInfo2 = {
      mySelf: true,
      message
    }
    // before posting message
    socket.current.emit("send-msg", {
      to: selectUser?._id,
      from: userId,
      message
    })
    axios.post('http://localhost:5000/chat/postMessage', chatInfo)
      .then((res) => {
        console.log(res)
        setAllMessages(allMessages.concat(chatInfo2))
        setMessage('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // socke tio useEffect
  const socket = useRef()
  useEffect(() => {
    if (selectUser !== '') {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", userId)
    }
  }, [userId])

  console.log(socket)

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(`from socket ${msg}`)
        setArrival({ mySelf: false, message: msg })
      })
    }
  }, [arrival])

  useEffect(() => {
    arrival && setAllMessages((pre) => [...pre, arrival])
  }, [arrival])


  // chat sending automatically messsage uphelding 
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [allMessages])

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
      <Box sx={{ minHeight: "-1rem", position: 'fixed', backgroundColor: "#fff", width: '100%', mt: '-1rem' }}>
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
        <Divider />
      </Box>


      <Grid sx={{ mb: 5, pb: 1, pt: 2 }}>
        {
          allMessages?.map((msg) =>
            msg?.mySelf === true ? (
              <Grid
                ref={scrollRef}
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
                    maxWidth: "60%",
                    overflow: 'hidden',
                    height: 'auto'
                  }}
                >
                  {msg?.message}
                </Box>
              </Grid>
            ) : (
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
                    maxWidth: "60%",
                    overflow: 'hidden',
                    height: 'auto'


                  }}
                >
                  {msg?.message}
                </Box>
              </Grid>
            )
          )
        }
      </Grid>



      {/* chat text field */}
      <Box sx={{ position: "fixed", bottom: 0, width: "65%", backgroundColor: '#fff', mb: 3 }}>

        <TextField
          variant="standard"
          label="Type your Message...."
          sx={{ width: "90%" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button color="primary" onClick={() => { message !== '' && SendMessage() }}>
          <SendTwoToneIcon />
        </Button>
      </Box>
    </Box >
  );
}

export default ChatContainer;
