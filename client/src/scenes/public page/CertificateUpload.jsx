import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { toast } from "react-toastify";

export default function CertificateUpload() {
  const [SingleFile, setSingleFile] = React.useState("");
  const [title, setTitle] = React.useState("");
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  // handle chaange students
  const [students, setStudents] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState("");
  const handleChangeStudent = (event) => {
    event.preventDefault();
    const newSelectedPublic = event.target.value;
    setSelectedStudent(newSelectedPublic);
  };

  React.useEffect(() => {
    axios.get("http://localhost:5000/admin/getAllStudents").then((res) => {
      setStudents(res.data.studentList);
    });
  }, []);

  const submit = () => {
    console.log(`STUDENT ${selectedStudent}, FILE ${SingleFile}`);
    const data = new FormData();
    data.append("studentId", selectedStudent);
    data.append("title", title);
    data.append("file", SingleFile);

    axios
      .post("http://localhost:5000/public/uploadCertificate", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        setSelectedStudent("");
        setSingleFile("");
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100%",
        pt: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "coloumn",
      }}
    >
      <Card
        sx={{ maxWidth: 345, boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        {/* <CardActionArea> */}
        <CardMedia
          component="img"
          height="140"
          image="https://www.fontmirror.com/app_public/files/t/1/featured_image/2020/01/featured_2384.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "green" }}
          >
            Upload certificate in pdf format
          </Typography>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Title"
                name="Title"
                sx={{ width: "100%" }}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                value={title}
              />
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                select
                label="Select Student"
                name="public"
                sx={{ width: "100%" }}
                onChange={handleChangeStudent}
                size="small"
                value={selectedStudent}
              >
                {students.map((item, val) => {
                  return <MenuItem value={item._id}>{item.fullName}</MenuItem>;
                })}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit}>
                Upload
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
}
