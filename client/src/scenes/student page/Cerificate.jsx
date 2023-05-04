import * as React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import axios from 'axios';


function Cerificate() {
    const [certificates, setCertificates] = React.useState([])
    const userID = useSelector((state) => state.auth.user);
    React.useEffect(() => {
        axios.get(`http://localhost:5000/student/getAllCertificates/${userID}`)
            .then((res) => {
                console.log(res)
                setCertificates(res.data.certificates)
            })
    }, [])
    return (
        <Container maxWidth="lg">
            <Typography variant="h5" color="initial">My Certificates</Typography>

            {
                certificates.length === 0 && (
                    <Box sx={{ height: '60vh', width: '95vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >There are no new posts available for you to view</Box>
                )
            }
        </Container>
    )
}

export default Cerificate