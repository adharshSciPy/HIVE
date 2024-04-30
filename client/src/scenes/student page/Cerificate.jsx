import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  setSilver,
  setGold,
  setDaimond,
  unSetSilver,
  unSetGold,
  unSetDaimond,
} from "../../store/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Cerificate() {
  const [certificates, setCertificates] = React.useState([]);
  const userID = useSelector((state) => state.auth.user);
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/student/getAllCertificates/${userID}`)
      .then((res) => {
        console.log(res.data.certificates);
        setCertificates(res.data.certificates);
        console.log(certificates);
      });
  }, []);

  // download pdf
  const handleDownload = async (item) => {
    try {
      console.log(item._id);
      console.log(item.title);
      const res = await fetch(
        `http://localhost:5000/public/downloadPdf/${item._id}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${item.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      if (res) {
        toast.success("Downloaded Succesfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (item) => {
    try {
      const res = await fetch(
        `http://localhost:5000/public/downloadPdf/${item._id}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      window.open(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" color="secondary" sx={{ fontWeight: 500 }}>
        My Certificates
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {certificates?.map((item, val) => {
          return (
            <Grid item key={val} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  sx={{
                    height: "5rem",
                    width: "5rem",
                  }}
                  component="img"
                  image={`https://www.computerhope.com/jargon/p/pdf.png`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6">
                    {item.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleDownload(item)}
                  >
                    Download
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleView(item)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {certificates?.length === 0 && (
        <Box
          sx={{
            height: "60vh",
            width: "95vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          There are no new posts available for you to view
        </Box>
      )}
    </Container>
  );
}

export default Cerificate;
