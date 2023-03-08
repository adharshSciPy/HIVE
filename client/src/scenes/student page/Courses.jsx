import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container, Stack } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import AddLinkIcon from "@mui/icons-material/AddLink";

export default function ControlledAccordions() {
  const [publics, setPublics] = React.useState([]);
  const [selectedPublic, setSelectedPublic] = React.useState("");

  // handeling accordion
  const [expanded, setExpanded] = React.useState(1);
  const [accordionData, setAccordionData] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };

  const AccordionData = (key) => {
    axios
      .get(
        `http://localhost:5000/student/getScheduledClassById/${key}`
      )
      .then((res) => {
        console.log(res);
        setAccordionData(res.data.scheduledClass);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    axios.get("http://localhost:5000/student/getAllPublic").then((res) => {
      setPublics(res.data.public);
    });
  }, []);

  const handleChangePublic = (event) => {
    // event.preventDefault();
    setSelectedPublic(event.target.value);
    AccordionData(selectedPublic);
  };

  return (
    <Container component="main" maxWidth="md">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%", mb: 2 }}
      >
        <Box>
          <Typography variant="h6" color="initial">
            Scheduled Classes
          </Typography>
        </Box>

        <Box>
          <FormControl sx={{ width: 200 }}>
            <TextField
              variant="outlined"
              select
              label="Select Public"
              name="public"
              sx={{ width: "100%" }}
              onChange={handleChangePublic}
              size="small"
            >
              {publics.map((item, val) => {
                return <MenuItem value={item._id}>{item.fullName}</MenuItem>;
              })}
            </TextField>
          </FormControl>
        </Box>
      </Stack>
      <Box>
        {/* <ClassAccordion selectedPublic={selectedPublic} handleChangePublic={handleChangePublic}/> */}
        {accordionData.map((item, val) => {
          return (
            <Accordion
              expanded={expanded === item._id}
              onChange={handleChange(item._id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "43%", flexShrink: 0 }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{ width: "33%", color: "text.secondary", flexShrink: 0 }}
                >
                  {item.date}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {item.time}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>Online Meeting Link</Box>
                  <Box>
                    <a
                      href={`/${item.meetLink}`}
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        startIcon={<AddLinkIcon />}
                        sx={{ color: "text.secondary" }}
                      >
                        {item.meetLink}
                      </Button>
                    </a>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </Container>
  );
}
