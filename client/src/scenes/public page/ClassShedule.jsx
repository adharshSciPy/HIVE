import * as React from "react";
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

function ClassShedule() {
  // const Token = Cookies.get('token');

  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");
  const [meetLink, setMeetLink] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [value, setValue] = React.useState(dayjs("03-02-2023"));

  const userID = useSelector(state => state.auth.user);


  const handleDate = (newValue) => {
    setValue(newValue);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(data);
    console.log(file)

    axios
      .post("http://localhost:5000/public/scheduleClass", {
        // headers: {
        //   "content-type": "application/json",
        //   "Authorization": `Bearer ${Token}`,
        // },
        userID: userID,
        title: data.get("title"),
        time: data.get("time"),
        meetLink: data.get("meetLink"),
        date: data.get("date"),
        pdf: file,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          setTime("");
          setTitle("");
          setMeetLink("");
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

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="time"
                  label="Time"
                  name="time"
                  autoFocus
                  size="small"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  sx={{ minWidth: "100%", margin: ".5rem 0" }}
                />

                <Button
                  component="label"
                  margin="normal"
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: "100%", margin: ".5rem 0" }}
                >
                  Upload PDF
                  <input
                    type="file"
                    name="pdf"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>

                {/* <TextField
                variant="outlined"
                select
                label="Batch"
                name='batch'
                sx={{ width: '100%', margin: '1rem 0' }}
                size='small'
              >
                <MenuItem value='a'>A</MenuItem>
                <MenuItem value='b'>B</MenuItem>
                <MenuItem value='c'>C</MenuItem>
                <MenuItem value='d'>D</MenuItem>
                <MenuItem value='e'>E</MenuItem>
                <MenuItem value='f'>F</MenuItem>
              </TextField> */}

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
