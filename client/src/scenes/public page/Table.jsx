import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import uuid from "react-uuid";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function DataTable({ handleSubmit }) {
  let onClickDelete;
  //   const token = Cookies.get("token");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjA3Y2ZmZTEwZWE1MWE4YTFhMjBlNyIsInJvbGUiOiJwdWJsaWMiLCJpYXQiOjE2NzcxODAxMDgsImV4cCI6MTY3NzE4MzcwOH0.5OODxH73r0ra_DLAcfnT-boLmp_7ftxyq9heZkx-GkE";
  // defining coloumns
  const columns = [
    { field: "_id", headerName: "Id", width: 300, hideable: false, hide: true },
    { field: "date", headerName: "Date", width: 130 },
    { field: "title", headerName: "Title", width: 300 },
    {
      field: "action",
      width: 190,
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        onClickDelete = (e) => {
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
            .delete(`http://localhost:5000/public/deleteClass/${thisRow._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res.data.message);
              toast.success(res.data.message, {
                position: toast.POSITION.TOP_CENTER,
              });
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
              <Button color="success">
                <CheckCircleOutlineRoundedIcon />
              </Button>
            </ButtonGroup>
          </Box>
        );
      },
    },
  ];

  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/public/getScheduledClass")
      .then((res) => {
        setRows(res.data.ScheduledClass);
        //   console.log(res.data.ScheduledClass);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [handleSubmit, onClickDelete]);

  return (
    <div style={{ height: 400, width: "100%" }}>
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
    </div>
  );
}
