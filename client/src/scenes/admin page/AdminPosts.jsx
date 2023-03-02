import * as React from "react";
import { Container, Stack, Typography } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';

function AdminPosts() {
  const [history, setHistory] = React.useState(false)
  const [rows, setRows] = React.useState({});
  const [rows2, setRows2] = React.useState({})

  const getApi = history ? 'getAllPosts' : 'getPostHistory'
  function setRow() {
    axios
      .get(`http://localhost:5000/admin/getAllPosts`)
      .then((res) => {
        setRows(res.data.postLists);
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


  function setHistoryRow() {
    axios
      .get(`http://localhost:5000/admin/getPostHistory`)
      .then((res) => {
        setRows2(res.data.postLists);
        console.log(res);
        //   console.log(res.data.ScheduledClass);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  React.useEffect(() => {
    setHistoryRow();
  }, []);

  // defining coloumns
  const columns = [
    { field: "_id", headerName: "Id", width: 300, hideable: false, hide: true },
    { field: "postType", headerName: "Post Type", width: 200 },
    { field: "ownerID", headerName: "ownneID", hideable: false, hide: true },
    { field: "title", headerName: "Title", width: 200 },
    { field: "date", headerName: "Event Date", width: 200 },
    { field: "place", headerName: "Location", width: 200 },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "action",
      width: 130,
      headerName: "Action",
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
            .delete(`http://localhost:5000/admin/deletePost/${thisRow._id}`)
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

        // onClick admin approving post to view by student
        const onClickUpdate = (e) => {
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
            .put(`http://localhost:5000/admin/updatePost/${thisRow._id}`)
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
            <ButtonGroup size="small" aria-label="small button group">
              <Button color="error" onClick={onClickDelete}>
                <HighlightOffRoundedIcon />
              </Button>
              {
                history ? (
                  ''
                ) :
                  (
                    <Button color="success" onClick={onClickUpdate}>
                      <CheckCircleOutlineRoundedIcon />
                    </Button>
                  )
              }

            </ButtonGroup>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Container>
        {
          !history ?
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" color="primary">
                  Manage Posts
                </Typography>


                <Button onClick={() => setHistory(true)}>History</Button>
              </Stack>


              <Box sx={{ height: 400, width: "100%", mt: 3 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row: any) => uuid()}
                  disableSelectionOnClick
                  // disableColumnMenu
                  disableColumnSelector
                />
              </Box>
            </>
            :
            <>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h5" color="primary">
                  Post History
                </Typography>


                <Button color="error" onClick={() => setHistory(false)}><CloseIcon color="error" /></Button>
              </Stack>


              <Box sx={{ height: 400, width: "100%", mt: 3 }}>
                <DataGrid
                  rows={rows2}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  getRowId={(row: any) => uuid()}
                  disableSelectionOnClick
                  // disableColumnMenu
                  disableColumnSelector
                />
              </Box>
            </>
        }

      </Container>
    </Box>
  );
}

export default AdminPosts;
