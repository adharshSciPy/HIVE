import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';


export default function Posts() {
  const navigate = useNavigate()
  const [cards, setCards] = React.useState([]);
  const userID = useSelector((state) => state.auth.user);
  function getAllPost() {
    axios.get(`http://localhost:5000/student/getAllPosts/${userID}`).then((res) => {
      setCards(res.data.posts);
      console.log(res.data.posts);
    });
  }
  React.useEffect(() => {
    getAllPost()
  }, []);



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(false);
  const handleOpen = (item) => {
    setOpen(true)
    setModalData(item)
  };
  const handleClose = () => setOpen(false);


  const handleApply = (id) => {
    console.log(id)
    axios.post(`http://localhost:5000/student/applyPost/${id}/${userID}`)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        getAllPost()
        setOpen(false)
      })
  }

  return (
    <>
      <main>
        <Container smaxWidth="md">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h5" color="secondary" sx={{ mb: 3, fontWeight: 500 }}>Posts</Typography>
            <Button variant="outlined" onClick={() => navigate('/student/post/appliedPost')}>Applied Post</Button>
          </Stack>

          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards?.map((item, val) => {
              return (
                <Grid item key={val} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "20rem",
                      maxWidth: '30rem',
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }}
                  >

                    <CardMedia
                      sx={{
                        height: "70%",
                        width: '100%'
                      }}
                      component="img"
                      image={`http://localhost:5000${item.imageName}`}
                      // image={`http://localhost:5000/server/uploads/2023-05-05T11-32-06.481Z-batch.png`}
                      alt={`http://localhost:5000${item.imageName}`}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" color="secondary">
                          {item.title}
                        </Typography>
                        {/* <Button size="small" onClick={() => handleApply(item._id)} variant="contained">Apply</Button> */}
                        <Button size="small" onClick={() => handleOpen(item)} variant="contained">Apply</Button>
                      </Stack>

                      <Typography variant="body2" color="secondary">
                        {item.postType}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {moment(item.date).format('MM-DD-YYYY')}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            {
              cards.length === 0 && (
                <Box sx={{ height: '60vh', width: '95vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >There are no new posts available for you to view</Box>
              )
            }
          </Grid>
        </Container>
      </main>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Post Details
            </Typography>
            <Card
              sx={{
                height: "30rem",
                display: "flex",
                flexDirection: "column",
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                boxShadow: "none",
                mt: 3
              }}
            >

              <CardMedia
                sx={{
                  height: "60%",
                  width: '100%',
                  mb: 1
                }}
                component="img"
                image={`http://localhost:5000${modalData.imageName}`}
                // image={`http://localhost:5000/server/uploads/2023-05-05T11-32-06.481Z-batch.png`}
                alt={`http://localhost:5000${modalData.imageName}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" color="secondary">
                    {modalData.title}
                  </Typography>

                  <Typography variant="h6" color="secondary">
                    {moment(modalData.date).format('MM-DD-YYYY')}
                  </Typography>
                  {/* <Button size="small" onClick={() => handleApply(modalData._id)} variant="contained">Apply</Button> */}
                  {/* <Button size="small" onClick={() => handleOpen(item)} variant="contained">Apply</Button> */}
                </Stack>

                <Typography variant="body2" color="primary">
                  {modalData.postType}
                </Typography>
                {
                  modalData?.postType === 'webinar' &&
                  (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" color="secondary">
                        Meet Link
                      </Typography>

                      <Typography variant="body2" color="primary">
                        {modalData.meetLink}
                      </Typography>
                    </Stack>
                  )

                }

                {
                  modalData?.postType === 'internship' &&
                  (
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Typography variant="h6" color="secondary">
                        Salary
                      </Typography>

                      <Typography variant="body1" color="primary">
                        &#8377; {modalData?.salary}
                      </Typography>
                    </Stack>
                  )

                }
              </CardContent>
              <Button variant="contained" onClick={() => handleApply(modalData._id)}>Apply</Button>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}