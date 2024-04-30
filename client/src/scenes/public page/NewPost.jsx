import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card, CardContent, MenuItem } from "@mui/material";
import { setRole } from "../../store/auth";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PostTable from "../public page/PostTable";
import { useEffect } from "react";

const theme = createTheme();

export default function NewPost() {
  const userID = useSelector((state) => state.auth.user);

  // selecting post type in post form
  const [postType, setPostType] = React.useState("job-fair");
  const [jobFair, setJobFair] = React.useState(false);
  const [webinar, setWebinar] = React.useState(false);
  const [internship, setInternship] = React.useState(false);
  const [placement, setPlacement] = React.useState(false);
  // const [value, setValue] = React.useState(dayjs("03-02-2023"));

  const handleChange = (event) => {
    setPostType(event.target.value);
  };

  React.useEffect(() => {
    if (postType === "job-fair") {
      setJobFair(true);
      setWebinar(false);
      setInternship(false);
    } else if (postType === "webinar") {
      setJobFair(false);
      setWebinar(true);
      setInternship(false);
    } else if (postType === "internship") {
      setJobFair(false);
      setWebinar(false);
      setInternship(true);
    } else if (postType === "placement") {
      setJobFair(false);
      setWebinar(false);
      setInternship(true);
    } else {
      setJobFair(false);
      setWebinar(false);
      setInternship(false);
    }
  }, [handleChange]);

  const now = new Date();
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [date, setDate] = React.useState(now.toLocaleDateString());
  const [time, setTime] = React.useState(now.toLocaleDateString());
  const [time2, setTime2] = React.useState(now.toLocaleDateString());
  const [location, setLocation] = React.useState("");
  const [meetLink, setMeetLink] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [singleFile, setSingleFile] = React.useState("");

  const handleDate = (newValue) => {
    setDate(newValue);
  };

  const handleTime = (newValue) => {
    setTime(newValue);
  };

  const handleTime2 = (newValue) => {
    setTime2(newValue);
  };

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("file", singleFile);
    data.append("userID", userID);
    data.append("title", title);
    data.append("postType", postType);
    data.append("meetLink", meetLink);
    data.append("company", company);
    data.append("salary", salary);
    data.append("date", date);
    data.append("time", time);
    data.append("time", time2);
    console.log(data);

    axios
      .post("http://localhost:5000/public/post", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTitle("");
        setPrice("");
        setPostType("");
        setLocation("");
        setMeetLink("");
        setSalary("");
        setCompany("");
        setPlace("");
        setSingleFile("");
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(err);
      });
  };

  return (
    <>
      <Box
        container
        spacing={0}
        display="flex"
        direction={{ sm: "row", md: "column", lg: "column", lx: "column" }}
        justifyContent="space-between"
        sx={{ p: 6, pt: 1 }}
      >
        <Card
          sx={{
            minWidth: 300,
            maxWidth: 400,
            minHeight: 500,
            p: 4,
            backgroundColor: "#E7EBF0",
          }}
        >
          <Typography component="heading" variant="h6">
            Create New Post
          </Typography>
          <form enctype="multipart/form-data" onSubmit={HandleSubmit}>
            <TextField
              variant="outlined"
              select
              maxWidth
              value={postType}
              label="Post-Type"
              name="postType"
              sx={{ width: "100%", mt: 1 }}
              size="small"
              onChange={handleChange}
            >
              <MenuItem value="job-fair">Job Fair</MenuItem>
              <MenuItem value="webinar">Webinar</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
              <MenuItem value="placement">Placement</MenuItem>
            </TextField>

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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {!jobFair ? (
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="text"
                id="price"
                size="small"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            ) : (
              ""
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={date}
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

            {jobFair ? (
              <>
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

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  type="text"
                  id="location"
                  size="small"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </>
            ) : (
              ""
            )}

            {webinar ? (
              <>
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

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="meetLink"
                  label="Meet-link"
                  type="text"
                  id="meetLink"
                  size="small"
                  value={meetLink}
                  onChange={(e) => {
                    setMeetLink(e.target.value);
                  }}
                />
              </>
            ) : (
              ""
            )}

            {internship ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="company"
                  label="Company"
                  type="text"
                  id="meetlink"
                  size="small"
                  value={company}
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="place"
                  label="Place"
                  type="text"
                  id="text"
                  size="small"
                  value={place}
                  onChange={(e) => {
                    setPlace(e.target.value);
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="salary"
                  label="Salary"
                  type="text"
                  id="salary"
                  size="small"
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                />
              </>
            ) : (
              ""
            )}

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
              />
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </form>
        </Card>

        <Card
          sx={{
            minWidth: 700,
            maxHeight: 500,
            p: 1,
            backgroundColor: "#E7EBF0",
          }}
        >
          <CardContent>
            <Typography variant="subtitle1" color="initial">
              Manage Posts
            </Typography>
            <PostTable handleSubmit={HandleSubmit} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
