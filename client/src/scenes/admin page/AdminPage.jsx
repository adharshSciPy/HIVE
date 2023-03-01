import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import {useNavigate} from 'react-router-dom'

function AdminPage() {
  const navigate = useNavigate()
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Container>
        <Typography variant="h5" color="primary" sx={{fontWeight: 700}}>
          Dashboard
        </Typography>

        <Grid
          container
          sx={{
            width: "95vw",
            mt: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
          spacing={3}
        >
          <Grid item>
            <Card sx={{ minWidth: 345, maxWidth: 345 }} onClick={() => navigate('/admin/studentList')}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="data:image/png;base64,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"
                  alt="green iguana"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Students
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      22
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item>
            <Card sx={{ minWidth: 345, maxWidth: 345 }}  onClick={() => navigate('/admin/publicList')}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://upgrade-partner.de/wp-content/uploads/2020/02/Grafik_Organisation-1024x350.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Public
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      44
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item>
            <Card sx={{ minWidth: 345, maxWidth: 345 }}  onClick={() => navigate('/admin/adminPosts')}> 
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://d4y70tum9c2ak.cloudfront.net/contentImage/cp-xkfWuQLB8A-LnxHmXAXyjr697tiDTJ-H-hSl1VjA/resized.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      Posts
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      100
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdminPage;
