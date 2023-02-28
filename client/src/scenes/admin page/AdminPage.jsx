import React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Container } from '@mui/material'

function AdminPage() {
  return (
    <Box sx={{maxWidth: '100%'}}>
      <Container>
        <Typography variant="h4" color="primary">Admin Home page</Typography>
      </Container>
    </Box>
  )
}

export default AdminPage