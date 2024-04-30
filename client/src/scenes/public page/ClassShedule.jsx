import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {
  Button,
  CardContent,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Table from "./ClassTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../../store/auth";
import { TimePicker } from "@mui/x-date-pickers";

function ClassShedule() {
  // const Token = Cookies.get('token');

  const [title, setTitle] = React.useState("");
  // const [time, setTime] = React.useState("");
  const [meetLink, setMeetLink] = React.useState("");
  const [singleFile, setSingleFile] = useState([]);
  const today = new Date();
  const [time, setTime] = React.useState(today.toLocaleDateString());
  const [value, setValue] = React.useState(dayjs(today));
  const userID = useSelector((state) => state.auth.user);

  //image upload frontend progressing

  const handleDate = (newValue) => {
    setValue(newValue);
  };
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const handleTime = (newValue) => {
    setTime(newValue);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", singleFile);
    data.append("userID", userID);
    data.append("title", title);
    data.append("time", time);
    data.append("meetLink", meetLink);
    data.append("date", value);
    console.log(data);

    axios
      .post("http://localhost:5000/public/scheduleClass", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          setTime("");
          setTitle("");
          setMeetLink("");
          setSingleFile("");
          setValue(today);
        }, 400);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Box
        container
        spacing={0}
        display="flex"
        direction={{ sm: "row", md: "column", lg: "column", lx: "column" }}
        alignItems="center"
        justifyContent="space-around"
        sx={{ p: 1 }}
      >
        <Card
          sx={{
            maxWidth: 400,
            minHeight: 450,
            p: 1,
            backgroundColor: "#E7EBF0",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="initial" sx={{ mb: 3 }}>
              Schedule class
            </Typography>

            <Box sx={{ mt: 1 }}>
              <form enctype="multipart/form-data" onSubmit={HandleSubmit}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="date"
                        size="small"
                        sx={{ minWidth: "100%", margin: ".5rem 0" }}
                        fullWidth
                      />
                    )}
                    size="small"
                    minDate={new Date()}
                  />
                </LocalizationProvider>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoFocus
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ minWidth: "100%", margin: ".5rem 0" }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="meet-link"
                  label="Meet-link"
                  name="meetLink"
                  autoFocus
                  size="small"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  sx={{ minWidth: "100%", margin: ".5rem 0" }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Time"
                    onChange={handleTime}
                    value={time}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        sx={{ fontSize: "12px", mt: 1 }}
                        {...params}
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>

                <Button
                  component="label"
                  margin="normal"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: "100%", margin: ".5rem 0" }}
                >
                  <input
                    type="file"
                    className="file"
                    onChange={(e) => SingleFileChange(e)}
                    value={singleFile[0]}
                  />
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 7, mb: -1 }}
                >
                  Schedule
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 700,
            maxHeight: 450,
            p: 1,
            backgroundColor: "#E7EBF0",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" color="initial">
              Scheduled Classes
            </Typography>
            <Table handleSubmit={HandleSubmit} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ClassShedule;
