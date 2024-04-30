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

function AppliedPost() {
    const [rows, setRows] = React.useState({});
    const userID = useSelector((state) => state.auth.user);
    function setRow() {
        axios
            .get(`http://localhost:5000/student/getAppliedPosts/${userID}`)
            .then((res) => {
                setRows(res.data.posts);
                console.log(res);
                console.log(res.data.posts);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    React.useEffect(() => {
        setRow();
        console.log(userID)
    }, []);

    // defining coloumns
    const columns = [
        { field: "_id", headerName: "Id", width: 300, hide: true, hideable:true },
        { field: "postType", headerName: "Post Type", width: 300 },
        { field: "title", headerName: "Post Title", width: 350 },
        { field: "date", headerName: "Date", width: 350 },
    ];

    return (
        <Box sx={{ maxWidth: "100%" }}>
            <Container>
                <Typography variant="h5" color="primary" sx={{mb: '2rem'}}>
                    Applied Post
                </Typography>

                <Box sx={{ height: 400, width: "100%" }}>
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

export default AppliedPost;