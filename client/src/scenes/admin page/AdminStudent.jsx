import * as React from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import uuid from "react-uuid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AdminStudent() {
  const [rows, setRows] = React.useState({});
  function setRow() {
    axios
      .get(`http://localhost:5000/admin/getAllStudents`)
      .then((res) => {
        setRows(res.data.studentList);
        console.log(res);
        //   console.log(res.data.ScheduledClass);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  React.useEffect(() => {
    setRow();
  }, []);

  // defining coloumns
  const columns = [
    { field: "_id", headerName: "Id", width: 300, hideable: false, hide: true },
    { field: "fullName", headerName: "Full Name", width: 300 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "dob", headerName: "Date of Birth", width: 300 },
    {
      field: "action",
      width: 190,
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
       const onClickDelete = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "_check_" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          // alert(JSON.stringify(thisRow))
          console.log(thisRow._id);

          axios
            .delete(`http://localhost:5000/admin/deletePublic/${thisRow._id}`)
            .then((res) => {
              console.log(res.data.message);
              toast.success(res.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
              setRow();
            })
            .catch((err) => {
              console.error(err);
              toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER,
              });
            });
        };

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            {/* <ButtonGroup size="small" aria-label="small button group"> */}
            <Button color="error">
              <HighlightOffRoundedIcon  onClick={onClickDelete}/>
            </Button>

            {/* <Button color="success" onClick={onClickUpdate}>
                <CheckCircleOutlineRoundedIcon />
              </Button> */}
            {/* </ButtonGroup> */}
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Container>
        <Typography variant="h5" color="primary">
          Manage Students
        </Typography>

        <Box sx={{ height: 400, width: "100%", mt:3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row: any) => uuid()}
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSelector
          />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminStudent;
